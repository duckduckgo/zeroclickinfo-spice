(function (env) {
    "use strict";
    env.ddg_spice_package_tracking = function(api_result){

        if (!api_result || !api_result.c || api_result.error) {
            return Spice.failed('package_tracking');
        }

        var logo = api_result.c;
        if (/^ups-.+/.test(logo)) {
            logo = 'ups';
        }
        else if (/^fedex-.+/.test(logo)) {
            logo = 'fedex';
        }

        var details_url = "https://www.packagetrackr.com/track/" + [api_result.c, api_result.n].join("/"),
            carrier = carriers[api_result.c];

        if (!carrier) {
            return Spice.failed('package_tracking');
        }
        var carrierUrl = false;
        if (carrier.url) {
            carrierUrl = carrier.url.replace("{{code}}", encodeURIComponent(api_result.n));
        }

        DDG.require('moment.js', function() {
            Spice.add({
                id: "package_tracking",
                name: "Answer",
                meta: {
                    sourceName: carrierUrl ? carrier.name : "Packagetrackr",
                    sourceUrl: carrierUrl || details_url
                },
                data: api_result,
                normalize: function (data) {

                    var status = statusCodes[data.status_code];

                    var obj = {
                        url: details_url,
                        title: status,
                        subtitle: data.status_description === status ? false : data.status_description,
                        image: DDG.get_asset_path('package_tracking', logo + '.png'),
                        record_data: {
                            "Tracking number": data.n,
                            "Location": data.location,
                        }
                    };

                    $.each(dates, function(property, text){
                        var value = data[property];
                        var dateFormat = 'ddd, MMM D, YYYY';

                        if (value) {
                            if (text === "Delivered") {
                                text = "Delivered on";
                                dateFormat += ', h:mm A';
                            }

                            obj.record_data[text] = moment(value).utc().format(dateFormat);
                        }
                    });

                    return obj;

                },
                templates: {
                    group: 'icon',
                    options: {
                        content: 'record',
                        moreAt: true,
                        moreText: carrierUrl ? {
                            href: details_url,
                            text: "Data from Packagetrackr"
                        } : false
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

    var statusCodes = {
        NA: "N/A",
        PD: "Pending",
        IR: "Information Received",
        AP: "At Pickup",
        AF: "Arrived at Facility",
        AC: "At Customs Clearance",
        TP: "Tendered to Partner",
        IT: "In Transit",
        DS: "Delivery Scheduled",
        OD: "Out for Delivery",
        DA: "Delivery Attempt",
        WP: "Will Pickup",
        RS: "Return to Shipper",
        DL: "Delivered",
        DE: "Delivery Exception",
        SU: "Stop Updating",
        EX: "Expired",
        IU: "Information Updated",
        VD: "Voided",
        TF: "Track Failed",
    };

    var carriers = {
        "a1-international": { name: "A1 International" },
        "aramex-express": { name: "Aramex Express" },
        "australia-post": { name: "Australia Post" },
        "canada-post": { name: "Canada Post" },
        "ceva": { name: "CEVA" },
        "china-ems": { name: "China EMS" },
        "china-post": { name: "China Post" },
        "dhl": { name: "DHL" },
        "dhl-express": { name: "DHL Express" },
        "dhl-ecommerce-us": { name: "DHL eCommerce US" },
        "dhl-deutsche-post": { name: "Deutsche Post DHL" },
        "dpd-de": { name: "DPD Germany" },
        "dynamex": { name: "Dynamex" },
        "ensenda": { name: "Ensenda" },
        "fedex": {
            name: "FedEx",
            url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={{code}}&action=track'
        },
        "fedex-express": {
            name: "FedEx",
            url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={{code}}&action=track'
        },
        "fedex-freight": {
            name: "FedEx",
            url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={{code}}&action=track'
        },
        "fedex-smart-post": {
            name: "FedEx",
            url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={{code}}&action=track'
        },
        "gso": { name: "GSO" },
        "hongkong-post": { name: "Hongkong Post" },
        "india-post": { name: "India Post" },
        "japan-post": { name: "Japan Post" },
        "lasership": { name: "LaserShip" },
        "prestige": { name: "Prestige" },
        "ontrac": { name: "OnTrac" },
        "osm": { name: "OSM" },
        "parcelforce": {
            name: "Parcelforce",
            url: "http://www.parcelforce.com/track-trace?trackNumber={{code}}"
        },
        "post-danmark": { name: "Post Danmark" },
        "posten-norge": { name: "Posten Norge" },
        "postnord-sverige": { name: "PostNord Sverige" },
        "purolator": { name: "Purolator" },
        "royal-mail": { name: "Royal Mail" },
        "spee-dee": { name: "Spee Dee Delivery" },
        "thailand-post": { name: "Thailand Post" },
        "tnt": { name: "TNT" },
        "tnt-express": { name: "TNT Express" },
        "tnt-express-uk": { name: "TNT Express UK" },
        "toll-priority": { name: "Toll Priority" },
        "ups": {
            name: "UPS",
            url: "https://wwwapps.ups.com/WebTracking/processInputRequest?TypeOfInquiryNumber=T&InquiryNumber1={{code}}"
        },
        "ups-packages": {
            name: "UPS",
            url: "https://wwwapps.ups.com/WebTracking/processInputRequest?TypeOfInquiryNumber=T&InquiryNumber1={{code}}"
        },
        "ups-freight": {
            name: "UPS",
            url: "https://wwwapps.ups.com/WebTracking/processInputRequest?TypeOfInquiryNumber=T&InquiryNumber1={{code}}"
        },
        "ups-mail-innovations": {
            name: "UPS",
            url: "https://wwwapps.ups.com/WebTracking/processInputRequest?TypeOfInquiryNumber=T&InquiryNumber1={{code}}"
        },
        "postal": { name: "Global Postal" },
        "usps": {
            name: "USPS",
            url: "https://tools.usps.com/go/TrackConfirmAction.action?tLabels={{code}}"
        },
        "yodel": { name: "Yodel Domestic" },
        "yrc": { name: "YRC Freight" }
    };
}(this));
