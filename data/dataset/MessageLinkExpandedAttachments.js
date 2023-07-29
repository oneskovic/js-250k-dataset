/*jslint plusplus: false, nomen: false */
/*global require: false */
"use strict";

require.modify("rdw/Message", "rdw/ext/MessageLinkExpandedAttachments",
["require", "rd", "dojo", "rdw/Message"], function (
  require,   rd,   dojo,   Message) {
    /*
    Applies a display extension to rdw/Message.
    Allows showing links included in the message as inline attachments
    */

    rd.addStyle("rdw/ext/css/MessageLinkExpandedAttachments");

    rd.applyExtension("rdw/ext/MessageLinkExpandedAttachments", "rdw/Message", {
        addToPrototype: {
            linkHandlers: [{
                schemas: ["rd.attach.link.expanded"],
                handler: function (attachment) {
                    var schema = attachment.schemas["rd.attach.link.expanded"];
                    //NOTE: the "this" in this function is the instance of rdw/Message.
                    var linkNode, templateObj, template, titleTemplate;
                    template = '<a target="_blank" class="title long_url" title="${long_url}" href="${short_url}">${long_url}</a>' +
                               '<div class="description">${description}</div>' +
                               '<span class="by">by</span> ' +
                               '<abbr class="owner" title="${user_name}@${domain}">${display_name}</abbr>';

                    titleTemplate = '<a target="_blank" class="title" title="${long_url}" href="${short_url}">${title}</a>' +
                                    '<div class="description">${description}</div>' +
                                    '<span class="by">by</span> ' +
                                    '<abbr class="owner" title="${user_name}@${domain}">${display_name}</abbr>';

                    templateObj = {
                        long_url      : schema.long_url,
                        short_url     : schema.short_url,
                        domain        : schema.domain,
                        title         : schema.title || "",
                        description   : schema.description || "",
                        display_name  : schema.display_name || schema.user_name,
                        user_name     : schema.user_name || ""
                    };

                    if (schema.title) {
                        template = titleTemplate;
                    }

                    this.addAttachment('<div domain="' + schema.domain +
                                       '" class="link expanded">' +
                                       rd.template(template, templateObj) +
                                       '</div>', 'link');
                    return true;
                }
            }]
        }
    });
});
