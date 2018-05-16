$(document).ready(function(){
    $(".link").click(function(e){
    	e.preventDefault();
    	var $self=$(this);
    		
	    	$("#form").css({zIndex: 0});
	        $(".filter").rotate({
	        	center: [100, 0],
			    angle: 40,
			    duration: 500,
			    animateTo: 0,
			    queue: false
			});
			setTimeout(function(){
				$(".filter").rotate({
					center: [100, 0],
				    angle: 0,
				    animateTo:40,
				    queue: false
				});
				
	    
				$(".link").delay(500).queue(function (next) { 
	    			$("#form").css('zIndex', 1); 
	    			document.location = $self.attr('href');
	    			next(); 
	  			});
			}, 500);
		return false;
    });
});

