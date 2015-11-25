<?php

class Asset_database extends CI_Model{

	function create_table($create_query){
		$create=$this->db->query($create_query); 
		return $create;
	}

	function drop_table($drop_query){
		$drop = $this->db->query($drop_query);
		return $drop;
	}

	function insert_data($insert_query){		
		$insert =$this->db->query($insert_query);
		return $insert;
	}

	function insert_array($tablename,$array = array()){
		$insert = $this->db->insert($tablename,$array);
		return $insert;
	}

	function insert_ignore_array($tablename,$array = array()){
		$insert_query = $this->db->insert_string($tablename,$array);
		$insert_query = str_replace('INSERT INTO','INSERT IGNORE INTO',$insert_query);
		$this->db->query($insert_query);
	}
	function insert_batch($tablename,$array = array()){
		$insert = $this->db->insert_batch($tablename,$array);
		return $insert;
	}

	function update_batch($pri_key,$id,$table_name,$update_array){
		$this->db->where($pri_key, $id);
		$update = $this->db->update($table_name, $update_array);
		return $update;
	}

	function update_table($update_query){
		$update=$this->db->query($update_query); 
		return $update;
	}

	function add_column($add_column_query){	
		$add_column = $this ->db->query($add_column_query); 
		return $add_column;
	}

	function set_variable($set_query){
		$set=$this->db->query($set_query); 
		return $set;
	}

	function select_multiple_array($select_query){
		$select=$this->db->query($select_query); 

		if($select-> num_rows() > 0){
			foreach($select->result() as $row){
				$data[]=$row;
			}
			return $data;
		}
	}

	function select_single_array_mysql($select_query){
		$query=$this->db->query($select_query); 

		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}

	function select_single_array_mysql_ifexists($select_query){
		$query=$this->db->query($select_query); 

		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}

	function select_single_array($table,$column){
		$this->db->select($column);
		$this->db->from($table);
		$query = $this->db->get();
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}

	function select_single_array_where($table,$column,$pri_key,$col_data){
		$this->db->select($column);
		$this->db->from($table);
		$this->db->where($pri_key,$col_data);
		$query = $this->db->get();
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}

	function select_single_array_where_not($table,$column,$pri_key,$col_data){
		$this->db->select($column);
		$this->db->from($table);
		$this->db->where($pri_key,$col_data);
		$query = $this->db->get();
		return ($query ->num_rows) ? $query->result_array() : FALSE;
	}

}
