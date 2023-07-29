var CreateTypeView = Backbone.View.extend(
    {
        el:$('#workspace'), // must be explicitly set for event binding to work!
        events:{
            'submit':'saveToModel'
        },
        saveToModel:function (e) {
            e.preventDefault();

            var _this = this;
            var data = this.$('#createTypeForm').serializeObject();
            this.model.set(data);
            this.model.indexId = data.indexId.toLowerCase();


            // this triggers a RESTFul POST (or PUT) request to the URL specified in the model
            this.model.save(
                {
                    "settings":{
                        "number_of_shards":data.shards,
                        "number_of_replicas":data.replicas
                    }
                },
                {
                    success:function (model, response) {
                        Backbone.history.navigate('indices', true);
                        show_stack_bottomright({type:'success', title:'Index Created', text:'"' + _this.model.indexId + '" index created.'});
                    },
                    error:function (model, response, options) {
                        {
                            var err = '<p>Server Response is...</p><pre class="prettyprint linenums language-json">' + response.responseText + '</pre>';
                            show_stack_bottomright({type:'error', title:'Index Failed', text:err, hide:false, closer_hover:false});
                            prettyPrint();
                            Backbone.history.navigate('indices', true);
                        }
                    }
                }
            );
            this.unbind();

            return false;
        },
        render:function () {
            var template = _.template(mappingTemplate.createType, {model:this.model});
            $('#workspace').html(template);
            Backbone.Validation.bind(this);
            //this.model.on('validated:valid', this.valid, this);
            //this.model.on('validated:invalid', this.invalid, this);
            return this;
        },
        onClose:function () {
            this.model.unbind("submit", this.render);
        }
    });