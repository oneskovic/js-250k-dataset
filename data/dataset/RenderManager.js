THREE = THREE || {};
THREE.Extras = THREE.Extras || {};

THREE.Extras.RenderManager = function(renderer)
{
	this.renderer = renderer;
	this.time = Date.now()/1000;

	this.renders = {};
	this.current = {};
	this.size = 0;

	this.defaultRenderMethod = function(delta, renderer)
	{
		renderer.render(this.scene, this.camera);
	};
};

THREE.Extras.RenderManager.prototype.add = function(id, scene, camera, render, objects)
{
	render = render || this.defaultRenderMethod;
	objects = objects || {};

	this.renders[id] = {
		id: id,
		scene: scene, 
		camera: camera, 
		render: render, 
		objects: objects
	};

	if(this.size == 0) this.current = this.renders[id];

	this.size++;
};

THREE.Extras.RenderManager.prototype.get = function(id)
{
	return this.renders[id];
};

THREE.Extras.RenderManager.prototype.remove = function(id)
{
	if(id in this.renders)
	{
		delete this.renders[id];
		this.size--;
	}
};

THREE.Extras.RenderManager.prototype.renderCurrent = function()
{
	if(this.current && this.current.render)
	{
		var now = Date.now()/1000;
		var delta = now - this.time;
		this.time = now;

		this.current.render.call(this.current, delta, this.renderer);
	}
	else console.warn('RenderManager: No current render defined.');
};

THREE.Extras.RenderManager.prototype.setCurrent = function(id)
{
	if(id in this.renders)
	{
		this.current = this.renders[id];
	}
	else console.warn('RenderManager: Render "'+id+'" not found.');
};