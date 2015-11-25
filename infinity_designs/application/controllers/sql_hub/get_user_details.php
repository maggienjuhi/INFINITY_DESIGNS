<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$data['userprofile'] = $this -> asset_database -> select_multiple_array(" SELECT sp.id, sp.nationalid,u.username,sp.email,sp.firstname,sp.secondname,sp.lastname,sp.gender,sp.specialcases,sp.isactive,group_id,sp.photo,u.id AS uid,sp.reg_date FROM staff_staffprofiles sp,users u WHERE sp.username_id = u.id AND u.username = '".$data['username']."';");
