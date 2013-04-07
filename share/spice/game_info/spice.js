function ddg_spice_game_info(ir) {
    var snippet;
    //Check to see if any JSON data was returned 
    if (ir != null && ir['status'] == 'OK') {
	var about = ir['about'];
	var maxLength = 290;
	var aboutShortened = "";
	
	
	if(parseInt(about.length,10) > parseInt(maxLength,10)){
		//About text bigger than maximum allowed
		//Cropping by full stops
		for(var i=0; i<= maxLength; i=i+1) {
		    if(about.substring(i,i+1)==".") {
			aboutShortened = about.substring(0,i+1);
		    }
		}
		//If Cropping by full stops didn't work, crop by spaces
		if(aboutShortened == ""){
			for(var j=0; j<= maxLength; j=j+1) {
			    if(about.substring(j,j+1)==" ") {
				aboutShortened = about.substring(0,j+1) + "...";
			    }
			}
		}
		//If all failed, crop by character length
		if(aboutShortened == ""){
			aboutShortened = about.substring(0,maxLength) + "...";
		}
	
		
	}else{
		//About text is smaller than allowed, do no cropping
		aboutShortened = about;
	}



	items = [[]];
	items[0] = {
            a: aboutShortened,
            h: ir['name'] + ' (Games)',
            s: ir['domain'],
            u: ir['link'],
            i: ir['image'],
	    force_big_header: 1
        };
        nra(items);

	
    }
}
