console.log("quixey xspice.js");

// spice callback function
function ddg_spice_quixey (api_result) {

    console.log("quixey spice2 test");

    var q = api_result.q.replace(/\s/g, '+');

    Spice.render({
        data: api_result,
        source_name: 'Quixey',
        source_url: 'https://www.quixey.com/search?q=' + q,     //api_result.q,
        header1: api_result.q + ' (App Search)',
        force_big_header: true,

        more_logo: "quixey_logo.png",

        template_frame: "carousel",                // zci type
        template_normal: "quixey",           // item template
        carousel_css_id: "quixey",                 // the div used for the carousel
        carousel_template_detail: "quixey_detail", // detail view template
        carousel_items: api_result.results         // item array

    });
}

(function() {

    // format a price
    // p is expected to be a number
    function qprice(p) {
        if (p == 0) {    // == type coercion is ok here
            return "FREE";
        }
        
        return "$" + (p/100).toFixed(2).toString();
    }

    // template helper for price formatting
    // {{price x}}
    Handlebars.registerHelper("price", function(obj) {
        return qprice(obj);
    });

    // template helper to format a price range
    Handlebars.registerHelper("pricerange", function(obj) {
       
        if (!this.editions)
            return "";

        var low  = this.editions[0].cents;
        var high = this.editions[0].cents  ;
        var tmp, range, lowp, highp;

        for (var i in this.editions) {
            tmp = this.editions[i].cents;
            if (tmp < low) low = tmp;
            if (tmp > high) high = tmp;
        }

        lowp = qprice(low);

        if (high > low) {
           highp = qprice(high);
           range = lowp + " - " + highp;
        } else {
            range = lowp;
        }
       
        return range;
    });

    // template helper to replace iphone and ipod icons with
    // smaller 'Apple' icons
    Handlebars.registerHelper("platform_icon", function(icon_url) {
        if (this.id === 2004 || this.id === 2015) {
            return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
        }

        return icon_url;
    });

})();
