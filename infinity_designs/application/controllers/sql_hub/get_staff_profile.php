<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$data['staff_profiles'] = $this -> asset_database -> select_multiple_array("SELECT sp.id, sp.nationalid,u.username,sp.email,sp.firstname,sp.secondname,sp.lastname,sp.gender,sp.specialcases,sp.isactive,group_id,sp.photo FROM staff_staffprofiles sp,users u,business_profiles bp WHERE sp.username_id = u.id AND bp.id=sp.name_id AND bp.id IN(".$session['org_id'].") ;");
