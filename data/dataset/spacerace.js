var spaceship_info = {};


var SSHIP_NONE = 0;
var SSHIP_STARTED = 1;
var SSHIP_LAUNCHED = 2;
var SSHIP_ARRIVED = 3;

var SSHIP_PLACE_STRUCTURAL = 0;
var SSHIP_PLACE_FUEL = 1;
var SSHIP_PLACE_PROPULSION = 2;
var SSHIP_PLACE_HABITATION = 3;
var SSHIP_PLACE_LIFE_SUPPORT = 4;
var SSHIP_PLACE_SOLAR_PANELS = 5;

/**************************************************************************
 ...
**************************************************************************/
function show_spaceship_dialog() 
{
  var title = "Spaceship";
  var message = "";
 
  if (client_is_observer()) return;

  console.log(spaceship_info[client.conn.playing['playerno']]);

  var spaceship = spaceship_info[client.conn.playing['playerno']];

  message += "Spaceship progress: " + get_spaceship_state_text(spaceship['sship_state']) + "<br>";
  message += "Success rate: " + (spaceship['success_rate'] / 100) + "<br>";
  message += "Travel time: " + spaceship['travel_time'] + "<br>";
  message += "Components: " + spaceship['components'] + "<br>";
  message += "Energy Rate: " + (spaceship['energy_rate'] / 100) + "<br>";
  message += "Support rate: " + (spaceship['support_rate'] / 100) + "<br>";
  message += "Habitation: " + spaceship['habitation'] + "<br>";
  message += "Life Support: " + spaceship['life_support'] + "<br>";
  message += "Mass: " + spaceship['mass'] + "<br>";
  message += "Modules: " + spaceship['modules'] + "<br>";
  message += "Population: " + spaceship['population'] + "<br>";
  message += "Propulsion: " + spaceship['propulsion'] + "<br>";
  message += "Solar Panels: " + spaceship['solar_panels'] + "<br>";
  message += "Structurals: " + spaceship['structurals'] + "<br>";
  if (spaceship['launch_year'] != 9999) message += "Launch year: " + spaceship['launch_year'] + "<br>";

  $("#dialog").remove();
  $("<div id='dialog'></div>").appendTo("div#game_page");

  $("#dialog").html(message);
  $("#dialog").attr("title", title);
  $("#dialog").dialog({
			bgiframe: true,
			modal: true,
			width: is_small_screen() ? "90%" : "40%",
			buttons: {
				Close: function() {
					$("#dialog").dialog('close');
			        },
			         Launch : function() {
					$("#dialog").dialog('close');
					launch_spaceship();
					set_default_mapview_active();
				}
			}
		});
	
  $("#dialog").dialog('open');		

  if (spaceship['sship_state'] != SSHIP_STARTED || spaceship['success_rate'] == 0) $(".ui-dialog-buttonpane button:contains('Launch')").button("disable");

}

/**************************************************************************
 ...
**************************************************************************/
function launch_spaceship() 
{
  var test_packet = {"pid" : packet_spaceship_launch};
  var myJSONText = JSON.stringify(test_packet);
  send_request(myJSONText);

}

/**************************************************************************
 ...
**************************************************************************/
function get_spaceship_state_text(state_id) 
{
 if (state_id == SSHIP_NONE) return "Not started";
 if (state_id == SSHIP_STARTED) return "Started";
 if (state_id == SSHIP_LAUNCHED) return "Launched";
 if (state_id == SSHIP_ARRIVED) return "Arrived";
}


