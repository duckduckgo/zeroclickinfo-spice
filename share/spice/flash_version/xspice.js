var ddg_spice_flash_version = function() {
	if(!YAHOO.util.FlashDetect.installed) {
		return;
	} 

	Spice.render({
	    data             : {version: YAHOO.util.FlashDetect.raw},
	    header1          : 'Flash Version',
	    source_name      : 'Adobe',
	    source_url	     : 'https://get.adobe.com/flashplayer/',
	    template_normal  : "flash",
	    force_big_header : true
	});	
};

// Manually call the function.
ddg_spice_flash_version();