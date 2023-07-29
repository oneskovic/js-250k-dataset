Ext.define('SenchaTouchSample.view.Help', {
    extend: 'Ext.Container',
    xtype: 'helpcard',

    config: {

        items: [

                {
                  xtype: 'toolbar',
                  docked: 'top',
                  title: 'Help',
                },
                {
                  xtype: 'toolbar',
                  docked: 'bottom',
                  items: [
                          {
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back',
                            handler: function() {
                                var homecard = Ext.create('SenchaTouchSample.view.Home');
                                Ext.Viewport.setActiveItem(homecard);
                            }
                                        
                          }
                        ]
                }
               ]
    }
});

      

    