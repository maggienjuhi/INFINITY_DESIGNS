<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$data['cards_contactform'] = $this -> asset_database -> select_multiple_array("SELECT id,yourname,email,subject,messagebody FROM cards_contactform;");
