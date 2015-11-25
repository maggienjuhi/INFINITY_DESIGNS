<?php
class Photos extends CI_Model{
	//this method is called by login
	function register_user_photo($photo_name,$username){
		$new_photo_insert_data =array(
		'user_name'=>$username,
		'photo_name' =>$photo_name 
		);
		
		$insert =$this->db->insert('photos',$new_photo_insert_data);
		return $insert;
	}

	function update_user(){
		$update_user_data =array(
		'user_name'=>$this->input->post('username'),
		'first_name' =>$this ->input->post('first_name'),
		'sur_name' =>$this->input->post('sur_name'),
		'last_name' =>$this ->input->post('last_name'),
		'phone_no'=>$this->input->post('phone_number'),
		'email_address'=>$this->input->post('email_address'),
		//'password'=>md5($this->input->post('password'),
		'next_of_kin_name'=>$this->input->post('next_kin_name'),
		'next_of_kin_phone_no'=>$this->input->post('next_kin_phone_no'),
		'next_of_kin_emailaddress'=>$this->input->post('next_kin_email'),
		);
		echo $this->input->post('user_name');
		$this->db->where('user_name', $this->input->post('user_name'));
		$update=$this->db->update('user_details', $update_user_data); 
		return $update;
	}

	function show_username(){
		$this->db->select('username');
		$this->db->from('user_details');
		//$this->db->where('adm_no',$adm_no);
		$query = $this->db->get();
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}
	

	function show_user_photo($username){
	   $select_user ="SELECT  photo FROM photos WHERE username = '$username'";
		$query = $this->db->query($select_user);
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}
	
	function show_orgarnization_photo(){
	   $select_user ="SELECT  photo FROM organization_photos WHERE organization = 'http://localhost/RealEstates/uploads/realestates.jpg'";
		$query = $this->db->query($select_user);
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}
}

