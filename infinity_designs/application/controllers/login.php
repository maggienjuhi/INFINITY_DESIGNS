<?php
class Login extends CI_Controller {
	
	function index() {
		$session=$this->session->all_userdata();
		if(isset($session['username'])){
			redirect('dashboard');
			$username = $session['username'];
			$data['username'] = $username;
		}	

		//displays user photo		
		#$this->load->model('photos');
		//if($reps = $this->photos->show_orgarnization_photo()){
			//foreach ($reps as $key=>$value)
				//$data['church_photos'][$value['photo']] = $value['photo'];
			//}

			//displays current username
		$this->load->view('index/Login');			
	}

	function logout(){
		$this->session->sess_destroy();
		redirect('login');		
	}
	
	function validate_credentials() {
		$porpose = $this->input->get('register');

		if($porpose)$this->signup();

		$this -> load ->model('username_password_role');			
		$query=$this->username_password_role->validate_credentials();
		//$query=$this->username_password_role->create_connection();
		$this->load->helper('array');
		
		if($query){
			//displays current username's company	
			if($reps = $this->username_password_role->show_orgarnization()){
				foreach ($reps as $key=>$value)
					$data['org_id'][$value['id']] = $value['id'];
			}

			$organization = implode($data['org_id']);
			//echo $organization;die();
			//if users credentials validated

			$data['username']=$this->input->post('username');
			include 'sql_hub/get_user_details.php';
			$data=array('user_id' => $data['userprofile'][0]->uid ,'username'=>$this->input->post('username'),'password'=>$this->input->post('password'),'is_logged_in'=>true,'org_id'=> $organization);
			$session = $this->session->set_userdata($data);
			
			//check if the user is activated
			include 'sql_hub/get_user_business.php';
			if(!isset($data['user_business'])){
				redirect('activate');
			}else{
				redirect('business_cards');
			}
			//$this -> index();

			//if(isset($data['company'])){
				//redirect(implode($data['company']));
			//}
		}else{
		//$this->index();
			//echo "wrong username password";
			$data['error']= 'Invalid Login';
			$data['main_content']= array('Login');
			$this->load->view('index/Login',$data);
			//redirect('login');
		}
	}
}

