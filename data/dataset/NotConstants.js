//var DOMAIN_PREFIX = "http://10.90.8.54:8089/";
//var DOMAIN_PREFIX = "http://192.168.1.101:8089/";
//var DOMAIN_PREFIX = "http://localhost:8089/";
//var DOMAIN_PREFIX = "http://172.31.8.93:8089/";
//var DOMAIN_PREFIX = "../";
//var DOMAIN_PREFIX = "http://192.168.0.20:8089/";


 namespace('tc.constants', {
		DOMAIN_PREFIX: "http://localhost:8089/",
		SPRITE_NORMAL:1,
		SPRITE_INVERTED:-1,

		//iso sprite directions 
		SPRITE_DIRECTION_UNDEFINED:"0",
		SPRITE_DIRECTION_NORTH:"-1",
		SPRITE_DIRECTION_NORTH_EAST:"-2",
		SPRITE_DIRECTION_EAST:"-3",
		SPRITE_DIRECTION_SOUTH_EAST:"-4",
		SPRITE_DIRECTION_SOUTH:"-5",
		SPRITE_DIRECTION_SOUTH_WEST:"-6",
		SPRITE_DIRECTION_WEST:"-7",
		SPRITE_DIRECTION_NORTH_WEST:"-8",


		SPRITE_STATE_NONE:1,
		SPRITE_STATE_START:0,
		SPRITE_STATE_DURING:1,
		SPRITE_STATE_DONE:2,
		SPRITE_MOVEMENT_DIRECTION_UP:0,
		SPRITE_MOVEMENT_DIRECTION_DOWN:1,
		SPRITE_MOVEMENT_DIRECTION_FORWARD:2,
		SPRITE_MOVEMENT_DIRECTION_BACK:3,
		SPRITE_MOVEMENT_DIRECTION_CENTERED:4,
		WATCH_TYPE_LAST_FRAME:1,
		WATCH_TYPE_ALL_FRAME:2,
		LIGHT_ACTION:50,
		FAST_ACTION:25,
		GAME_WORLD_STYLE_2D:0,
		GAME_WORLD_STYLE_ISOMETRIC:-1,
		GAME_WORLD_STYLE_ISOMETRIC_GRID_TEST:-2,
		GAME_WORLD_CELL_BLOCK:0,
		GAME_WORLD_CELL_UNDERLAY:-1,
		GAME_WORLD_CELL_OVERLAY:-2,
		GAME_WORLD_CELL_OPEN:-3,
		
		LEFTARROW: 37,
		UPARROW: 38,
		RIGHTARROW: 39,
		DOWNARROW: 40,
		SPACEBAR: 32,
		playInfinite: -1,
		gameEvents: new GameEventTypes()
});