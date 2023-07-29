/**
 * the home controller
 * @param  {object}   req  the request obj
 * @param  {object}   res  the instance of response
 * @param  {Function} next the next handler
 * @return {null}        
 */
exports.index = function (req, res, next){
    debugCtrller("controllers/others/index");

    if (!req.session || !req.session.user) {
        return res.redirect("/login");
    }

    res.render('subviews/index');
};

/**
 * api controller
 * @param  {object}   req  the instance of request
 * @param  {object}   res  the instance of response
 * @param  {Function} next the next handler
 * @return {null}        
 */
exports.apis = function (req, res, next) {
    debugCtrller("controllers/others/apis");
    res.render('api');
};

/**
 * 404 error controller
 * @param  {object}   req  the instance of request
 * @param  {object}   res  the instance of response
 * @param  {Function} next the next handler
 * @return {null}        
 */
exports.fourofour=function (req, res, next){
    debugCtrller("controllers/others/404");
    res.render('errors/404');
};