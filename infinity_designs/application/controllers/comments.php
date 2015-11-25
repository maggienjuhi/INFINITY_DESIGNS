<?php
class Comments extends CI_Controller{
	function index(){		
		$session=$this->session->all_userdata();
		if(!isset($session['username'])){
			redirect('login');
		}	

		$data['username'] = $session['username'];
		$data['org_id'] = $session['org_id'];

		include 'sql_hub/get_user_business.php';
		include 'sql_hub/get_user_details.php';
		include 'sql_hub/get_sidebar.php';
		$ml_id=1;
		include 'sql_hub/get_sidebar_page.php';

		//get all default values for a school
		include 'sql_hub/get_comments.php';
		$data['main_content']= 'index/Comments';
		$this->load->view('includes/template',$data);
	}
}
