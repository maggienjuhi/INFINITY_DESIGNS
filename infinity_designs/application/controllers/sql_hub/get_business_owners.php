<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$session=$this->session->all_userdata();

$data['businessowners'] = $this -> asset_database -> select_multiple_array("SELECT bo.id,bp.name,u.username FROM business_owners bo,business_profiles bp,users u WHERE bp.id=bo.name_id AND u.id=bo.owner_id;");
