/*global runtime, ops */

/*
 * create specific operation instances.
 */


/**
 * @constructor
 */
ops.OperationFactory = function OperationFactory() {
    "use strict";
    var /**@type{!Object.<!string, !ops.OperationFactory.SpecConstructor>}*/
        specs;

    /**
     * @param {!function(new:ops.Operation)} Constructor
     * @return {!ops.OperationFactory.SpecConstructor}
     */
    /*jslint unparam:true*/
    function construct(Constructor) {
        return function(spec) {
            return new Constructor();
        };
    }
    /*jslint unparam:false*/

    /**
     * Registers an operation constructor with this operation factory
     * @param {!string} specName
     * @param {!ops.OperationFactory.SpecConstructor} specConstructor
     * @return {undefined}
     */
    this.register = function (specName, specConstructor) {
        specs[specName] = specConstructor;
    };

    /**
     * Create an instance of an operation based on the provided spec
     * @param {!{optype:string}} spec
     * @return {ops.Operation}
     */
    this.create = function (spec) {
        var /**@type{ops.Operation}*/
            op = null,
            constructor = specs[spec.optype];
        if (constructor) {
            op = constructor(spec);
            op.init(spec);
        }
        return op;
    };

    function init() {
        specs = {
            AddMember: construct(ops.OpAddMember),
            UpdateMember: construct(ops.OpUpdateMember),
            RemoveMember: construct(ops.OpRemoveMember),
            AddCursor: construct(ops.OpAddCursor),
            ApplyDirectStyling: construct(ops.OpApplyDirectStyling),
            SetBlob: construct(ops.OpSetBlob),
            RemoveBlob: construct(ops.OpRemoveBlob),
            InsertImage: construct(ops.OpInsertImage),
            InsertTable: construct(ops.OpInsertTable),
            InsertText: construct(ops.OpInsertText),
            RemoveText: construct(ops.OpRemoveText),
            MergeParagraph: construct(ops.OpMergeParagraph),
            SplitParagraph: construct(ops.OpSplitParagraph),
            SetParagraphStyle: construct(ops.OpSetParagraphStyle),
            UpdateParagraphStyle: construct(ops.OpUpdateParagraphStyle),
            AddStyle: construct(ops.OpAddStyle),
            RemoveStyle: construct(ops.OpRemoveStyle),
            MoveCursor: construct(ops.OpMoveCursor),
            RemoveCursor: construct(ops.OpRemoveCursor),
            AddAnnotation: construct(ops.OpAddAnnotation),
            RemoveAnnotation: construct(ops.OpRemoveAnnotation),
            UpdateMetadata: construct(ops.OpUpdateMetadata),
            ApplyHyperlink: construct(ops.OpApplyHyperlink),
            RemoveHyperlink: construct(ops.OpRemoveHyperlink)
        };
    }

    init();
};


/**
 * @typedef {!function(!{optype:!string}):!ops.Operation}
 */
ops.OperationFactory.SpecConstructor;