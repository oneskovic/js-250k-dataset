var BID_TYPE_CPC            = 1;
var BID_TYPE_CPM            = 2;
var BID_TYPE_FCPM           = 4;
var BID_TYPE_MULTI_PREMIUM  = 5;
var BID_TYPE_MULTI_RELATIVE = 6;

function options(isCorporate) {
  var result = [
    { text: tx('ads:pe:bid-type:cpc'), value: BID_TYPE_CPC,
      tabSeparated: 'cpc' },
    { text: tx('ads:pe:bid-type:cpm'), value: BID_TYPE_CPM,
      tabSeparated: 'cpm' }
// Uncomment when we're ready to release BBB to self serve
//  { text: 'Multi', value: BID_TYPE_MULTI_RELATIVE,
//    tabSeparated: 'multi_relative' }
  ];

  if (global.INTERN && isCorporate) {
    // remove multi_relative, DSO has a different multi
    // result = result.slice(0, 2);

    result.push({ text: tx('ads:pe:bid-type:fcpm'), value: BID_TYPE_FCPM,
      tabSeparated: 'cpm_fixed' });
    result.push({ text: tx('ads:pe:bid-type:multi_premium'),
          value: BID_TYPE_MULTI_PREMIUM,
          tabSeparated: 'multi_premium' });
  }

  return result;
}

function getName(id, isCorporate) {
  for (var i = 0, d = options(isCorporate); i < d.length; i++) {
    if (d[i].value == id) { return d[i].text; }
  }
  return '';
}

function getTabSeparatedName(id, isCorporate) {
  for (var i = 0, d = options(isCorporate); i < d.length; i++) {
    if (d[i].value == id) { return d[i].tabSeparated; }
  }
  return '';
}


exports.BID_TYPE_CPC      = BID_TYPE_CPC;
exports.BID_TYPE_CPM      = BID_TYPE_CPM;
exports.BID_TYPE_FCPM     = BID_TYPE_FCPM;
exports.BID_TYPE_MULTI_PREMIUM  = BID_TYPE_MULTI_PREMIUM;
exports.BID_TYPE_MULTI_RELATIVE = BID_TYPE_MULTI_RELATIVE;

exports.options = options;
exports.getName = getName;
exports.getTabSeparatedName = getTabSeparatedName;
