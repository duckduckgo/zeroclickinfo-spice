function ddg_spice_game_info(api_result) {
    console.log(api_result);
    if (api_result == null || api_result['status'] != 'OK') return;


//	var about = api_result['about'];
//	var maxLength = 290;
//	var aboutShortened = "";
//	
//	if(parseInt(about.length,10) > parseInt(maxLength,10)){
//		//About text bigger than maximum allowed
//		//Cropping by full stops
//		for(var i=0; i<= maxLength; i=i+1) {
//		    if(about.substring(i,i+1)==".") {
//			aboutShortened = about.substring(0,i+1);
//		    }
//		}
//		//If Cropping by full stops didn't work, crop by spaces
//		if(aboutShortened == ""){
//			for(var j=0; j<= maxLength; j=j+1) {
//			    if(about.substring(j,j+1)==" ") {
//				aboutShortened = about.substring(0,j+1) + "...";
//			    }
//			}
//		}
//		//If all failed, crop by character length
//		if(aboutShortened == ""){
//			aboutShortened = about.substring(0,maxLength) + "...";
//		}
//	
//		
//	}else{
//		//About text is smaller than allowed, do no cropping
//		aboutShortened = about;
//	}
//
//    api_result.about = aboutShortened;

    //a: aboutShortened,
    //h: api_result['name'] + ' (Games)',
    //s: api_result['domain'],
    //u: api_result['link'],
    //i: api_result['image'],
    //force_big_header: 1

    Spice.render({
        data                     : api_result,
        image_url                : api_result.image,
        header1                  : api_result.name + ' (Games)',
        source_url               : api_result.link,
        source_name              : 'TheFreeGamesDB',
        template_normal          : 'game_info',
        force_no_favicon         : true
        //force_favicon_url        : 'http://' + api_result.domain
    });
}
