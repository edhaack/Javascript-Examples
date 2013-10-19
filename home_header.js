WIB.HomeHeader = {
	
	images: null,
	current:1,
	first:1,
	last:null,
	
	setImage: function(id){
		
		WIB.HomeHeader.current = parseInt(id);
		imgID = 'img'+id;

		//change the media and links
		$('#photo_background').css({backgroundImage:'url('+WIB.HomeHeader.images[imgID].src+')'});
		$('.home-header.component .featured a').html(WIB.HomeHeader.images[imgID].name);
		$('.home-header.component .featured a').attr('href',WIB.HomeHeader.images[imgID].url);
		
		//put on the active state
		$('.home-header.component .buttons ul li').removeClass('active');
		$('.home-header.component .buttons ul li[title='+id+']').addClass('active');
		
		//preload the next image
		var preloadID = 'img'+(parseInt(WIB.HomeHeader.current)+1);
		if( WIB.HomeHeader.current == WIB.HomeHeader.last ){
			preloadID = 'img'+WIB.HomeHeader.first;
		}
		$('.home-header.component .for-preload').css({backgroundImage:'url('+WIB.HomeHeader.images[preloadID].src+')'});
		
		return true;
	},
	
	next: function(){
		if( WIB.HomeHeader.current == WIB.HomeHeader.last ){
			return WIB.HomeHeader.setImage(WIB.HomeHeader.first);
		}
		return WIB.HomeHeader.setImage(parseInt(WIB.HomeHeader.current)+1);
	},
	
	previous: function(){
		if( WIB.HomeHeader.current == WIB.HomeHeader.first ){
			return WIB.HomeHeader.setImage(WIB.HomeHeader.last);
		}
		return WIB.HomeHeader.setImage(parseInt(WIB.HomeHeader.current)-1);
	},
	
	init: function() {
		$(document).ready(function(){
		
			$('.home-header.component .get-em-hooked .close-btn').livequery('click',function(){
				$('.home-header.component .get-em-hooked').fadeOut('fast');
			});
			
			var randomImage=1+Math.floor(Math.random()*parseInt(WIB.HomeHeader.last));
			WIB.HomeHeader.setImage(randomImage);
			
			// select an image buttons
			$('.home-header.component .buttons ul li').livequery('click',function(){
				id = $(this).attr('title');
				switch( id ){
					case 'next':
						return WIB.HomeHeader.next();
					case 'previous':
						return WIB.HomeHeader.previous();
					default:
						return WIB.HomeHeader.setImage(id);
				}
			});
			// 
			//move to the next image every 10 seconds
			setInterval('WIB.HomeHeader.next();',30000);
			
		});
	}
};