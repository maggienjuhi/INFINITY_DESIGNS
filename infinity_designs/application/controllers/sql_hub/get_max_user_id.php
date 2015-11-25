<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$session=$this->session->all_userdata();

$data['max_uid'] = $this -> asset_database -> select_multiple_array("SELECT MAX(id) AS max_id FROM users;");
