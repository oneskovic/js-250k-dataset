/*eslint-env amd*/
define([
	'javascript/contentAssist/indexFiles/nodeIndex',
	'javascript/contentAssist/typesFromIndexFile',
	'javascript/contentAssist/typeUtils',
	'orion/objects'
], function(nodeIndex, mTypes, typeUtils, objects) {
	/**
	 * @name javascript.Indexer
	 * @class
	 * @description
	 */
	function TernIndexer() {
		this.catalog = null;
	}

	objects.mixin(TernIndexer.prototype, /** @lends javascript.Indexer.prototype */ {
		setIndexData: function(typeDefs) {
			// TODO each index should be requested lazily from Editor Context, then cached
			var catalog = Object.create(null);
			typeDefs.forEach(function(data) {
				var name;
				if (!(name = data["!name"])) {
					throw new Error("Missing !name in typeDef: " + data);
				}
				catalog[name] = data;
			});
			this.catalog = catalog;
		},
		/**
		 * @returns {Object} An object mapping fileName {String} to {@link javascript.Summary}
		 */
		retrieveGlobalSummaries: function() {
			// for now we assume no globals can leak out of dependencies so there is nothing to return
		},
		/**
		 * @param {String} moduleName
		 * @param {Object} env The type environment
		 * @returns {javascript.Summary}
		 */
		retrieveSummary: function(moduleName, env) {
			// Generous check for Node builtins, in case user forgot to set the /*.. node:true*/ flag
			var maybeNodeJS = !env.amdModule && (env.nodeJSModule || env.commonjsModule || env.globalObjName !== "Window");
			if (maybeNodeJS) {
				var nodeGlobalsAndTypes = mTypes.getGlobalsAndTypes("node", nodeIndex); // Note this is cached by mTypes, so fast
				if (isNodeBuiltin(moduleName, nodeGlobalsAndTypes)) {
					return toSummary(moduleName, nodeGlobalsAndTypes);
				}
			}

			if (Object.prototype.hasOwnProperty.call(this.catalog, moduleName)) {
				// TODO mTypes is implicit static global. Should be parameter to Indexer and ContentAssist, and have better defined life cycle.
				var indexData = this.catalog[moduleName];
				var globalsAndTypes = mTypes.getGlobalsAndTypes(moduleName, indexData);
				return toSummary(moduleName, globalsAndTypes);
			}
			return null;
		}
	});

	function toSummary(moduleName, globalsAndTypes) {
		return {
			provided: moduleName,
			types: globalsAndTypes.types
		}
	}

	/**
	 * @param {String moduleName}
	 * @param {Object} nodeGlobalsAndTypes
	 */
	function isNodeBuiltin(moduleName, nodeGlobalsAndTypes) {
		if (moduleName.indexOf(".") !== -1 || moduleName.indexOf("/") !== -1) {
			return null;
		}
		var typeName = typeUtils.convertToSimpleTypeName(typeUtils.ensureTypeObject(moduleName));
		return nodeGlobalsAndTypes.types[typeName] ? true : false;
	}

	/**
	 * @name javascript.Summary
	 * @class
	 * @description Summary of types in a dependent module.
	 * provided : { name -> typeName }
	 * types : { typeName -> { name -> typeName } }
	 */
	return TernIndexer;
});