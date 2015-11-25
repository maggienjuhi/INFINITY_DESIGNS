<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$session=$this->session->all_userdata();

$data['user_business'] = $this -> asset_database -> select_multiple_array("SELECT bo.id,bp.name,bp.motto,bp.slogan,bp.mission,bp.vision,u.username FROM business_owners bo,business_profiles bp,users u WHERE bp.id=bo.name_id AND bp.owner_id=u.id AND bo.name_id=bp.id AND bo.owner_id=bp.owner_id AND u.id = '".$session['user_id']."' AND bp.id IN($pk);");
