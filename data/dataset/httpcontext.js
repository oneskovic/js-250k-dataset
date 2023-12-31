	
var Http = require('http'),
	Path = require('path'),
	Url = require('url'),
	FS = require('fs'),
	Util = require('util'),
	HttpRequest = require('./httprequest'),
	HttpResponse = require('./httpresponse');
	

function HttpContext(httpWorkerRequest){
	this.request = new HttpRequest(httpWorkerRequest, this);
	this.response = new HttpResponse(httpWorkerRequest, this);
}

HttpContext.prototype = {

	/**
	 * 为当前 HTTP 请求获取 {@link HttpRequest} 对象。
	 * @type HttpRequest
	 */
	request: null,
	
	/**
	 *  为当前 HTTP 请求获取 {@link HttpResponse} 对象。
	 * @type HttpResponse
	 */
	response: null,
	
	/**
	 * 为当前 HTTP 请求获取 {@link HttpApplication} 对象。
	 * @type HttpApplication
	 */
	get applicationInstance() {
		return this.request._wr.applicationInstance;
	},
	
	// /**
	 // * 获取或设置负责处理 HTTP 请求的处理程序.
	 // * @type HttpHandler
	 // */
	// handler: null,
	
	/**
	 * 获取可用于在 HTTP 请求过程中在 Module 和 Handler 之间组织和共享数据的键/值对象。
	 * @return {Object} 对象。
	 */
	get items(){
		return this._items || (this._items = {});
	},
	
	/**
	 * 为当前 HTTP 请求获取 HttpSessionState 对象。
	 * @return {Object} 当前 HTTP 请求的 HttpSessionState 对象。
	 */
	get session(){
		
		var sessionState = this.applicationInstance._sessionState;
		
		if(!sessionState){
			var HttpSessionState = require('./httpsessionstate');
			this.applicationInstance._sessionState = sessionState = new HttpSessionState(this.applicationInstance);
		}
		
		// 获取当前匹配的 Session ID 。
		var session = sessionState.getSession(this);
		
		// 如果不存在 session，则创建 Session 。
		if(!session){
			sessionState.setSession(this, session = {});
			this.applicationInstance.onSessionStart(this);
		} 
		
		return session;
	},
	
	/**
	 * 为当前 HTTP 请求获取 HttpApplicationState 对象。
	 * @return {Object} 当前 HTTP 请求的 HttpApplicationState 对象。
	 */
	get application(){
		return this.applicationInstance._applicationState || (this.applicationInstance._applicationState = {});
	},
	
	/**
	 * 获取当前 HTTP 请求的初始时间戳。
	 */
	get timestamp(){
		return this.request._wr.getRequestTimestamp();;
	},
	
	/**
	 * 向客户端报告错误。
	 * @param {Number} statusCode 错误码。
	 * @param {Error} error 引发错误的原始异常。
	 */
	reportError: function (statusCode, error) {
		this.applicationInstance.reportError(this, statusCode, error);
	},
	
	/**
	 * 用于为请求指定处理程序。
	 *  @param {HttpHandler} handler 应处理请求的对象。
	 */
	remapHandler: function(handler){
		return handler.processRequest(this);
	},
	
	/**
	 * 使用给定虚拟路径、路径信息、查询字符串信息和一个布尔值重写 URL，该布尔值用于指定是否将客户端文件路径设置为重写路径。
	 * @param {String} path 内部重写路径。
	 * @param {Boolean} rebaseClientPath 若要将用于客户端资源的文件路径设置为 *path*，则为 true；否则为 false。
	 */
	rewritePath: function(path, rebaseClientPath){
	
		if(rebaseClientPath) {
			this.context.response.redirect(path);
			return;
		}
		
		// 清空 queryString 。
		this.request.redirected = true;
		this.request._queryString = null;
		this.request._wr.rewritePath(path);
		this.applicationInstance.remapHandler(this);
	}
	
};
	 
module.exports = HttpContext;