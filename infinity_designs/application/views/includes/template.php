<?php
   //constant view i.e header and footer.
	$this -> load -> view('includes/header');
	$this -> load -> view('menu/sidebar');
	//$this -> load -> view('menu/content-header');
	$this -> load -> view($main_content);	
	#if(isset($announcement_pane)){$this -> load -> view(implode($announcement_pane));}
	$this -> load -> view('includes/footer');
?>
