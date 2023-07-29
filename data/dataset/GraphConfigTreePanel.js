OE.GraphConfigTreePanel = Ext.extend(Ext.tree.TreePanel, {
    refresh: function () {
        var expandedPaths = this.getExpandedPaths();
        this.root.reload();
        this.applyExpandedPaths(expandedPaths);
    },
    getExpandedPaths: function () {
        var expandedPaths = [];

        this.root.cascade(function (n) {
            if (n.expanded) {
                expandedPaths.push(n.getPath());
            }
        }, this);

        return expandedPaths;
    },
    applyExpandedPaths: function (expandedPaths) {
        if (expandedPaths && expandedPaths.length > 0) {
            for (var i = 0; i < expandedPaths.length; i++) {
                this.expandPath(expandedPaths[i]);
            }
        }
    },
    resetCheckedValues: function () {
        this.root.cascade(function (n) {
            if (n.attributes.leaf) {
                n.attributes.checked = n.attributes.value === "1";

                this.propagateCheckedValues(n, n.attributes.checked);
            }
        }, this);

        this.refresh();
    },

    reset: this.resetCheckedValues,

    acceptCheckedValues: function () {
        this.root.cascade(function (n) {
            if (n.attributes.leaf) {
                if (n.attributes.checked) {
                    n.attributes.value = "1";
                } else {
                    n.attributes.value = "0";
                }
            }
        }, this);
    },
    getCheckedValues: function () {
        var s = "";

        this.root.cascade(function (n) {
            if (n.attributes.leaf) {
                if (n.attributes.checked) {
                    s += n.attributes.value;
                } else {
                    s += n.attributes.value;
                }
            }
        }, this);

        return s;
    },
    propagateCheckedValues: function (n) {
        // check parent
        var p = n.parentNode;

        if (p) {
            var unchecked = 0;

            p.eachChild(function (n) {
                if (!n.attributes.checked) {
                    unchecked++;
                }
            });

            p.attributes.checked = unchecked === 0;
        }
        // check children
        n.eachChild(function (c) {
            if (c) {
                c.attributes.checked = n.attributes.checked;
            }
        });
    },
    listeners: {
        checkchange: function (n, checked) {
            this.propagateCheckedValues(n, checked);
            this.refresh();
        }
    }
});
Ext.reg('graphConfigTreePanel', OE.GraphConfigTreePanel);
