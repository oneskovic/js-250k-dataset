    
define.Class('raptor/resources/SearchPath', ['raptor'], function(raptor, require) {
    'use strict';
    
    var listeners = require('raptor/listeners'),
        DirSearchPathEntry = require('raptor/resources/DirSearchPathEntry');
    
    var SearchPath = function() {
        this.entries = [];
        listeners.makeObservable(this, SearchPath.prototype, ['modified'], false);
    };
    
    SearchPath.prototype = {
        clone: function() {
            var clone = new SearchPath();
            clone.entries = this.entries.concat([]);
            return clone;
        },
        
        addEntry: function(entry) {
            this.entries.push(entry);
            
            var packageJsonResource = entry.findResource('/package.json');
            if (packageJsonResource != null && packageJsonResource.exists()) {
                var packaging = require('raptor/packaging');
                var packageManifest = packaging.getPackageManifest(packageJsonResource);
                require('raptor/resources').addSearchPathsFromManifest(packageManifest);
            }
            
            this.publish('modified');

            return entry;
        },

        addDir: function(path) {
            if (path instanceof require('raptor/files/File')) {
                path = path.getAbsolutePath();
            }
            var entry = new DirSearchPathEntry(path);
            this.addEntry(entry);
            return entry;
        },
        
        removeEntry: function(entryToRemove) {
            this.entries = this.entries.filter(function(entry) {
                return entry !== entryToRemove;
            });
        },
        
        hasDir: function(path) {
            for (var i=0, len=this.entries.length, entry; i<len; i++) {
                entry = this.entries[i];
                if (entry instanceof DirSearchPathEntry && entry.getDir() == path) {
                    return true;
                }
            }
            return false;
        },
        
        forEachEntry: function(callback, thisObj) {
            var a = this.entries;
            
            for (var i=0, len=a.length; i<len; i++) {
                if (callback.call(thisObj, a[i], i, a) === false) {
                    return;
                }
            }
        },

        toString: function() {
            return '[' + this.entries.join(', ') + ']';
        }
    };
    
    return SearchPath;
});
