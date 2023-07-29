var event = require('ripple/event'),
    utils = require('ripple/utils'),
    _type = {
        sms: "SMS",
        mms: "MMS",
        email: "E-mail"
    },
    _filename_suffix = 0,
    _attachments = [];

function _getAttachmentFileName() {
    return "attach" + _filename_suffix + ".txt";
}

module.exports = {
    panel: {
        domId: "messaging-container",
        collapsed: true,
        pane: "left",
        titleName: "Messaging",
        display: true
    },
    initialize: function () {
        document.getElementById("messaging-send")
            .addEventListener("click", function () {
                var number = document.getElementById("messaging-sms-number").value,
                    text = document.getElementById("messaging-text").value,
                    type = document.getElementById("messaging-type").value,
                    message = {
                        type: type,
                        body: text,
                        from: number,
                        time: new Date(),
                        attachments: _attachments
                    };

                event.trigger("MessageReceived", [message]);
                
                _attachments = [];
/* TODO: add back when attachment is finished
                document.getElementById("messaging-attachments").innerHTML = "";
*/
                _filename_suffix = 0;
            }, false);

/* TODO: add back when attachment is finished
        document.getElementById("messaging-attach")
            .addEventListener("click", function () {
                var attachedFile, attachedFileCheckbox, attachedFileName;
                if (_filename_suffix > 0)
                    return;
                _attachments.push({filename: _getAttachmentFileName(), content: document.getElementById("messaging-attachment-content").value});

                attachedFile = document.getElementById("messaging-attachments").insertRow(0);
                attachedFileName = attachedFile.insertCell(0);
                attachedFileCheckbox = attachedFile.insertCell(1);
                attachedFileName.innerHTML = _attachments[_filename_suffix].filename;
//                attachedFileCheckbox.innerHTML = '<input type="checkbox" value="' + _filename_suffix + '">';

                document.getElementById("messaging-attachment-content").value = "";
                _filename_suffix++;
            }, false);

        document.getElementById("messaging-detach")
            .addEventListener("click", function () {
                _attachments = [];
                document.getElementById("messaging-attachments").innerHTML = "";
                _filename_suffix = 0;
            }, false);
*/
        event.on("OutsideMessageReceived", function (message) {
            var numRecipients = 0,
                i = 0,
                recipients = [],
                recipientsStatus = {},
                strRecipients = document.getElementById("messaging-recipients").value;

            recipientsStatus.id = message.id;
            recipientsStatus.msg = message.msg;
            for (i in message.to) {
                recipientsStatus[message.to[i]] = true;
                recipients.push(message.to[i]);
            }
            for (i in message.cc) {
                recipientsStatus[message.cc[i]] = true;
                recipients.push(message.cc[i]);
            }
            for (i in message.bcc) {
                recipientsStatus[message.bcc[i]] = true;
                recipients.push(message.bcc[i]);
            }
            numRecipients = recipients.length;
            strRecipients = recipients.join(",");
            event.trigger("MessageSent", [recipientsStatus]);
            document.getElementById("messaging-received").innerHTML = "" + numRecipients + " recipient(s)" + " delivered";
            document.getElementById("messaging-recipients").value = strRecipients;
            document.getElementById("received-message-box").value = message.body;
        });
        
        document.getElementById("messaging-clear")
            .addEventListener("click", function () {
                document.getElementById("received-message-box").value = "";
                document.getElementById("messaging-received").innerHTML = "";
            }, false);
        
        utils.forEach(_type, function (msgTypeText, msgType) {
            var typeNode = utils.createElement("option", {
                    "innerText": msgTypeText,
                    "value": msgType
                });

            document.getElementById("messaging-type").appendChild(typeNode);
        });
    }
};
