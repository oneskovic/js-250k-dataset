requireCss("./columnSelector/columnSelector.css");


var view  = require("../../uki-core/view");
var build = require("../../uki-core/builder").build;
var fun   = require("../../uki-core/function");
var find  = require("../../uki-core/selector").find;
var utils = require("../../uki-core/utils");
var Container = require("../../uki-core/view/container").Container;


var ColumnSelector = view.newClass('ads.ColumnSelector', Container, {

  _createDom: function(initArgs) {
    Container.prototype._createDom.call(this, initArgs);
    build([
      { view: 'Container', addClass: 'pbm', childViews: [
        { view: 'Checkbox', text: 'Select All',
          on: { click: fun.bindOnce(this._onselection, this) }
        }]
      },
      { view: 'List', addClass: 'columnSelector-list' },
      { view: 'List', addClass: 'columnSelector-list' },
      { view: 'List', addClass: 'columnSelector-list' }
    ]).appendTo(this);

    this.allSelected(false);
    this.noneSelected(false);
  },

  allSelected: fun.newProp('allSelected'),
  noneSelected: fun.newProp('noneSelected'),

  columns: function(columns) {
    var lists = find('List', this);
    this.column_key_index_map = {};

    lists.forEach(function(l) { l.childViews([]); });
    columns.forEach(function(c, i) {
      lists[i * lists.length / columns.length << 0]
        .appendChild(build(
          { view: 'Checkbox', text: c.desc || c.label,
            key: c.key,
            childcb: true })[0]);
      this.column_key_index_map[c.key] = c.index;
    }, this);
  },

  values: function(values) {
    if (values === undefined) {
      var result = [];
      find('[childcb=true]', this).forEach(function(cb, i) {
        if (cb.checked()) {
          result.push(cb.key || i);
        }
      });
      return result;
    }
    var cbs = find('[childcb=true]', this);
    cbs.prop('checked', false);
    values.forEach(function(key) {
      var index = this.column_key_index_map[key];
      cbs[index].checked(true);
    }, this);
    return this;
  },

  selectAll: function() {
    find('[childcb=true]', this).forEach(function(cb) {
      if (!cb.checked()) {
        cb.checked(true);
      }
    });
    this.allSelected(true);
    this.noneSelected(false);
  },

  unselectAll: function() {
    find('[childcb=true]', this).forEach(function(cb) {
      if (cb.checked()) {
        cb.checked(false);
      }
    });
    this.allSelected(false);
    this.noneSelected(true);
  },

  checkSelection: function() {
    find('[childcb=true]', this).forEach(fun.bind(function(cb) {
      if (cb.checked()) {
        this.noneSelected(false);
      } else {
        this.allSelected(false);
      }
    }, this));
  },

  _onselection: function() {
    var cbselect = find('Checkbox', this)[0];
    if (cbselect.checked()) {
      this.selectAll();
    } else {
      this.unselectAll();
    }
  },

  setCBStatus: function() {
    this.checkSelection();

    var cbselect = find('Checkbox', this)[0];
    if (this.allSelected()) {
      cbselect.checked(true);
    } else {
      cbselect.checked(false);
    }
  }

});


exports.ColumnSelector = ColumnSelector;

