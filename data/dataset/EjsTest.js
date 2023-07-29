"use strict";

var Ejs = require('../../../').views.Ejs;

module.exports["basics"] = {

    "test init": function(test) {

        var view = new Ejs('<div></div>');

        test.equal(view.render(), '<div></div>');

        view = new Ejs('<div>Alas, poor <%= name%></div>');
        test.equal(view.render({name: 'Yorick'}), '<div>Alas, poor Yorick</div>');

        test.equal(view.isComplete(), false);
        
        test.done();
    },

    "test bad template throws": function(test) {

        try {
            var view = new Ejs(template);
        }
        catch (err) {

            test.equal(err.message, "failed to create view: SyntaxError: Unexpected reserved word");

            test.done();
        }
    }
}

var template = '\
    <% if (classList) { %>\
<div class="classMenu">\
    <h4>Classes</h4>\
<ul class="classList">\
    <% for (var i in classList.classes) { var cls = classList.classes[i]; %>\
    <li><a href="ref:action_link:/doc/default/class=<%= cls.name %>"><%= cls.name %></a></li>\
    <% } %>\
</ul>\
</div>\
<% } %>\
\
<div class="classDetail">\
    <h2>Class <span class="className"><%= class.name %></span></h2>\
    <% if (class.extends) { var parent = class.extends; %>\
    <h3>Extends <a class="parentClass" href="ref:action_link:/doc/default/class=<%= parent %>"><%= parent %></a></h3>\
    <% } %>\
    <% if (class.desc) { var desc = class.desc; %>\
    <p>\
        <%= desc.full %>\
    </p>\
    <% } %>\
    <h3>Methods</h3>\
    <ul class="methodList">\
    {.repeated section methods}\
        <li>\
            <span class="name">{name}({.repeated section params}{name}, {.end})</span>\
            {.section static}<span class="modifier">static</span>{.end}\
            {.section isConstructor}<span class="modifier">constructor</span>{.end}\
            {.section ret}<span class="return">returns {type}</span>{.end}\
            {desc.summary}\
            {.repeated section params}\
            <p>{name}: {desc}</p>\
            {.end}\
        </li>\
    {.end}\
    </ul>\
</div>';