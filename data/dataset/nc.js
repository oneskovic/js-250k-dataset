/**
 * Creates a new neume component
 *
 * @class Represents a neume component
 * @param {Number} diff Difference from root note
 * @param {Object} options type {string} corresponding to Toe.Model.NeumeComponent.Type
 *                         ornaments {Array} list of Toe.Model.Ornaments
 */
Toe.Model.NeumeComponent = function(options) {
    this.props = {
        type: "punctum",
        ornaments: [],
        interact: true
    };

    $.extend(this.props, options);
};

Toe.Model.NeumeComponent.prototype = new Toe.Model.Model();
Toe.Model.NeumeComponent.prototype.constructor = Toe.Model.NeumeComponent;

Toe.Model.NeumeComponent.Type = {
    punctum: "Punctum",
    virga: "Virga",
    cavum: "Cavum",
    punctum_inclinatum: "Punctum Inclinatum",
    punctum_inclinatum_parvum: "Punctum Inclinatum Parva",
    quilisma: "Quilisma",
    tractulus: "Tractulus",
    gravis: "Gravis",
    oriscus: "Oriscus",
    stropha: "Stropha"
};

/**
 * Check if the neume component has the specified ornament
 *
 * @methodOf Toe.Model.NeumeComponent
 * @param {String} oType ornament type
 * @return {Number} 1 if ornament exists, 0 if does not exist 
 */
Toe.Model.NeumeComponent.prototype.hasOrnament = function(oType) {
    return $.grep(this.props.ornaments, function(o) {
        return o.key == oType.toLowerCase();
    }).length;
}

/**
 * Add an ornament to the neume component.
 *
 * @methodOf Toe.Model.NeumeComponent
 * @param {Toe.Model.Ornament}
 */
Toe.Model.NeumeComponent.prototype.addOrnament = function(ornament) {
    // check argument is an ornament
    if (!(ornament instanceof Toe.Model.Ornament)) {
        throw new Error("NeumeComponent: Invalid ornament");
    }

    // add this ornament to the list of ornaments
    // if the ornament is not already attached to the neume component.
    if (!this.hasOrnament(ornament.key)) {
        this.props.ornaments.push(ornament);
    }
}

/**
 * Remove an ornament from the neume component
 *
 * @methodOf Toe.Model.NeumeComponent
 * @param {String} oType ornament type (dot, horizEpisema, vertEpisema)
 */
Toe.Model.NeumeComponent.prototype.removeOrnament = function(oType) {
    // filter out ornaments with the type "oType"
    this.props.ornaments = $.grep(this.props.ornaments, function(o) {
        return o.key == oType.toLowerCase();
    }, true);
}
