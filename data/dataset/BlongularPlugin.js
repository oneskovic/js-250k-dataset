/**
 * No description yet.
 *
 * @author Pedro Nasser
 */

// Exports
module.exports = {

	/**
	 * Class Extension
	 */
	extend: ['Component'],

	/**
	 * PRIVATE
	 */
	private: {
        blongular: null
    },

	/**
	 * Public Variables
	 */
	public: {},

	/**
	 * Methods
	 */
	methods: {

        /**
         * @desc Function called when this PLUGIN is ready
         */
        init: function () {

        },

        /**
         * @desc Define blongular instance
         */
        setBlongular: function (bl) {
            blongular = bl;
        }

    }

};
