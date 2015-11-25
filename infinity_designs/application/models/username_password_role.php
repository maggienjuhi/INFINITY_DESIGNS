<?php
	class	Username_password_role extends CI_Model {
	
		//this method validates input credentials from post values.
		function validate_credentials() {
			$this->db->where('username',$this->input->post('username'));
			$this->db->where('password',md5($this->input->post('password')));
			
			$query=$this->db->get('users');
           
         	//number of rows echoed back from the db
			if($query -> num_rows()==1){
				return true;
			}
		}
		
		function show_role(){
			$member_id = $this->input->post('username');
			echo $select_admin ="SELECT role FROM user_roles WHERE username = '$member_id'";
			$query = $this->db->query($select_admin);
		
			return ($query ->num_rows) ? $query->result_array() : FALSE;
		}

		function show_orgarnization(){
			$member_id = $this->input->post('username');
			$select_user_orgarnization ="SELECT bp.id,bp.name,u.username FROM business_owners bo,business_profiles bp,users u WHERE bo.name_id = bp.id AND bp.owner_id = u.id AND u.username = '$member_id'";
			$query = $this->db->query($select_user_orgarnization);
		
			return ($query ->num_rows) ? $query->result_array() : FALSE;
		}

		//this method is called by login 
		function register_user_password_role(){
			$new_user_password_data =array(
			'member_id'=>$this->input->post('user_name'),
			'password' =>md5($this ->input->post('password')),
			'roll' => $this -> input -> post('roll'),
			);
		
			$insert =$this->db->insert('username_password',$new_user_password_data);
			return $insert;
		}

	}
		
	
