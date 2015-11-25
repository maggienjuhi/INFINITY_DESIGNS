<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Get_dashboard {

  public function display_dashboard(){
		$CI =& get_instance();
    $CI->load->model('Asset_database');

		$data['appmodels'] = $this -> asset_database -> select_multiple_array("SELECT al.applist,al.apptype,al.icon_name,al.app_url,ml.modelslist,ml.icon_name AS model_icon,ml.model_url FROM appmodels am,applist al,modelslist ml WHERE am.applist_id = al.id AND am.modelslist_id = ml.id;");
		#build a hierachy array with all the data we need for menu and su menu
		$data['apps_models_list'] = array();
		if(isset($data['appmodels'])){
			 $tempapps = array();
			 $tempmodels = array();
			 $tempmainarr = array();
			 $temp_applist = '';
			 $temp_apptype = '';
			 $temp_icon_name = '';
			 $temp_app_url = '';
			 $counter = 0;

			 foreach ($data['appmodels'] as $r): 
					#echo $r->applist.' : '.$r->modelslist.'<br/>';
					if(!in_array($r->applist,$tempapps)){
						if(sizeof($tempmodels)!=0){
							#echo 'sizeof($tempmodels) : '.sizeof($tempmodels);
							#$array = array($temp_applist => $tempmodels,$temp_apptype,$temp_icon_name,$temp_app_url, );
							#array_push($tempmainarr,$array);
							$array = array('applist' => $temp_applist,'apptype' => $temp_apptype,'icon_name' => $temp_icon_name,'app_url' => $temp_app_url,'modelslist' => $tempmodels,);
							array_push($tempmainarr,$array);
						}
					  $tempmodels = array();
					  $arr = array('modelslist' => $r->modelslist,'model_icon' => $r->model_icon,'model_url' => $r->model_url);
						array_push( $tempmodels,$arr);
						array_push( $tempapps,$r->applist);
						#echo 0 ;
					}else{
						#echo 1;
					  $arr = array('modelslist' => $r->modelslist,'model_icon' => $r->model_icon,'model_url' => $r->model_url);
						array_push( $tempmodels,$arr);
					}
						$temp_apptype = $r->apptype;
						$temp_icon_name = $r->icon_name;
						$temp_app_url = $r->app_url;
					$temp_applist = $r->applist;
			 $counter++;
			 endforeach;
			 $data['apps_models_list'] = $tempmainarr;
			 #echo var_dump($tempmainarr);
		}
	}
}

/* End of file Someclass.php */

