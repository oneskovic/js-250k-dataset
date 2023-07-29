var unit_types = {};  /* packet_ruleset_unit */

var U_NOT_OBSOLETED = null;

/**************************************************************************
Whether player can build given unit somewhere,
ignoring whether unit is obsolete and assuming the
player has a coastal city.
**************************************************************************/
function can_player_build_unit_direct(p, punittype)
{


  /*if (utype_has_flag(punittype, F_NUCLEAR)
      && !get_player_bonus(p, EFT_ENABLE_NUKE) > 0) {
    return FALSE;
  }*/
  
  /*if (utype_has_flag(punittype, F_NOBUILD)) {
    return FALSE;
  }*/


  /*if (punittype->need_government
      && punittype->need_government != government_of_player(p)) {
    return FALSE;
  }*/
  
  if (player_invention_state(p, punittype['tech_requirement']) != TECH_KNOWN) {
    return false;  
  }
  
  /* FIXME: add support for global advances, check for building reqs etc.*/

  return true;
}

/**************************************************************************
...
**************************************************************************/
function get_units_from_tech(tech_id)
{
  var result = [];

  for (unit_type_id in unit_types) {
    var punit_type = unit_types[unit_type_id];
    if (punit_type['tech_requirement'] == tech_id) {
      result.push(punit_type);
    }
  }
  return result;
}
