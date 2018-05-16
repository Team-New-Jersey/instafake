$(document).ready(function(){
    $("#snap").click(function(){
    	$("#form").submit(function(e) {
    		e.preventDefault();
	    	$("#form").css({zIndex: 0});
	        $(".shutter").rotate({
			    center: [100, 0],
			    angle: -5,
			    duration: 500,
			    animateTo:25,
			    queue: false
			});
			$(".shutter2").rotate({
			    center: [100, 0],
			    angle: -65,
			    duration: 500,
			    animateTo:-35,
			    queue: false
			});  
			$(".shutter3").rotate({
			    center: [100, 0],
			    angle: -125,
			    duration: 500,
			    animateTo:-95,
			    queue: false
			});
			$(".shutter4").rotate({
			    center: [100, 0],
			    angle: -185,
			    duration: 500,
			    animateTo:-155,
			    queue: false
			});
			$(".shutter5").rotate({
			    center: [100, 0],
			    angle: -245,
			    duration: 500,
			    animateTo:-215,
			    queue: false
			});
			$(".shutter6").rotate({
			    center: [100, 0],
			    angle: -305,
			    duration: 500,
			    animateTo:-275,
			    queue: false
			});
			setTimeout(function(){
				$(".shutter").rotate({
				    center: [100, 0],
				    angle: 25,
				    animateTo:-5,
				    queue: false
				});
				$(".shutter2").rotate({
				    center: [100, 0],
				    angle: -35,
				    animateTo:-65,
				    queue: false
				});  
				$(".shutter3").rotate({
				    center: [100, 0],
				    angle: -95,
				    animateTo:-125,
				    queue: false
				});
				$(".shutter4").rotate({
				    center: [100, 0],
				    angle: -155,
				    animateTo:-185,
				    queue: false
				});
				$(".shutter5").rotate({
				    center: [100, 0],
				    angle: -215,
				    animateTo:-245,
				    queue: false
				});
				$(".shutter6").rotate({
				    center: [100, 0],
				    angle: -275,
				    animateTo:-305,
				    queue: false
				});
	    
				$("#form").delay(500).queue(function (next) { 
	    			$(this).css('zIndex', 1); 
	    			$(this).unbind("submit").submit();
	    			next(); 
	  			});
			}, 500);
		});
    });
});
