      <!-- Left side column. contains the sidebar -->
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="<?php if(isset($userprofile[0])){  echo base_url();?>images/<?php echo $userprofile[0]->photo;}?>" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
             <!-- <p><?php if(isset($userprofile[0])){ echo $userprofile[0]->firstname.' '.$userprofile[0]->secondname;}?></p> 
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>-->
            </div>
          </div>
          <!-- search form -->
          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>
          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">MAIN NAVIGATION</li>
		     		<?php 
							if(isset($apps_models_list)){
								 foreach ($apps_models_list as $apps):
									echo '<li class="treeview">';
									echo '<a href="#">';
									echo '<i class="'.$apps['icon_name'].'"></i> <span>'.$apps['applist'].'</span> <i class="fa fa-angle-left pull-right"></i>';
									echo '</a>';
									echo '<ul class="treeview-menu">';

									 	foreach ($apps['modelslist'] as $models): 
											echo '<li><a href="'.base_url().'index.php/'.$models['model_url'].'"><i class="fa fa-circle-o"></i>'.$models['modelslist'].'</a></li>';
									 	endforeach;
									echo '</ul></li>';
								 endforeach;
							}
					?>
          </ul>
        </section>
        <!-- /.sidebar -->
      </aside>

      <!-- =============================================== -->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

