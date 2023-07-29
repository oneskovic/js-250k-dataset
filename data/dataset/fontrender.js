R.Engine.requires("/components/component.image.js");
R.Engine.requires("/components/component.transform2d.js");
R.Engine.requires("/engine.object2d.js");


R.Engine.initObject("FontRender", "Object2D", function() {

// http://catcam.mypets.ws/renderengine/fonts/century_gothic_36.png	
	var FontRender = Object2D.extend({
		
		constructor: function(imageName) {
			this.base();
			this.add(Transform2DComponent.create("move"));
			this.add(ImageComponent.create("fontImg", FontEditor.getImageLoader(), imageName));
			
			this.getComponent("move").setPosition(Point2D.create(0,0));
		},
		
		update: function(renderContext, time) {
			renderContext.pushTransform();
			
			this.base(renderContext, time);
			
			renderContext.popTransform();
		}
		
	});
	
	return FontRender;
})
