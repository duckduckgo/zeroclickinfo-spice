(function (env) {
    "use strict";
    env.ddg_spice_package_tracking = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('package_tracking');
        }

        var logo = api_result.c;

        switch (logo) {
            case 'ups-packages':
                logo = 'ups';
                break;

            case 'fedex-express':
                logo = 'fedex';
                break;
        }

        var details_url = "https://www.packagetrackr.com/track/" + [api_result.c, api_result.n].join("/");

        DDG.require('moment.js', function() {
            Spice.add({
                id: "package_tracking",
                name: "Answer",
                meta: {
                    sourceName: "PackageTrackr",
                    sourceUrl: details_url
                },
                data: api_result,
                normalize: function (data) {

                    var obj = {
                        url: details_url,
                        title: data.status_description.replace(/\.$/, ""),
                        subtitle: [
                            "Updated: " + moment(data.progress_at).fromNow(),
                        ],
                        image: DDG.get_asset_path('package_tracking', logo + '.png'),
                        record_data: {
                            "Tracking number": data.n,
                            "Location": data.location,
                        }
                    };

                    $.each(dates, function(property, text){
                        var value = data[property];
                        if (value){
                            obj.record_data[text] = moment(value).format('lll');
                        }
                    });

                    return obj;

                },
                templates: {
                    group: 'icon',
                    options: {
                        content: 'record',
                        moreAt: true
                    },
                    variants: {
                        iconImage: 'medium'
                    }
                }
            });
        });
    };

    var dates = {
        shipped_at: "Shipped on",
        est_delivery_at: "Scheduled delivery",
        act_delivery_at: "Delivered"
    };

    var carriers = {
        "a1-international": "A1 International",
        "aramex-express": "Aramex Express",
        "australia-post": "Australia Post",
        "canada-post": "Canada Post",
        "ceva": "CEVA",
        "china-ems": "China EMS",
        "china-post": "China Post",
        "dhl": "DHL",
        "dhl-express": "DHL Express",
        "dhl-ecommerce-us": "DHL eCommerce US",
        "dhl-deutsche-post": "Deutsche Post DHL",
        "dpd-de": "DPD Germany",
        "dynamex": "Dynamex",
        "ensenda": "Ensenda",
        "fedex": "FedEx",
        "fedex-express": "FedEx Express",
        "fedex-freight": "FedEx Freight",
        "fedex-smart-post": "FedEx SmartPost",
        "gso": "GSO",
        "hongkong-post": "Hongkong Post",
        "india-post": "India Post",
        "japan-post": "Japan Post",
        "lasership": "LaserShip",
        "prestige": "Prestige",
        "ontrac": "OnTrac",
        "osm": "OSM",
        "parcelforce": "Parcelforce",
        "post-danmark": "Post Danmark",
        "posten-norge": "Posten Norge",
        "postnord-sverige": "PostNord Sverige",
        "purolator": "Purolator",
        "royal-mail": "Royal Mail",
        "spee-dee": "Spee Dee Delivery",
        "thailand-post": "Thailand Post",
        "tnt": "TNT",
        "tnt-express": "TNT Express",
        "tnt-express-uk": "TNT Express UK",
        "toll-priority": "Toll Priority",
        "ups": "UPS",
        "ups-packages": "UPS Packages",
        "ups-freight": "UPS Freight",
        "ups-mail-innovations": "UPS Mail Innovations",
        "postal": "Global Postal",
        "usps": "USPS",
        "yodel": "Yodel Domestic",
        "yrc": "YRC Freight"
    };
}(this));
