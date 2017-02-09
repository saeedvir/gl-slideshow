/*_______ Global Variables ______________________________________________________________________________________*/
	var gl_slideshow_timer;
	var gl_slideshow_timer_value = 5000;
	var flag_pause = false;
	var slideshow_index=0;
	var data_slideshow=[];
	var data_captions=[];
	var flag_slideshow_init=false;
	var gl_slideshow_template='<div id="animate-area" class="gl-slideshow-image" style="background-image:url(\'%IMAGE%\');"></div>';
	var gl_slideshow_nav_template='<li data-index="%INDEX%"><a></a></li>';
	var gl_slideshow_thumb_template='<li data-index="%INDEX%"><a><img src="%IMAGE%"/></a></li>';
	var gl_slideshow_caption ='<div class="gl-slideshow-caption">%TEXT%</div>';
	var gl_slideshow_animate = 'fadeIn';
	var gl_slideshow_option = {navbar : true,caption:false,thumb:true};
	var gl_slideshow_drag = {x0:0,x2:0};

	$(document).ready(function(){
		/*_______ Set Variables ______________________________________________________________________________________*/

		// data_slideshow = ["uploads/slideshow/11.jpg","uploads/slideshow/22.jpg","uploads/slideshow/33.jpg"];

		 $('.gl-data-slideshow li img').each(function(index, el) {
		 	data_slideshow.push($(el).attr('src'));
		 	data_captions.push($(el).attr('data-caption'));
		 });

		 $('.gl-data-slideshow').remove();

		 if(!flag_slideshow_init)
		 	slideshow_init();
		
		/*_______ Slideshow Click on Nav Item ______________________________________________________________________________________*/
		 $(document).on('click', '.gl-slideshow-nav li,.gl-slideshow-thumb li', function(event) {
		 	set_current_slide($(this).attr('data-index'));
		 });
		 $(document).on('click', '.gl-slideshow-next', function(event) {
		 	slideshow_index--;
		 	set_current_slide(slideshow_index);
		 });
		 $(document).on('click', '.gl-slideshow-prev', function(event) {
		 	slideshow_index++;
		 	set_current_slide(slideshow_index);
		 });
		 $(document).on('click', '.gl-slideshow-pause', function(event) {
		 	slideshow_timer_start_stop();
		 });


		/*_______ SlideShow Move Event ______________________________________________________________________________________*/
		 $(document).on('mousedown', '.gl-slideshow-image', function(event) {
		 	event.preventDefault();
		 	gl_slideshow_drag.x0 = event.pageX;
		 });
		 $(document).on('mouseup', '.gl-slideshow-image', function(event) {
		 	event.preventDefault();
		 	gl_slideshow_drag.x1 = event.pageX;

		 	if(gl_slideshow_drag.x0 == gl_slideshow_drag.x1)
		 		return false;

		 	if(gl_slideshow_drag.x1 >= gl_slideshow_drag.x0){
		 		slideshow_index--;
		 		set_current_slide(slideshow_index);
		 	}else{
		 		slideshow_index++;
		 		set_current_slide(slideshow_index);
		 	}
		 });
		



		/*_______ End Ready Event ______________________________________________________________________________________*/
	});


	/*_______ Slideshow Init Function ______________________________________________________________________________________*/
	function slideshow_init(){
		tmp = gl_slideshow_template.replace('%IMAGE%',data_slideshow[slideshow_index]);
			$('.gl-slideshow .gl-slideshow-container').html(tmp);
			$('.gl-slideshow .gl-slideshow-container .gl-slideshow-image').addClass('animated').addClass(gl_slideshow_animate);

/*		tmp = gl_slideshow_caption.replace('%TEXT%',data_captions[slideshow_index]);
			$('.gl-slideshow .gl-slideshow-container').append(tmp);*/
	

			for (i in data_slideshow){
				$('.gl-slideshow-nav').append(gl_slideshow_nav_template.replace('%INDEX%',i));

				$('.gl-slideshow-thumb').append(gl_slideshow_thumb_template.replace('%INDEX%',i).replace('%IMAGE%',data_slideshow[i]))
			}
			$('.gl-slideshow-nav,.gl-slideshow-thumb').find('li[data-index="'+slideshow_index+'"] a').addClass('active');



			slideshow_index++;
			slideshow_timer();

			flag_slideshow_init=true;

	}
	/*_______ Slideshow Timer Function ______________________________________________________________________________________*/
	function slideshow_timer(){
		
		//if Pause Then Stop !
		if(flag_pause)
			return false;

		gl_slideshow_timer = setTimeout(function(){
			if( data_slideshow[slideshow_index] == undefined || slideshow_index<0 || slideshow_index>data_slideshow.length)
				slideshow_index=0;

			tmp = gl_slideshow_template.replace('%IMAGE%',data_slideshow[slideshow_index]);
				$('.gl-slideshow .gl-slideshow-container').html(tmp);
				$('.gl-slideshow .gl-slideshow-container .gl-slideshow-image').addClass('animated').addClass(gl_slideshow_animate);
			
/*			tmp = gl_slideshow_caption.replace('%TEXT%',data_captions[slideshow_index]);
				$('.gl-slideshow .gl-slideshow-container').append(tmp);*/

		
			$('.gl-slideshow-nav li a,.gl-slideshow-thumb li a').removeClass('active');
			$('.gl-slideshow-nav,.gl-slideshow-thumb').find('li[data-index="'+slideshow_index+'"] a').addClass('active');
			

			slideshow_index++;
			slideshow_timer();
		},gl_slideshow_timer_value);
	}
	

	/*_______ Slideshow Stop Timer ______________________________________________________________________________________*/
	function slideshow_timer_start_stop(){

		if(!flag_pause){
			$('.gl-slideshow-pause i').attr('class',"fa fa-play-circle");
			$('.gl-slideshow-pause').addClass('show');
			flag_pause = true;
			
			clearTimeout(gl_slideshow_timer);
		}else{
			$('.gl-slideshow-pause i').attr('class',"fa fa-pause-circle");
			$('.gl-slideshow-pause').removeClass('show');
			flag_pause = false;

			slideshow_timer();
		}
		
	}
	/*_______ Slideshow Set Item Function ______________________________________________________________________________________*/
	function set_current_slide(val_index){

		slideshow_index=val_index;
		
		if( data_slideshow[slideshow_index] == undefined || slideshow_index<0 || slideshow_index>data_slideshow.length)
				slideshow_index=0;

		tmp = gl_slideshow_template.replace('%IMAGE%',data_slideshow[slideshow_index]);
			$('.gl-slideshow .gl-slideshow-container').html(tmp);
			$('.gl-slideshow .gl-slideshow-container .gl-slideshow-image').addClass('animated').addClass(gl_slideshow_animate);
		
/*		tmp = gl_slideshow_caption.replace('%TEXT%',data_captions[slideshow_index]);
			$('.gl-slideshow .gl-slideshow-container').append(tmp);*/
			
			$('.gl-slideshow-nav li a,.gl-slideshow-thumb li a').removeClass('active');
			$('.gl-slideshow-nav,.gl-slideshow-thumb').find('li[data-index="'+slideshow_index+'"] a').addClass('active');
	}





/*_______ End Functions ______________________________________________________________________________________*/
