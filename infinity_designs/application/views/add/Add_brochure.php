            <div class="row">
		          <!-- left column -->
		          <div class="col-md-6">

		            <!-- general form elements -->
		            <div class="box box-primary">
		              <div class="box-header with-border">
										<h3 class="box-title">Add a Brochure</h3>
		              </div><!-- /.box-header -->
		              <!-- form start -->
		              <form role="form" action="<?php echo base_url().'index.php/business_cards/save/'.$id;?>" method="POST">

										<div class="box-body">

								       <div class="control-group">
								          <label class="control-label">Company Name</label>
										      <div class="controls">
												    <input name="domain" id="domain" type="text" placeholder="Add Domain" class="form-control" value="<?php echo set_value('domain');?>"/>
														<?php echo form_error('domain','<p class="text-red"> ','</p>'); ?>
										      </div>
								        </div>

								        <div class="control-group">
								            <label class="control-label">Slogan</label>
								            <div class="controls">
															<input name="email" id="email" type="text" placeholder="Add Email" class="form-control"  value="<?php echo set_value('email');?>"/>
														<?php echo form_error('email','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>

								        <div class="control-group">
								            <label class="control-label">Email</label>
								            <div class="controls">
														<input name="phoneno" id="phoneno" type="text" placeholder="Add Phone no" class="form-control"  value="<?php echo set_value('phoneno');?>"/>
														<?php echo form_error('phoneno','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>

								        <div class="control-group">
								            <label class="control-label">Location</label>
								            <div class="controls">
														<input name="slogan" id="slogan" type="text" placeholder="Add Slogan" class="form-control"  value="<?php echo set_value('slogan');?>"/>
														<?php echo form_error('slogan','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>


								        <div class="control-group">
								            <label class="control-label">About Us/label>
								            <div class="controls">
														<input name="fullnames" id="fullnames" type="text" placeholder="Add Full name" class="form-control"  value="<?php echo set_value('fullnames');?>"/>
														<?php echo form_error('fullnames','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>

								        <div class="control-group">
								            <label class="control-label">Services</label>
								            <div class="controls">
														<input name="position" id="position" type="text" placeholder="Add Last name" class="form-control"  value="<?php echo set_value('position');?>"/>
														<?php echo form_error('position','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>

								        <div class="control-group">
								            <label class="control-label">Phone No.</label>
								            <div class="controls">
														<input name="company" id="company" type="text" placeholder="Add Company" class="form-control"  value="<?php echo set_value('company');?>"/>
														<?php echo form_error('company','<p class="text-red"> ','</p>'); ?>
								            </div>
								        </div>

											</div><!-- /.box-body -->
											<div class="box-footer">
												<button type="submit" class="btn btn-primary">Submit</button>
											</div>
									</form>
              </div><!-- /.box -->
		          </div><!-- left column -->

						      <div class="col-md-5">
										<div id="card<?php echo $id;?>">
											<div class="row">
						      			<div class="col-md-5">						
										  		<span><img width="50" height="50" id="img1" src="<?php echo base_url();?>images/photo.jpg" /></span>
													<span class="fa fa-cloud" id="div_below_domain">Company Name</span>
													<span class="fa fa-laptop" id="div_below_email">Slogan</span>
													<span class="fa fa-phone" id="div_below_phone">Email</span>
													<span class="fa fa-ticket" id="div_below_slogan">Location</span>
												</div><!-- /.col-->
						      			<div id="div_details" class="col-md-5">
													<h4 id="div_fullnames">About Us</h4>
													<h3 id="div_position">Services </h3><hr/>
													<span><strong  id="div_company">Phone No.</strong></span>
													<!--<h5><i>Infinity designs ltd </i></h5>
													<span>P.O Box 1234 </span>
													<span>Lion Place Second Floor </span>
													<span>joannjoki.com</span>-->
												</div><!-- /.col-->
											</div><!-- /.row-->
										</div><!-- /.card2-->
						      </div><!-- /.col -->
            </div> <!-- ROW -->

      
