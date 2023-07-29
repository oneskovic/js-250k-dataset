var bootcards = bootcards || {};

bootcards._isXS = null;


bootcards.findBootstrapEnvironment = function() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-'+envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i];
        }
    };
}

bootcards.isXS = function() {
    if (this._isXS === null ) {
        this._isXS = (this.findBootstrapEnvironment() == "ExtraSmall");
    }
    return this._isXS;
}

/*
 * Disable rubberbanding effect in iOS.
 * Based on the 'Baking Soda Paste' technique written by Armagan Amcalar at
 * http://blog.armaganamcalar.com/post/70847348271/baking-soda-paste
 */
bootcards.disableRubberBanding = function() {
   document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener);

            var el = e.target;

            do {

                var h = parseInt(window.getComputedStyle(el, null).height, 10);
                var sH = el.scrollHeight;

                if (h < sH) {
                    return;
                }
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            e.preventDefault();
        });
    });

}