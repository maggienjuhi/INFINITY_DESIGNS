<?php
class Business_cards extends CI_Controller{
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


		$data['main_content']= 'index/Business_cards';
		$this->load->view('includes/template',$data);
		//redirect('student_profiles');
	}

	function create($id){	
		$session=$this->session->all_userdata();
		if(!isset($session['username'])){
			redirect('login');
		}	
	
		$data['username'] = $session['username'];
		$data['org_id'] = $session['org_id'];
		$data['id'] = $id;
		include 'sql_hub/get_user_business.php';
		include 'sql_hub/get_user_details.php';
		include 'sql_hub/get_sidebar.php';
		$ml_id=1;
		include 'sql_hub/get_sidebar_page.php';


		$data['main_content']= 'add/Add_business_cards';
		$this->load->view('includes/template',$data);
		//redirect('student_profiles');
	}


	function save($id){
		$session=$this->session->all_userdata();
		if(!isset($session['username'])){
			redirect('login');

		}	

		$username = $session['username'];
		$data['username'] = $username;
		$data['org_id'] = $session['org_id'];
		$data['id'] = $id;

		include 'sql_hub/get_user_business.php';
		include 'sql_hub/get_user_details.php';
		include 'sql_hub/get_sidebar.php';
		$ml_id=1;
		include 'sql_hub/get_sidebar_page.php';

		$config = array(
			array('field'   => 'domain','label'   => 'Domain','rules'   => 'trim|required|xss_clean|min_length[5]'),   
			array('field'   => 'email','label'   => 'Email','rules'   => 'trim|required|xss_clean|min_length[5]'),   
			array('field'   => 'phoneno','label'   => 'Phone no','rules'   => 'trim|required|xss_clean|min_length[5]'), 
			array('field'   => 'slogan','label'   => 'Slogan','rules'   => 'trim|required|xss_clean|min_length[5]'),     
			array('field'   => 'fullnames','label'   => 'Full names','rules'   => 'trim|required|xss_clean|min_length[5]'),
			array('field'   => 'position','label'   => 'Position','rules'   => 'trim|required|xss_clean|min_length[5]'),     
			array('field'   => 'company','label'   => 'Company','rules'   => 'trim|required|xss_clean|min_length[5]'),          
    );

		$this->form_validation->set_rules($config); 

		if ($this->form_validation->run() == FALSE){

				$data['widget_profile']=array('is_index'=>True,);

				$data['main_content']= 'add/Add_business_cards';
				$this->load->view('includes/template',$data);

		}else{
				$domain = $this -> input ->post('domain');
				$email = $this -> input ->post('email');
				$phoneno = $this -> input ->post('phoneno');
				$slogan = $this -> input ->post('slogan');
				$fullnames = $this -> input ->post('fullnames');
				$position = $this -> input ->post('position');
				$company = $this -> input ->post('company');

				$insert_data = array(
					 'domain' => $domain,
					 'email' => $email,
					 'phoneno' => $phoneno,
					 'slogan' => $slogan,
					 'fullnames' => $fullnames,
					 'company' => $company,
					 'company' => $company,
				);
			 //$this->asset_database->insert_array('sms_gateway_phonebook', $insert_data);
			 include('pesapal-iframe.php');
				//redirect('smsgateway');
		}
	}	

}
