var path = require("path");

exports.config = {
    debug               : true,
    name                : "资产管理系统",
    giftname            : "礼物管理系统",
    description         : "Fixed Asset Manager",
    version             : "0.0.1",

    port                : 8088,

    site_headers        : [
        '<meta name="author" content="freedom" />',
    ],

    site_static_host    : "",
    mini_assets         : true,

    session_secret      : "Fixed_Asset_0987654321",

    mail_opts           : {
        host  : "smtp.163.com",
        port  : 25,
        auth  : {
            user  : "wisasset@163.com",
            pass  : "adminn"
        }
    },

    mailDefault_TO      : [
        "huayang@wisedu.com",
        "zcliu@wisedu.com"
    ],

    networkIsOk         : 1,

    //five field: ss mm hh dd MM day-of-week
    // * - match all
    // / - pre field
    // eg : "00 00 9 */7 *" means run once every 7 days at 9:00 am
    limitCronPattern         : "00 00 10 * * 1-5",

    backupCronPattern        : "00 00 23 * * *",

    backupPushCronPattern    : "00 30 23 */3 * *"

};