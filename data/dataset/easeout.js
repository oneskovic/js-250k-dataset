/** @module util/animation/easeout */
NEJ.define([
    'base/global',
    'base/klass',
    'base/util',
    './bezier.js'
],function(NEJ,_k,_u,_t0,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 先快后慢动画
     * 
     * 结构举例
     * ```html
     * <div id='id-bounce1'></div>
     * ```
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/animation/easeout'
     * ],function(_t){
     *     // 创建动画实例
     *     var _easeout  = _t._$$AnimEaseOut._$allocate({
     *         from:{
     *             offset:100
     *         },
     *         to:{
     *             offset:200
     *         },
     *         duration:1000,
     *         onupdate:function(_event){
     *             _box.style.left = _event.offset + 'px';
     *         },
     *         onstop:function(){
     *             this._$recycle();
     *         }
     *     });
     *     // 开始动画
     *     _easeout._$play();
     * });
     * ```
     * 
     * @class   module:util/animation/easeout._$$AnimEaseOut
     * @extends module:util/animation/bezier._$$AnimBezier
     * 
     * @param   {Object} config 可选配置参数
     */
    _p._$$AnimEaseOut = _k._$klass();
    _pro = _p._$$AnimEaseOut._$extend(_t0._$$AnimBezier);
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/animation/easeout._$$AnimEaseOut#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        _options = _u._$merge({},_options);
        _options.timing = 'easeout';
        this.__super(_options);
    };

    if (CMPT){
        NEJ.copy(NEJ.P('nej.ut'),_p);
    }

    return _p;
});