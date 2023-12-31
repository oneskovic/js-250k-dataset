///import baidu.ui.dialog;
///import baidu.ui.dialog.Dialog;
///import baidu.ui.dialog.Dialog$button;
///import baidu.lang.isString;
///import baidu.ui.dialog.Dialog$keyboard;

baidu.ui.dialog.alert = function(content, options){
    var dialogInstance;
    
    options = baidu.extend({
        type    : "alert",
        buttons : {
            "accept" : {
                "content" : "确定",
                "onclick" : function(){
                    var me = this,
                        parent = me.getParent();
                    parent.dispatchEvent("onaccept") && parent.close();
                }
            }
        }
    },options || {});
    if(baidu.isString(content)){
        options.contentText = content;
    } else {
        options.content = content;
    }
    dialogInstance = new baidu.ui.dialog.Dialog(options);
    
    //默认自动dispose
    if(typeof options.autoDispose == 'undefined' || options.autoDispose){
        dialogInstance.addEventListener("onclose", function(){
            this.dispose();
        });
    }
    dialogInstance.render();
    //默认打开dialog
    if(typeof options.autoOpen == 'undefined' || options.autoOpen){
        dialogInstance.open();
    }

    //注册ontener事件
    dialogInstance.addEventListener("onenter",function(e){
        this.buttonInstances["accept"].fire("click",e); 
    });
    return dialogInstance;
};
