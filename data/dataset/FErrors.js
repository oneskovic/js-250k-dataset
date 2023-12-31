module.exports = {
  COULD_NOT_CREATE_SINGLE_DOM: "Could not create single dom node",
  CANNOT_SET_INNERHTML: "YOU CANNOT EVER SET INNERHTML. You must use the " +
    "name that evokes what is really going on. dangerouslySetInnerHtml",
  MUST_SPECIFY_TOP_COMP: "You must specify a top level constructor - or " +
    "component declarative creation specification - i.e. " +
    "{something:x}.Div(). What you specified appears " +
    "to be null or not specified. If " +
    "specifying a declarative block - make sure you execute " +
    "F.using(moduleContainingTopmostComponent) in the file where " +
    "you render the top level component.",
  NAMESPACE_FALSEY: "Namespace is falsey wtf!",
  CLASS_NOT_COMPLETE: "Class does not implement required functions! " +
      "Implement the 'structure' function.",
  NO_DOM_TO_HIDE: "No DOM node to hide!",
  CONTROL_WITHOUT_BACKING_DOM: "Trying to control a native dom element " +
                               "without a backing id",
  UPDATE_STATE_PRE_PROJECT: "Cannot update state before your done projecting!!",
  FAILED_ASSERTION: "Assertion Failed - no error message given",
  NO_TOP_LEVEL_ID: "You must at least specify a top " +
    "level id to mount at. The second " +
    "parameter of renderTopLevelComponentAt must either be a string (the " +
    "id to render at) or an object containing a mountAtId field",
  MERGE_DEEP_ARRAYS: 'Cannot mergeDeep arrays',

  /*
   * Currently don't support the case where children[0] was previously non-empty
   * yet became empty - or if was originally empty yet became non-empty. This
   * won't be too difficult to support but all the edge cases need to be
   * considered. For the time being, think of childList as an array of children
   * that grows in a single direction - though we support the case where
   * children change types/instances.
   */
  MISSING_ARRAY_CHILD: 'Holes in arrays not allowed',

  /* For those who are curious. The alternative is to clone only if we see a
   * child structure that has already been mounted on the dom. It's more complex
   * that it seems - but we should look into making it work eventually.
   */
  USING_CHILD_TWICE: 'Cannot reuse child twice - for performance reasons. ' +
    'Make a factory function if it makes your code more readable.',

  throwIf: function(b, err) {
    if (b) { throw err; }
  }
};

