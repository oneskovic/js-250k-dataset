var content, delegate ;
var Delegate = SC.Object.extend(SC.CollectionRowDelegate, {
  rowHeight: 40,
  customRowHeightIndexes: SC.IndexSet.create(3).add(5,2),
  contentIndexRowHeight: function(view, content, index) {
    return this.get('customRowHeightIndexes').contains(index) ? view.get('customRowHeight') : this.get('rowHeight');
  },
  
  expected: function(view) {
    var ret = [],
        content = view.get('content'),
        loc = view.get('length');
        
    while(--loc>=0) {
      ret[loc] = this.contentIndexRowHeight(view,content,loc);
    }
    
    return ret ;
  }
});

suite("SC.ListView.rowHeightForContentIndex", {
  setup: function() {
    content = "1 2 3 4 5 6 7 8 9 0".w().map(function(x) {
      return SC.Object.create({ value: x });
    }, this);
    
    // set this delegate if you want custom row heights
    delegate = Delegate.create();
    
  }
});

function verifyRowHeights(view, rowHeight, expected) {
  var loc = view.get('length'), actual;
  
  ok(loc>0, 'content should have some length');
  equals(view.rowHeightForContentIndex(loc+1), rowHeight, 'content.rowHeightForContentIndex(length+1) should be rowHeight');
  
  while(--loc>=0) {
    actual = view.rowHeightForContentIndex(loc);
    if (expected) {
      equals(actual, expected[loc], "content.rowHeightForContentIndex(%@) should be custom row height".fmt(loc));
    } else {
      equals(actual, rowHeight, 'content.rowHeightForContentIndex(%@) should be rowHeight'.fmt(loc));
    }
  }
}

// ..........................................................
// BASIC TESTS
// 

test("constant row heights", function() {
  var view = SC.ListView.create({ content: content, rowHeight: 40, customRowHeightIndexes: null });
  verifyRowHeights(view, 40);
});

test("constant row heights with rowSpacing", function() {
  var view = SC.ListView.create({ content: content, rowHeight: 40, rowSpacing: 2, customRowHeightIndexes: null });
  verifyRowHeights(view, 40);
});

test("custom row heights", function() {
  var view = SC.ListView.create({
    content: content,
    customRowHeight: 50,
    delegate: delegate
  });
  verifyRowHeights(view, 40, delegate.expected(view));
});

test("adding delegate should update calculation", function() {
  var view = SC.ListView.create({
    content: content,
    rowHeight: 30,
    customRowHeight: 50
  });

  verifyRowHeights(view, 30);
  
  view.set('delegate', delegate);
  verifyRowHeights(view, 40, delegate.expected(view));
});

test("changing delegate from custom to not custom should update", function() {
  var view = SC.ListView.create({
    content: content,
    rowHeight: 30,
    customRowHeight: 50,
    delegate: delegate
  });
  verifyRowHeights(view, 40, delegate.expected(view));
  
  delegate.set('customRowHeightIndexes', null);
  verifyRowHeights(view, 40);
});

// ..........................................................
// SPECIAL CASES
// 

test("computed custom row height indexes", function() {
  
  delegate = Delegate.create({
    indexes: Delegate.prototype.customRowHeightIndexes,
    useIndexes: false,
    
    customRowHeightIndexes: function() {
      return this.get('useIndexes') ? this.get('indexes') : null;
    }.property('useIndexes').cacheable()
  });

  var view = SC.ListView.create({
    content: content,
    rowHeight: 15,
    customRowHeight: 50,
    delegate: delegate
  });
  verifyRowHeights(view, 40);


  delegate.set('useIndexes', true);
  verifyRowHeights(view, 40, delegate.expected(view));  
});

