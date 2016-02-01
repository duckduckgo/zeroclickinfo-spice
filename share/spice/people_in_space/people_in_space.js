(function (env) {
    "use strict";
    
    var codes = {"canada":"ca", "china":"cn", "denmark":"dk", "england" : "uk", "france":"fr", "germany":"de", "italy":"it", "japan":"jp", "kazakhstan":"kz", "netherlands":"nl", "russia":"ru", "spain":"sp", "sweden":"se", "uk":"uk", "usa":"us"};

    function getObject(obj, number) {
        if (number > 0) {
            obj.data = obj.data.people;
            obj.normalize = function(item) {
                return {
                    daysElapsed: moment().diff(item.launchdate, 'days'),
                    launchdate: moment(item.launchdate).format("MMM DD, YYYY"),
                    icon: DDG.settings.region.getLargeIconURL(codes[item.country.toLowerCase()]),
                    twitter: item.twitter.replace(/https?:\/\/twitter.com\//,''),
                    url: item.biolink
                };
            };
            obj.templates.item = 'base_item';
            obj.meta.itemType = number === 1 ? "Person in Space" : "People in Space";
            
            obj.onItemShown = function(item) {
                // Get filename from biophoto image url. Replace file extention jpg to png
                // Use DDG.get_asset_path to get full path to images under spice directory
                var imageFilename = item.biophoto.replace(/^.*[\\\/]/, ''), 
                    localImage = DDG.get_asset_path('people_in_space', "assets/" + imageFilename)
                
                // For retina screen return optimized images @2x.png
                if (DDG.is3x || DDG.is2x) localImage = localImage.replace(/\.jpg/, '@2x.jpg')
                
                // Perform a HTTP GET request to retrieve local images using filename from API 
                // This is used to determine if a local image exists 
                $.ajax({
                    url  : localImage,
                    type : 'get',
                }).always(function(data, statusText, xhr) {
                    // Local image exists if the following is true
                    // HTTP status code is 200 (OK) 
                    // Content-Type is "image/jpeg"
                    if(xhr.status === 200 &&  xhr.getResponseHeader('content-type') == "image/jpeg") {
                        item.set('image', localImage);  // set local image
                    } else {
                        item.set('image', item.biophoto);  // fallback to remote image (returned by API)
                    }
                });
            }
        } else {
            obj.normalize = function(item) {
                return {
                    title: "There are no people in space right now."
                };
            };
            obj.templates.group = 'text';
            obj.templates.options.content = null;
        }
        return obj;
    }

    env.ddg_spice_people_in_space = function(api_result) {

        if (!api_result || api_result.number === undefined) {
            return Spice.failed('people_in_space');
        }

        var object = {
            id: "people_in_space",
            signal: "high",
            data: api_result,
            meta: {
                primaryText: api_result.number + (api_result.number == 1 ? " Person" : " People") + ' in Space',
                sourceName: "People in Space",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/",
                rerender: [
                    'image' // rerender images, required when using item.set in onItemShown
                ]
            },
            templates: {
                options: {
                    moreAt: true,
                    content: Spice.people_in_space.content
                }
            }
        };

        DDG.require("moment.js", function() {
            object = getObject(object, api_result.number);
            Spice.add(object);
        });

    };
}(this));
