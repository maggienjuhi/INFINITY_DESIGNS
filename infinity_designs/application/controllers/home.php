<?php
class Home extends CI_Controller{
	function index(){		
		//$data['main_content']= 'index/Home';
		$this->load->view('index/Home');
		//redirect('student_profiles');
	}

	function save(){

		$config = array(
			array('field'   => 'yourname','label'   => 'Your name','rules'   => 'trim|required|xss_clean|min_length[3]'),   
			array('field'   => 'frommail','label'   => 'Email','rules'   => 'trim|required|xss_clean|email|min_length[5]'),   
			array('field'   => 'subject','label'   => 'Subject','rules'   => 'trim|required|xss_clean|min_length[3]'), 
			array('field'   => 'messagebody','label'   => 'Body','rules'   => 'trim|required|xss_clean|min_length[3]'),     
    );

		$this->form_validation->set_rules($config); 

		if ($this->form_validation->run() == FALSE){
				$this->load->view('index/Home');

		}else{
				$yourname = $this -> input ->post('yourname');
				$frommail = $this -> input ->post('frommail');
				$subject = $this -> input ->post('subject');
				$messagebody = $this -> input ->post('messagebody');

				$insert_data = array(
					 'yourname' => $yourname,
					 'email' => $frommail,
					 'subject' => $subject,
					 'messagebody' => $messagebody,
				);
			 $this->asset_database->insert_array('cards_contactform', $insert_data);
			 //include('pesapal-iframe.php');
				//redirect('home');
		$data['message']="Your Message successfuly sent";
		$this->load->view('index/Home',$data);
		}
	}	
}
