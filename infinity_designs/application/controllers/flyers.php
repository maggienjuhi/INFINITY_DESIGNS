<?php
class Flyers extends CI_Controller{
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


		$data['main_content']= 'index/Flyers';
		$this->load->view('includes/template',$data);
		//$this->load->view('index/Flyers',$data);
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


		$data['main_content']= 'add/Add_flyers';
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
			array('field'   => 'companyname','label'   => 'Company Name','rules'   => 'trim|required|xss_clean|min_length[5]'), 
			array('field'   => 'slogan','label'   => 'Slogan','rules'   => 'trim|required|xss_clean|min_length[5]'),       
			array('field'   => 'email','label'   => 'Email','rules'   => 'trim|required|xss_clean|min_length[5]'),   
			array('field'   => 'location','label'   => 'Location','rules'   => 'trim|required|xss_clean|min_length[5]'), 
			array('field'   => 'aboutus','label'   => 'About Us','rules'   => 'trim|required|xss_clean|min_length[5]'),
			array('field'   => 'services','label'   => 'Services','rules'   => 'trim|required|xss_clean|min_length[5]'),     
			array('field'   => 'phoneno','label'   => 'Contact Us','rules'   => 'trim|required|xss_clean|min_length[5]'), 
    );

		$this->form_validation->set_rules($config); 

		if ($this->form_validation->run() == FALSE){

				$data['widget_profile']=array('is_index'=>True,);

				$data['main_content']= 'add/Add_business_cards';
				$this->load->view('includes/template',$data);

		}else{
				$companyname = $this -> input ->post('companyname');
				$slogan = $this -> input ->post('slogan');
				$email = $this -> input ->post('email');
				$location = $this -> input ->post('location');
				$aboutus = $this -> input ->post('aboutus');
				$services = $this -> input ->post('services');
				$phoneno = $this -> input ->post('phoneno');

				$insert_data = array(
					 'companyname' => $companyname,
					 'slogan' => $slogan,
					 'email' => $email,
					 'location' => $location,
					 'aboutus' => $aboutus,
					 'services' => $services,
					 'phoneno' => $phoneno,
				);
			 //$this->asset_database->insert_array('sms_gateway_phonebook', $insert_data);
			 include('pesapal-iframe.php');
				//redirect('smsgateway');
		}
	}	

}
