function ddg_spice_lobbying(api_result) {
    "use strict";

    if (!api_result || api_result.length === 0) {
        return;
    }

    // to hold the data sorted in decending order
    var sorted_results = [];

    // remove trigger word to display the remainder in the IA header
    var query = DDG.get_query()
        .replace(/(\W|^)(lobby(ing?|ist)|campaign contributio(n?|ns)|contributio(n?|ns)|campaign financ(e?|es))(\W|$)/, '');

    /* get rid of entries in the api results that don't contain
        an amount given or received.  Push to the sorted_result
        array */
    for(var e in api_result){
        //make sure we don't look at _proto_ objects
        if(!api_result.hasOwnProperty(e)){
            continue;
        }
        if((api_result[e].total_given || api_result[e].total_received)){
            sorted_results.push(api_result[e]); 
        } 
    }

    // sort by the sum of amounts given and received
    sorted_results = sortTotal(sorted_results);

    // convert to currency format, comma separated without dollar sign
    for(var e in sorted_results){
        sorted_results[e].total_given = toCurrency(sorted_results[e].total_given);
        sorted_results[e].total_received = toCurrency(sorted_results[e].total_received);
    }
    
   Spice.render({
        data             : sorted_results,
        header1          : 'Political Contributions ' + '(' + query + ')',
        source_url       : "http://influenceexplorer.com/search?query=" + query,
        source_name      : 'influenceexplorer',

        template_frame   : 'list',
        template_options: {
            items: sorted_results, 
            template_item: "lobbying",
            show: 3,
            type: 'ul'
        },

        force_big_header : true,
        force_no_fold    : true,
        spice_name       : "lobbying"
    });

    // sort results in decending order using the sum of total 
    // amounts given and received
    function sortTotal(array){
        return array.sort(function(a, b){
            var x = a.total_received + a.total_given;
            var y = b.total_received + b.total_given;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    // convert from whole number to currency format
    // i.e. 1000.00 to 1,000
    function toCurrency(num){
        // returning null here filters out zero amounts
        if(num == 0)
            return null;

        var currencyNum = '';
        var wholeNum = num.toFixed(0).split('');
        var digits = wholeNum.length;
        var reverseNum = num.toFixed(0).split('').reverse().join('');

        // loop though the reversed number and add a comma at i%3
        // this gives a reversed but comma separated number
        for(var i = 0; i < digits; i++){
            if((i%3 == 0) && (i!=0)){
                currencyNum += ','+ reverseNum[i]
            } else {
                currencyNum += reverseNum[i];
            }
        }
        // reverse the number and return it
        return currencyNum.split('').reverse().join('');
    }

}

/*******************************
  Handlebars helpers
  *******************************/

// Creates a url from the name and id
Handlebars.registerHelper ('get_url', function() {
    "use strict";
    var name;
    if(this.name){
        // we need a URL with no special chars
        // and '-' in place of white space
        name = this.name.replace(/\s/gi, '-').replace(/[^\w\-]/gi, '');
    }

    return (this.type ? this.type + '/' : null ) 
            + name + '/'
            + (this.id ? this.id : null); 
});

// Return the name truncated to 25 chars
Handlebars.registerHelper('get_name', function(){
    "use strict";
    return (this.name ? (this.name.length < 30 ? this.name : this.name.substring(0,29) + ' ... ')
        : null);
});

// Return the amount given
Handlebars.registerHelper('given', function(){
    "use strict";

    return (this.total_given ? 'Given: $' + this.total_given : null);
});

// Return the amount received rounded up to nearest dollar
Handlebars.registerHelper('received', function(){
    "use strict";

    return (this.total_received ? 'Received: $' + this.total_received : null);
});