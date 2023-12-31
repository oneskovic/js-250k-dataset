    function GeneralOptions(initializer){ // default constructor
      //properties
            //verboseLevel = 1
            //warningLevel = 1
            //comments = 1   // 0=>no comments, 1=>source line & source comments 2=>add "compiled by..."

            //ifdef PROD_C
            //target ="c"
            //outDir = 'generated/c'
            //else
            //target ="js"
            //outDir = 'generated/js'
            //end if

            //debugEnabled = undefined
            //perf=0 // performace counters 0..2
            //skip = undefined
            //generateSourceMap = true //default is to generate sourcemaps
            //single = undefined
            //compileIfNewer = undefined //compile only if source is newer
            //browser =undefined //compile js for browser environment (instead of node.js env.)
            //es6: boolean //compile to js-EcmaScript6

            //defines: array of string = []
            //includeDirs: array of string = []

            //projectDir:string = '.'
            //mainModuleName:string = 'unnamed'

            //storeMessages: boolean = false

            //literalMap: string // produce "new Class().fromObject({})" on "{}"" instead of a js object
            // activate with: 'lexer options object literal is Foo'. A class is required to produce C-code

            //version: string

            //now: Date = new Date()
          this.verboseLevel=1;
          this.warningLevel=1;
          this.comments=1;
          this.target="js";
          this.outDir='generated/js';
          this.debugEnabled=undefined;
          this.perf=0;
          this.skip=undefined;
          this.generateSourceMap=true;
          this.single=undefined;
          this.compileIfNewer=undefined;
          this.browser=undefined;
          this.defines=[];
          this.includeDirs=[];
          this.projectDir='.';
          this.mainModuleName='unnamed';
          this.storeMessages=false;
          this.now=new Date();
        for(prop in initializer) if (initializer.hasOwnProperty(prop)) this[prop]=initializer[prop];};
      // ---------------------------
      GeneralOptions.prototype.toString = function(){
            //return "outDir:" + .outDir + "\ndefines:" + (.defines.join())
            return "outDir:" + this.outDir + "\ndefines:" + (this.defines.join());
      }
    // export
    module.exports.GeneralOptions = GeneralOptions;
    
    // end class GeneralOptions
// -----------
// Module code
// -----------
// end of module
module.exports=GeneralOptions;
