// image data type use for all these functions are  

PsxEffects = {};

// preload image resources
PsxEffects.initialize = function(){
    // info class 
    function ResourceInfo(_filename,_width,_height){
        var obj = new Object();
        obj.width = _width;
        obj.height = _height;
        obj.filename = _filename;
        return obj;
    }
    // put all filenames here
    var RESOURCES = [
        ResourceInfo('vignette.jpg',512,512),
        ResourceInfo('sketch_classic.jpg',968,1296),
        ResourceInfo('canvas_text.png',600,337),
        ResourceInfo('steve_jobs.jpg',600,337),
        ResourceInfo('border1.png',600,337)

    ];
    
    var RESOURCE_PATH = './PsxEffects/resource/';
    for(var i=0,j=RESOURCES.length; i<j; i++){
        // file name without extension as id
        var id = RESOURCES[i].filename.substr(0,RESOURCES[i].filename.length-4);
    	document.write('<img id="'+id+'" src="'+RESOURCE_PATH+RESOURCES[i].filename+'" width="'+RESOURCES[i].width+'" height ="'+RESOURCES[i].height+'" style="display:none" />');//style="display:none" 
    };
}
