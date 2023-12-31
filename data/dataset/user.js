module.exports = {
    authorEmail: "guocat@gmail.com",
    copyright: "@Rebecca",
    customHeaders: {
        "rim-header": "RIM-Widget:rim/widget"
    },
    userAgent: "Some extremely long user agent (with) spe/cial, characters",
    author: "Me",
    version: "1.0.0.0",
    hasMultiAccess: true,
    license: "This is a license",
    accessList: [{
        allowSubDomain: false,
        features: [{
            version: "1.0.0.0",
            required: true,
            id: "blackberry.example.test"
        }, {
            version: "1.0.0.0",
            required: true,
            id: "blackberry.app"
        }],
        uri: "WIDGET_LOCAL"
    }],
    licenseURL: "",
    authorURL: "http://bbtools_win7_01/yui",
    foregroundSource: "derp.html",
    backgroundColor: 0xFFFF9900,
    content: "http://localhost/lib/public/testbed.html",
    description: "this is the description",
    configXML: "config.xml",
    name: "wwTest"
};
