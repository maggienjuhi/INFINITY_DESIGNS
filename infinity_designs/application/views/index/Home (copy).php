
<!DOCTYPE html>
<html>
<head>
	<title>Infinity designs</title>
	<!--fonts-->
		<link href='//fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
		<link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
		rel='stylesheet' type='text/css'>
	<!--//fonts-->
			<link href="<?php echo base_url();?>res/frontend/css/bootstrap.css" rel="stylesheet">
			<link href="<?php echo base_url();?>res/frontend/css/style.css" rel="stylesheet" type="text/css" media="all" />
			<link rel="stylesheet" href="<?php echo base_url();?>res/frontend/css/chocolat.css" type="text/css">
			<link rel="stylesheet" href="<?php echo base_url();?>res/frontend/css/bootstrap.css" type="text/css">
	<!-- for-mobile-apps -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="keywords" content="Bigwig Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
		Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
	<!-- //for-mobile-apps -->	
	<!-- js -->
		<script type="text/javascript" src="<?php echo base_url();?>res/frontend/js/jquery.min.js"></script>		
		<script type="text/javascript" src="<?php echo base_url();?>res/frontend/js/bootstrap.js"></script>
	<!-- js -->
	<script src="<?php echo base_url();?>res/frontend/js/modernizr.custom.97074.js"></script>
	<!-- start-smoth-scrolling -->
		<script type="text/javascript" src="<?php echo base_url();?>res/frontend/js/move-top.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>res/frontend/js/easing.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				$(".scroll").click(function(event){		
					event.preventDefault();
					$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
				});
			});
		</script>
	<!-- start-smoth-scrolling -->
</head>
<body>
<!-- banner-slider -->
<div id="home" class="banner-slider">
	<div class="header">
									<div class="header-left">
										<a class="link link--kumya" href="<?php echo base_url();?>res/frontend/#"><img src= "<?php echo base_url();?>res/frontend/images/toplogo.png" alt="" /></a>
									</div>
									<div class="navigation">
										<span class="menu"><img src="images/menu.png" alt=""/></span>
												<nav class="cl-effect-11" id="cl-effect-11">	
													<ul class="nav1">	
														<li><a class="scroll" href="<?php echo base_url();?>res/frontend/#home" data-hover="HOME">HOME</a></li>
														<li><a class="scroll" href="<?php echo base_url();?>res/frontend/#about" data-hover="ABOUT">ABOUT</a></li>
														
														<li class="dropdown">
		 <a class="scroll" data-toggle="dropdown" href="<?php echo base_url();?>res/frontend/#services" data-hover="services">Services <span class="caret"></span></a>
										          <ul class="dropdown-menu">
										            <li><a href="<?php echo base_url();?>res/frontend/#">Business cards</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Note card</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Flyers</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Brochures</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Mini cards</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Posters</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Stickers</a></li>
										            <li><a href="<?php echo base_url();?>res/frontend/#">Gift cards</a></li>
										          </ul>
										      </li>
																							
														<li><a class="scroll" href="<?php echo base_url();?>res/frontend/#contact" data-hover="CONTACT">CONTACT</a></li>
													</ul>
												</nav>
													<!-- script for menu -->
														<script> 
															$( "span.menu" ).click(function() {
															$( "ul.nav1" ).slideToggle( 300, function() {
															 // Animation complete.
															});
															});
														</script>
													<!-- //script for menu -->

									</div>
									<div class="clearfix"></div>
							</div>
		<!-- responsiveslides -->
							<script src="<?php echo base_url();?>res/frontend/js/responsiveslides.min.js"></script>
								<script>
									// You can also use "$(window).load(function() {"
									$(function () {
									 // Slideshow 4
									$("#slider3").responsiveSlides({
										auto: true,
										pager: true,
										nav: false,
										speed: 500,
										namespace: "callbacks",
										before: function () {
									$('.events').append("<li>before event fired.</li>");
									},
									after: function () {
										$('.events').append("<li>after event fired.</li>");
										}
										});
										});
								</script>
		<!-- responsiveslides -->
		<div id="top" class="callbacks_container">
			<ul class="rslides" id="slider3">
				
				<li>
					<div class="banner">
							<div class="container">
								<div class="banner-info">
									<h3>FAST, CONVINIENT AND AFFORDABLE</h3>
									
									<a class="scroll" href="<?php echo base_url();?>index.php/home/#about"><img src="<?php echo base_url();?>res/frontend/images/arrow.png" alt=""/></a>
								</div>
							</div>
					</div>
				</li>
				<li>
					<div class="banner">
							
							<div class="container">
								<div class="banner-info">
									<h3>SMART CARDS SOLUTIONS
									THAT YOU NEED</h3>
									
									<a class="scroll" href="<?php echo base_url();?>index.php/business_detail/#about"><img src="images/arrow.png" alt=""/></a>
								</div>
							</div>
					</div>
				</li>
			</ul>
		</div>
</div>
<div class="clearfix"></div>
<!-- //banner-slider -->
<!-- about -->
<div id="about" class="testi">
	<div class="container">
		<div class="about-header">
			<h3>HOW IT WORKS</h3>
				</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/hand256.png" alt=""/><br><p>Choose a template of your choice and change whatever you want</p>
				
			</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/enter5 (1).png" alt=""/><br><p>Proofread and click on the submit icon</p> 
				
			</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/paper6.png"	alt=""/><br><p>After submission, we print the card for you</p>
			</div>
			
			
			
			<div class="clearfix"> </div>			
		</div>
	</div>
</div>
		


<!-- //awarded -->
<!-- services -->
<div class="services" id="services">
	<div class="container">
		<div class="sevices-main">
			<div class="ser-top">
			<h3>Services</h3>
			
			</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/flyer.jpeg" alt=""/><br><h4><a href="<?php echo base_url();?>index.php/flyers">flyer</h4>
				
			</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/business card.png" alt=""/><br><h4><a href="<?php echo base_url();?>index.php/business_cards">Business Cards</h4> 
				
			</div>
			<div class="col-md-4 ser-grid">
				<img src="<?php echo base_url();?>res/frontend/images/brochure.png" alt=""/><br><h4><a href="<?php echo base_url();?>index.php/brochures">Brochure</h4> 
				
			</div>
			
			
			
			<div class="clearfix"> </div>			
		</div>
	</div>
</div>
<!--services end here-->







<!-- //about -->
<!-- //testi -->
<!-- awarded -->
<div class="award">
	<div class="container">
		<div class="award-grids">
			<!--//div class="col-md-6 award-left"-->
				<!--img src="images/img1.jpg" alt=""/-->
			<!--div-->
			<div class="col-md-12 award-middle">
				<h3>WHY CHOOSE US</h3><br>
				<p>
					We are affordable, fast and convenient. We deliver our products and services on time leaving our clients satisfied.If you need a business card,a flier,a post,or a bronchure,you dont need to go to look for a designer.We are here to help you design your own,by giving you free templates with different layouts where you can fill your details,and also have the chance of placing an image or logo of your own choice.
						
				</p>
			</div>
			<div class="clearfix"></div>
		</div>
		<p></p>
	</div>
</div>
<!-- //awarded -->


<!-- testi -->
<div class="about">
	<div class="container">
		
			<div class="col-md-2 about-middle text-center">
					<!-- responsiveslides -->
							<script src="<?php echo base_url();?>res/frontend/js/responsiveslides.min.js"></script>
								<script>
									// You can also use "$(window).load(function() {"
									$(function () {
									 // Slideshow 4
									$("#slider4").responsiveSlides({
										auto: true,
										pager: false,
										nav: true,
										speed: 500,
										namespace: "callbacks",
										before: function () {
									$('.events').append("<li>before event fired.</li>");
									},
									after: function () {
										$('.events').append("<li>after event fired.</li>");
										}
										});
										});
								</script>
					<!-- responsiveslides -->
					<div class="callbacks_container" class="about-middle text-center">
						
					</div>
			</div>
			
		
	</div>
</div>
<!-- //testi -->
<!-- awarded -->		

<!-- //awarded -->
<!-- portfolio -->
<!--<div id="portfolio" class="gallery">
		<div class="container">
				<script src="<?php echo base_url();?>res/frontend/js/jquery.chocolat.js"></script>
																																																																														
			<!--light-box-files -->
			<!--<script type="text/javascript">
			$(function() {
				$('.gallery a').Chocolat();
			});
			</script>
			<h3>PORTFOLIO</h3>
			<section>
				<ul id="da-thumbs" class="da-thumbs">
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a1.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a1.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a2.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a2.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a3.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a3.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a4.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a4.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>	
						<a href="<?php echo base_url();?>res/frontend/images/a5.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a5.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a6.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a6.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a7.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a7.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a1.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a1.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					<li>
						<a href="<?php echo base_url();?>res/frontend/images/a2.jpg" class="b-link-stripe b-animate-go thickbox">
							<img src="images/a2.jpg" alt="" />
							<div>
								<h5>VIEW</h5>
							</div>
						</a>
					</li>
					
				</ul>
			</section>
				<script type="text/javascript" src="<?php echo base_url();?>res/frontend/js/jquery.hoverdir.js"></script>	
				<script type="text/javascript">
					$(function() {
						$('#da-thumbs > li').each( function() { $(this).hoverdir(); } );
					});
				</script>
        </div>
</div>
<!-- //portfolio -->
<!-- get-in -->
<div id="contact" class="get-in-touch">
	<div class="container">
		<div class="get-info text-center">
			<h3>CONTACT</h3>
			<h4><i>Feel Free To Contact Us</i></h4>
		</div>
	</div>
	
<!--/div-->
<!-- //get-in -->
<!-- contact-us -->
<div class="contact-us">
	<form action="<?php echo base_url();?>index.php/home/save" method="post">
		<div class="contact-grids">
			<div class="col-md-4 contact-grid text-center">
				<div class="point-icon"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span></div>
				<p>Bishop Magua First floor</p>
			</div
			>
			<div class="col-md-4 contact-grid text-center">
				<div class="point-icon"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></div>
				<p><a href="<?php echo base_url();?>res/frontend/mailto:info@example.com">joanmungai09@gmail.com</a></p>
			</div>
			<div class="col-md-4 contact-grid text-center">
				<div class="point-icon"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></div>
				<p>+254 0000 0000</p>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="contact-info">
			<form>
				<input name="yourname" 	type="text" placeholder="Your Name" required>
				<?php echo form_error('yourname','<p class="text-red"> ','</p>'); ?>
				<input name="frommail" type="text" placeholder="Your E-Mail" required>
				<?php echo form_error('frommail','<p class="text-red"> ','</p>'); ?>
				<input name="subject" type="text" placeholder="Subject" required>
				<?php echo form_error('subject','<p class="text-red"> ','</p>'); ?>
				<textarea name="messagebody" placeholder="Your Message" required></textarea>
				<?php echo form_error('messagebody','<p class="text-red"> ','</p>'); ?>
				<input type="submit" value="SEND MESSAGE">
			</form>
		</div>
	</div>
</form>
</div>
</div>
<!-- //contact-us -->
<!-- footer -->
<div class="copy-right">
	<div class="container">
		<p>Copyright &copy; 2015 Infinity designs. All Rights Reserved </p>
	</div>
</div>
<!-- footer -->
<!-- Button trigger modal -->
<!--<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>-->

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


<!-- smooth scrolling -->
	<script type="text/javascript">
		$(document).ready(function() {
		/*
			var defaults = {
			containerID: 'toTop', // fading element id
			containerHoverID: 'toTopHover', // fading element hover id
			scrollSpeed: 1200,
			easingType: 'linear' 
			};
		*/								
		$().UItoTop({ easingType: 'easeOutQuart' });
		});
	</script>
	<a href="<?php echo base_url();?>res/frontend/#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>
<!-- //smooth scrolling -->

</body>
</html>
