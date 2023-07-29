/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.PropertiesSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Properties"));
}

WebInspector.PropertiesSidebarPane._objectGroupName = "properties-sidebar-pane";

WebInspector.PropertiesSidebarPane.prototype = {
    update: function(node)
    {
        var body = this.bodyElement;

        if (!node) {
            body.removeChildren();
            this.sections = [];
            return;
        }

        WebInspector.RemoteObject.resolveNode(node, WebInspector.PropertiesSidebarPane._objectGroupName, nodeResolved.bind(this));

        function nodeResolved(object)
        {
            if (!object)
                return;
            function protoList()
            {
                var proto = this;
                var result = {};
                var counter = 1;
                while (proto) {
                    result[counter++] = proto;
                    proto = proto.__proto__;
                }
                return result;
            }
            object.callFunction(protoList, undefined, nodePrototypesReady.bind(this));
            object.release();
        }

        function nodePrototypesReady(object)
        {
            if (!object)
                return;
            object.getOwnProperties(fillSection.bind(this));
        }

        function fillSection(prototypes)
        {
            if (!prototypes)
                return;

            var body = this.bodyElement;
            body.removeChildren();
            this.sections = [];

            // Get array of prototype user-friendly names.
            for (var i = 0; i < prototypes.length; ++i) {
                if (!parseInt(prototypes[i].name, 10))
                    continue;

                var prototype = prototypes[i].value;
                var title = prototype.description;
                if (title.match(/Prototype$/))
                    title = title.replace(/Prototype$/, "");
                var section = new WebInspector.ObjectPropertiesSection(prototype, title);
                this.sections.push(section);
                body.appendChild(section.element);
            }
        }
    }
}

WebInspector.PropertiesSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
