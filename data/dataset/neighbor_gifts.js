var title = "The nicest day in the neighborhood";
var desc = "Leave 5 gifts of at least one item to the butlers of 5 different neighbors";
var offer = "Have you been over to your neighbors lately? I'm sure they'd love the visit and everyone loves getting kind gifts from their neighbors!\r\nWhy don't you pop on over to 5 different neighbors and leave a gift with their butler? Anything you have on you.It'll be the nicest day in the neighborhood!";
var completion = "Great goodness, it's a beautiful day in the neighborhood!You are a kind neighbor to have indeed.";


var auto_complete = 0;
var familiar_turnin = 1;
var is_tracked = 0;
var show_alert = 0;
var silent_complete = 0;
var progress = [
];
var giver_progress = [
];
var no_progress = "null";
var prereq_quests = [];
var prerequisites = [];
var end_npcs = [];
var locations = {};
var requirements = {
	"r371"	: {
		"type"		: "counter",
		"name"		: "give_bag_butler",
		"num"		: 5,
		"class_id"	: "random_kindness",
		"desc"		: "Gift_5_neighbors"
	}
};

function onComplete(pc){ // generated from rewards
	var xp=0;
	var currants=0;
	var mood=0;
	var energy=0;
	var favor=0;
	var multiplier = pc.buffs_has('gift_of_gab') ? 1.2 : pc.buffs_has('silvertongue') ? 1.05 : 1.0;
	multiplier += pc.imagination_get_quest_modifier();
	xp = pc.stats_add_xp(round_to_5(600 * multiplier), true, {type: 'quest_complete', quest: this.class_tsid});
	currants = pc.stats_add_currants(round_to_5(250 * multiplier), {type: 'quest_complete', quest: this.class_tsid});
	mood = pc.metabolics_add_mood(round_to_5(50 * multiplier));
	apiLogAction('QUEST_REWARDS', 'pc='+pc.tsid, 'quest='+this.class_tsid, 'xp='+intval(xp), 'mood='+intval(mood), 'energy='+intval(energy), 'currants='+intval(currants), 'favor='+intval(favor));
	if(pc.buffs_has('gift_of_gab')) {
		pc.buffs_remove('gift_of_gab');
	}
	else if(pc.buffs_has('silvertongue')) {
		pc.buffs_remove('silvertongue');
	}
}
var rewards = {
	"xp"		: 600,
	"currants"	: 250,
	"mood"		: 50
};

//log.info("neighbor_gifts.js LOADED");

// generated ok (NO DATE)
