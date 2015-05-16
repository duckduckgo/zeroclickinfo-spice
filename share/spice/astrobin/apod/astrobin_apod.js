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
        var getimageid = api_result.objects[0].image.split("/");
        $.getScript("/js/spice/astrobin/fetch_id/" + getimageid[4]);
    };

    
    env.ddg_spice_astrobin_fetch_id = function(api_result) {
        if (!api_result) {
            return Spice.failed('apod');
        }

        Spice.add({
            id: "apod",
            name: "Astronomy",
            data: api_result,
            signal: 'high',
            meta: {
                itemType: "Astrophoto",
                sourceName: "AstroBin",
                sourceUrl: "http://www.astrobin.com/" + api_result.id
            },
            normalize: function(item) {
                if(!item.title) {
                     item.title = "Astronomy picture of the Day";
                }
                var boxData;
                if (item.imaging_telescopes || item.imaging_cameras) {
                    boxData = [{heading: 'Imaging Info:'}];
                    boxData.push({
                        label: "Size: " + item.w + " x " + item.h
                    });
                    if(item.subjects.length) {
                        boxData.push({
                            label: "Subjects: " + item.subjects
                        });
                    }
                    if(item.imaging_telescopes.length) {
                        boxData.push({
                            label: "Telescopes: " + item.imaging_telescopes
                        });
                    }
                    if(item.imaging_cameras.length) {
                        boxData.push({
                            label: "Cameras: " + item.imaging_cameras
                        });
                    }
                }
                return {
                    image: item.url_duckduckgo,
                    title: item.title,
                    url: "http://www.astrobin.com/" + item.id,
                    infoboxData: boxData,
                    description: DDG.strip_html(item.description)
                };
            },
            templates: {
                group: 'info'
            },
        });
    };
}(this));
