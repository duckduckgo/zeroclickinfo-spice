function ddg_spice_all_sports_people (api_result) {

    if(api_result.playername == "") {
		return;
    }

   	
     Spice.render({
	     data              	: api_result,
	     source_name       	: "Allsportspeople",
	     header1	 		: api_result.playername + " (AllSportsPeople)",	
	     source_url        	: "http://www.allsportspeople.com/Search.aspx?text=" + api_result.playername,
	     template_normal  	: 'all_sports',
         force_no_icon    	: true
	 });   
}
