exports.metadata =
{
    "bespin":
    {
        "provides":
        [
            {
                "ep": "extensionpoint",
                "name": "extensionpoint",
                "indexOx": "name",
                "register": "plugins#registerExtensionPoint",
                "unregister": "plugins#unregisterExtensionPoint",
                "description": "Defines a new extension point",
                "params": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "the extension point's name",
                        "required": true
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "description": "description of what the extension point is for"
                    },
                    {
                        "name": "params",
                        "type": "array of objects",
                        "description": "parameters that provide the metadata for a given extension. Each object should have name and description, minimally. It can also have a 'type' (eg string, pointer, or array) and required to denote whether or not this parameter must be present on the extension."
                    },
                    {
                        "name": "indexOn",
                        "type": "string",
                        "description": "You can provide an 'indexOn' property to name a property of extensions through which you'd like to be able to easily look up the extension."
                    },
                    {
                        "name": "register",
                        "type": "pointer",
                        "description": "function that is called when a new extension is discovered. Note that this should be used sparingly, because it will cause your plugin to be loaded whenever a matching plugin appears."
                    },
                    {
                        "name": "unregister",
                        "type": "pointer",
                        "description": "function that is called when an extension is removed. Note that this should be used sparingly, because it will cause your plugin to be loaded whenever a matching plugin appears."
                    }
                ]
            },
            {
                "ep": "extensionpoint",
                "name": "extensionhandler",
                "register": "plugins#registerExtensionHandler",
                "unregister": "plugins#unregisterExtensionHandler",
                "description": "Used to attach listeners ",
                "params": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "name of the extension point to listen to",
                        "required": true
                    },
                    {
                        "name": "register",
                        "type": "pointer",
                        "description": "function that is called when a new extension is discovered. Note that this should be used sparingly, because it will cause your plugin to be loaded whenever a matching plugin appears."
                    },
                    {
                        "name": "unregister",
                        "type": "pointer",
                        "description": "function that is called when an extension is removed. Note that this should be used sparingly, because it will cause your plugin to be loaded whenever a matching plugin appears."
                    }
                ]
            },
            {
                "ep": "extensionpoint",
                "name": "factory",
                "description": "Provides a factory for singleton components. Each extension needs to provide a name, a pointer and an action. The action can be 'call' (if the pointer refers to a function), 'new' (if the pointer refers to a traditional JS object) or 'value' (if the pointer refers to the object itself that is the component).",
                "indexOn": "name"
            },
            {
                "ep": "factory",
                "name": "hub",
                "action": "create",
                "pointer": "util/hub#Hub"
            },
            {
                "ep": "extensionpoint",
                "name": "command",
                "description": "Editor commands/actions. TODO: list parameters here."
            }
        ]
    }
};
