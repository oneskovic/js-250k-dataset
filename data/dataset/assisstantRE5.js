/*
 * File: app/view/assisstantRE5.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.view.assisstantRE5', {
    extend: 'Ext.form.Panel',
    alias: 'widget.assisstantRE5',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    etape: '4',
    localiserId: 'qbs4',
    id: 'assisstantRE5',
    autoScroll: true,
    bodyPadding: 10,
    title: 'Choix des tris sur les champs',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    localiserId: 'qbs4sortBtn',
                    anchor: '90%',
                    id: 'createurTrisChampsAR',
                    style: {
                        float: 'left'
                    },
                    fieldLabel: 'Ajouter un tri sur ',
                    labelWidth: 140,
                    submitValue: false,
                    editable: false,
                    displayField: 'nom',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'champsTCARStore',
                    valueField: 'valeur'
                },
                {
                    xtype: 'button',
                    localiserId: 'qbs4auxbtn',
                    id: 'boutonCreateurTrisChampsAR',
                    style: {
                        float: 'right'
                    },
                    iconCls: 'add',
                    text: ''
                }
            ]
        });

        me.callParent(arguments);
    }

});