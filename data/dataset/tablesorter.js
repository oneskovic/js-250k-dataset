/**
 * custom sorter for filesize columns
 */
$.tablesorter.addParser({
    id:'datasize',
    is:function (s) {
        return s.match(new RegExp(/[0-9]+(\.[0-9]+)?\ (B|K|KB|G|GB|M|MB|T|TB)/i));
    },
    format:function (s) {
        if (s != 0) {
            var suf = s.match(new RegExp(/(B|K|KB|G|GB|M|MB|T|TB)/i))[1];
            var num = parseFloat(s.match(new RegExp(/^[0-9]+(\.[0-9]+)?/))[0]);
            switch (suf.toLowerCase()) {
                case 'b':
                    return num;
                case 'k':
                case 'kb':
                    return num * 1024;
                case 'm':
                case 'mb':
                    return num * 1024 * 1024;
                case 'g':
                case 'gb':
                    return num * 1024 * 1024 * 1024;
                case 't':
                case 'tb':
                    return num * 1024 * 1024 * 1024 * 1024;
            }
        }
    },
    type:'numeric'
});

/**
 * Persists table sorting for all tables implementing the jquery tablesort plugin
 */
$.tablesorter.addWidget({
    // give the widget an id
    id:"sortPersist",
    // format is called in the on init and when a sorting has finished
    format:function (table) {

        // Cookie info
        var cookieName = 'elastichq_tablesorts';
        var cookie = $.cookie(cookieName);
        var options = {path:'/'};

        var data = {};
        var sortList = table.config.sortList;
        var tableId = $(table).attr('id');
        var cookieExists = (typeof(cookie) != "undefined" && cookie != null);

        // If the existing sortList isn't empty, set it into the cookie and get out
        if (sortList.length > 0) {
            if (cookieExists) {
                data = JSON.parse(cookie);
            }
            data[tableId] = sortList;
            $.cookie(cookieName, JSON.stringify(data), options);
        }

        // Otherwise...
        else {
            if (cookieExists) {

                // Get the cookie data
                var data = JSON.parse($.cookie(cookieName));

                // If it exists
                if (typeof(data[tableId]) != "undefined" && data[tableId] != null) {

                    // Get the list
                    sortList = data[tableId];

                    // And finally, if the list is NOT empty, trigger the sort with the new list
                    if (sortList.length > 0) {
                        $(table).trigger("sorton", [sortList]);
                    }
                }
            }
        }
    }
});
