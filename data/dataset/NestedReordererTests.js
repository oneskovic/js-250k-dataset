// Declare dependencies
/* global fluid, jqUnit */

(function ($) {
    "use strict";

    $(document).ready(function () {

        jqUnit.module("Nested Reorderer Tests");

        var itemIds = function (prefix, indexes) {
            return fluid.testUtils.reorderer.prepend(prefix, indexes);
        };

        var assembleOptions = function (isDisableWrap, movables, prefix, indexes) {
            var obj = {
                selectors: {
                    movables: movables
                },
                disableWrap: isDisableWrap,
                reordererFn: "fluid.reorderList",
                expectOrderFn: fluid.testUtils.reorderer.assertItemsInOrder,
                key: fluid.testUtils.reorderer.bindReorderer(itemIds(prefix, indexes)).compositeKey,
                thumbArray: movables,
                prefix: prefix
            };
            return obj;
        };

        var assembleAndTestReorderer = function (container, movables, itemSelector, itemIndex, prefix, indexes, expected) {
            fluid.testUtils.reorderer.stepReorderer(container, {
                reordererOptions: assembleOptions(true, movables, prefix, indexes),
                direction: "UP",
                expectedOrderArrays: [expected],
                itemSelector: itemSelector,
                itemIndex: itemIndex
            });
        };

        jqUnit.test("Nested reorderer, user action ctrl+up on outer then inner reorderers", function () {
            assembleAndTestReorderer("#outer_list", ".outer", $("#list1item4"),
                3, "list1item", [1, 2, 3, 4], [1, 2, 4, 3]);
            assembleAndTestReorderer("#list1item4", ".inner", $("#list2item2"),
                1, "list2item", [1, 2, 3], [2, 1, 3]);
        });
    });
})(jQuery);