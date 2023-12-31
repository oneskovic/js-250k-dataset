    function OptionsParser(argv){
     //     properties
        //lastIndex
        //items: Array of string

        //if argv.length and argv[0] is 'node'
        if (argv.length && argv[0] === 'node') {
        
            //argv=argv.slice(1) //remove 'node' if calling as a script
            argv = argv.slice(1);
        };

        //.items = argv.slice(1) //remove this script/exe 'lite' from command line arguments
        this.items = argv.slice(1);
     };
     // ---------------------------
     OptionsParser.prototype.option = function(shortOption, argName){

        //if .getPos(shortOption,argName) into var pos >= 0
        var pos=undefined;
        if ((pos=this.getPos(shortOption, argName)) >= 0) {
        
            //.items.splice(pos,1)
            this.items.splice(pos, 1);
            //return true
            return true;
        };

        //return false
        return false;
     }// ---------------------------
     OptionsParser.prototype.valueFor = function(shortOption, argName){

        //if .getPos(shortOption,argName) into var pos >= 0
        var pos=undefined;
        if ((pos=this.getPos(shortOption, argName)) >= 0) {
        
            //var value = .items[pos+1]
            var value = this.items[pos + 1];
            //.items.splice(pos,2)
            this.items.splice(pos, 2);
            //return value
            return value;
        };

        //return undefined
        return undefined;
     }// ---------------------------
     OptionsParser.prototype.getPos = function(shortOption, argName){

//search several possible forms of the option, e.g. -o --o -outdir --outdir

        //var forms=['-#{shortOption}','--#{shortOption}']
        var forms = ['-' + shortOption, '--' + shortOption];
        //if argName, forms.push('--#{argName}','-#{argName}')
        if (argName) {forms.push('--' + argName, '-' + argName)};

        //return .search(forms) into .lastIndex
        return (this.lastIndex=this.search(forms));
     }// ---------------------------
     OptionsParser.prototype.search = function(list){
        //for each item in list
        for( var item__inx=0,item ; item__inx<list.length ; item__inx++){item=list[item__inx];
        
            //var result = .items.indexOf(item)
            var result = this.items.indexOf(item);
            //if result >=0, return result
            if (result >= 0) {return result};
        };// end for each in list
        //return -1
        return -1;
     }
    // export
    module.exports.OptionsParser = OptionsParser;
    
    // end class OptionsParser
// -----------
// Module code
// -----------
// end of module
module.exports=OptionsParser;
