(function(env) {
    "use strict";

    // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
    // If cache was set to false, it would be calling /js/spice/hackage/packages/hello?_=12345
    // and that's something that we don't want.
    $.ajaxSetup({ cache: true });

    // Fetch our json and pass to getScript
    env.ddg_spice_astrobin_apod = function(api_result) {
        if(!api_result) {
            return Spice.failed('apod');  
        }
        var idarray = api_result.objects[0].image.split("/");
        $.getScript("/js/spice/astrobin/fetch_id/" + idarray[4]);
    };

    
    env.ddg_spice_astrobin_fetch_id = function(api_result) {
        if (!api_result) {
            return Spice.failed('apod');
        }
	
        Spice.add({
            id: "apod",
            name: "Astrophoto of the Day",
            data: api_result,
            meta: {
                itemType: "Astrophoto",
                sourceName: "Astrobin",
                sourceUrl: api_result.url_hd 
            },
            normalize: function(item) {
                if(!item.title) {
                     item.title = "Astronomy picture of the Day";
                }
                var boxData;
                if (item.imaging_telescopes || item.imaging_cameras) {
                    boxData = [{heading: 'Imaging Info:'}];
                        if(item.imaging_telescopes) {
                            boxData.push({
                                label: "Telescopes: " + item.imaging_telescopes
                            });
                        }
                        if(item.imaging_cameras) {
                            boxData.push({
                                label: "Cameras: " + item.imaging_cameras
                            });
                        }
                }
                return {
                    image: item.url_regular,
                    title: item.title,
                    infoboxData: boxData,
                };
            },
            templates: {
                group: 'info',
            },
        });
    };
}(this));
