"use strict";

var ReactElement = require('ReactElement');
var ReactInstanceHandles = require('ReactInstanceHandles');
var ReactMarkupChecksum = require('ReactMarkupChecksum');
var ReactServerRenderingTransaction =
  require('ReactServerRenderingTransaction');

var instantiateReactComponent = require('instantiateReactComponent');
var invariant = require('invariant');

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup
 */
function renderToString(element) {
  invariant(
    ReactElement.isValidElement(element),
    'renderToString(): You must pass a valid ReactElement.'
  );

  var transaction;
  try {
    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(false);

    return transaction.perform(function() {
      var componentInstance = instantiateReactComponent(element, null);
      var markup = componentInstance.mountComponent(id, transaction, 0);
      return ReactMarkupChecksum.addChecksumToMarkup(markup);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);
  }
}

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup, without the extra React ID and checksum
 * (for generating static pages)
 */
function renderToStaticMarkup(element) {
  invariant(
    ReactElement.isValidElement(element),
    'renderToStaticMarkup(): You must pass a valid ReactElement.'
  );

  var transaction;
  try {
    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(true);

    return transaction.perform(function() {
      var componentInstance = instantiateReactComponent(element, null);
      return componentInstance.mountComponent(id, transaction, 0);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);
  }
}

module.exports = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup
};
