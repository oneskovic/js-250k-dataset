define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dojo/on", "dojo/query", "dojo/dom-style", "dijit/layout/_LayoutWidget", "dijit/layout/ContentPane",
  "dojo/text!pentaho/common/DisableablePanel.html"],
    function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, on, query, style, _LayoutWidget, ContentPane, templateStr) {
      return declare("pentaho.common.DisableablePanel",[ContentPane, _LayoutWidget,_TemplatedMixin, _WidgetsInTemplateMixin],
          {

            templateString: templateStr,
            width: "150",
            disabled: false,

            postCreate: function () {
              this.inherited(arguments);

              if (this.disabled) {
                this.disable();
              }

            },

            disable: function () {
              style.set(this.disabledPane, {
                display: "block",
                height: "100%",
                width: "100%"
              });

              query('input', this.containerNode).forEach(
                  function (inputElem) {
                    inputElem.disabled = true;
                  }
              );

              this.disabled = true;
            },

            enable: function () {
              style.set(this.disabledPane, {
                display: "none"
              });

              query('input', this.containerNode).forEach(
                  function (inputElem) {
                    inputElem.disabled = false;
                  }
              );

              this.disabled = false;

            }

          });
    });
