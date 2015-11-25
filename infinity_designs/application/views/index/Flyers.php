		            <!-- general form elements -->
		            <div class="box box-primary">
		              <div class="box-header with-border">
										<h3 class="box-title">Add a Card</h3>
		              </div><!-- /.box-header -->
		              <!-- form start -->
		              <form role="form" action="<?php echo base_url().'index.php/flyers/save/';?>" method="POST">

										<div class="box-body">

<style>
  article, aside, figure, footer, header, hgroup, 
  menu, nav, section { display: block; }
</style>
<div class="row">
	<div class="col-md-4">
		<div class="control-group">
	  	<label class="control-label">Title</label>
		 	<div class="controls">

				<input name="title" id="title" type="text" placeholder="Add Title" class="form-control" value="<?php echo set_value('title');?>"/>
				<?php echo form_error('title','<p class="text-red"> ','</p>'); ?>
		</div>
	 </div>
	 <!--<div style="width:320px;height:300px;background-color:grey;opacity: 0.4;">-->
  	<input type='file' onchange="titleImg(this);" />
    <img id="titlespic" src="#" alt="your image" width="320" height="300px""/>
	 <!--</div>-->
	</div><!-- /.col -->
	<div class="col-md-4">
	 <!--<div style="width:320px;height:300px;background-color:grey;opacity: 0.4;">-->
  	<input type='file' onchange="pic2Img(this);" />
    <img id="pic2pic" src="#" alt="your image" width="320" height="300px""/>
	 <!--</div>-->
	</div><!-- /.col -->
	<div class="col-md-4">
  	<!-- textarea -->
    <div class="form-group">
    	<label>Content 2</label>
      <textarea class="form-control" rows="3" placeholder="Content 2 ..."></textarea>
    </div>
	</div><!-- /.col -->
</div><!-- /.row -->


<div class="row">
	<div class="col-md-4">
		<div class="control-group">
	  	<label class="control-label">Introduction</label>
		 	<div class="controls">

				<input name="introduction" id="introduction" type="text" placeholder="Add Introduction" class="form-control" value="<?php echo set_value('introduction');?>"/>
				<?php echo form_error('introduction','<p class="text-red"> ','</p>'); ?>
		 	</div>
		</div>
	  <!--<div style="width:320px;height:300px;background-color:grey;opacity: 0.4;">-->
			 <input type='file' onchange="introductionImg(this);" />
			 <img id="introductionpic" src="#" alt="your image" />
		<!--</div>-->
	</div><!-- /.col -->
	<div class="col-md-4">

		<div class="control-group">
	  	<label class="control-label">Content Description</label>
		 	<div class="controls">

				<input name="entercontent" id="entercontent" type="text" placeholder="Add content" class="form-control" value="<?php echo set_value('entercontent');?>"/>
				<?php echo form_error('entercontent','<p class="text-red"> ','</p>'); ?>
		 	</div>
		</div>
	 <!--<div style="width:320px;height:300px;background-color:grey;opacity: 0.4;">-->
  	<input type='file' onchange="contentImg(this);" />
    <img id="entercontentpic" src="#" alt="your image" width="320" height="300px""/>
	 <!--</div>-->

	</div><!-- /.col -->
	<div class="col-md-4">
	 <!--<div style="width:320px;height:300px;background-color:grey;opacity: 0.4;">-->
  	<input type='file' onchange="pic3Img(this);" />
    <img id="pic3pic" src="#" alt="your image" width="320" height="300px""/>
	 <!--</div>-->
	</div><!-- /.col -->
</div><!-- /.row -->

<script>
     function titleImg(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#titlespic')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

     function introductionImg(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#introductionpic')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

     function pic2Img(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#pic2pic')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

     function contentImg(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#entercontentpic')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

     function pic3Img(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#pic3pic')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
</script>

											</div><!-- /.box-body -->
											<div class="box-footer">
												<button type="submit" class="btn btn-primary">Submit</button>
											</div>
									</form>
              </div><!-- /.box -->
