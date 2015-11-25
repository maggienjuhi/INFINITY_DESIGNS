<?php
class User_details extends CI_Model{
	//this method is called by login
	function register_user(){
		$new_user_insert_data =array(
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
		
		$insert =$this->db->insert('user_details',$new_user_insert_data);
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
		$select_username = "SELECT username FROM users";
		$query = $this->db->query($select_username);
		if($query-> num_rows() > 0){
			foreach($query->result() as $row){
				$data[]=$row;
			}
			return $data;
		}
	}
	

	function show_userdetails(){
		$username = $this-> input -> post('user_name');
		//echo $username;
		 $select_user ="SELECT ud.user_name ,ud.first_name ,ud.sur_name,ud.last_name,ud.phone_no,ud.email_address,ud.next_of_kin_name,ud.next_of_kin_phone_no,ud.next_of_kin_emailaddress,sup.password FROM user_details ud , username_password_role sup WHERE  ud.user_name=sup.user_name && sup.user_name='$username'";
		$query = $this->db->query($select_user);
		if($query-> num_rows() > 0){
			foreach($query->result() as $row){
				$data[]=$row;
			}
			return $data;
		}
	}
}

