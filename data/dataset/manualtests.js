(function(window) {

var ManualTest = function(title, testPath, initialHeight, assertion) {
    this.element = $("<div/>", { class:"manual-test clearfix" })
    var header = $("<div/>", {class: "manual-test-header"}).appendTo(this.element);
    this.title = $("<h4/>", {text:title}).appendTo(header);

    this.contentBox = $("<div/>", {class: "test-content-box clearfix"} ).appendTo(this.element);
    this.result = $("<iframe/>", { src: testPath + ".html", class: "manual-test-actual" }).appendTo(this.contentBox);
    this.expected = $('<iframe/>', { src: testPath + "-expected.html", class: 'manual-test-expected' }).appendTo(this.contentBox);

    if (initialHeight !== undefined) {
        this.result.height(initialHeight);
    }

    this.footer = $("<div/>", {class: "clearfix manual-test-footer"}).appendTo(this.element);

    if (!assertion)
        this.assertionText = this.defaultAssertionText;
    else
        this.assertionText = assertion;


    this.assertion = $("<span/>",
                {
                  text: this.assertionText,
                  style: "vertical-align:middle"
                }).appendTo(this.footer);

    this.btnYes = $("<div/>",
                    { class: 'btn btn-success',
                      text: 'YES',
                      style: "float:right"
                    }).appendTo(this.footer);
    this.btnNo = $("<div/>",
                    { class: 'btn btn-danger',
                      text: "NO",
                      style: "float:right"}).appendTo(this.footer);
    this.bottomLayer = this.defaultBackdropGradient;

    // Hide the results element to avoid some unpleasant visual (flicker) effects
    // when it is resized, especially from its position:absolute children. It is
    // made visible after the expected image is loaded, and the element gets its
    // final size.
    // This resize 'flicker' happens mostly for element blending tests
    this.expected.css("visibility", "hidden");
    this.result.css("visibility", "hidden");
    this.expected.load(this, function(event) {
        var self = event.data;

        // Hack for IE to maintain the images aspect ratio, which is approximately
        // 1:1 (give or take a few pixels). IE 9 makes the image height almost
        // double the width of the image, for some reason I have yet to determine.
        self.expected.height(self.expected.width() + "px");
        // End Hack

        // This element needs to have a fixed size set, especially for background
        // blending tests, since backgrounds do not stretch the containing element.
        self.result.width(self.expected.width() + "px");
        self.result.height(self.expected.height() + "px");
        self.expected.css("visibility", "visible");
        self.result.css("visibility", "visible");
    });
}

ManualTest.prototype = {
    defaultAssertionText: "Does the image on the left have the same colors as the one on the right?",

    // Pass in an acceptable value for the background property here.
    setBottomLayer : function(bottomLayerValue) {
        this.bottomLayer = bottomLayerValue;
    }
}

window.ManualTest = ManualTest;



// get at whatever the global object is, like window in browsers
})( (function() {return this}).call() );
