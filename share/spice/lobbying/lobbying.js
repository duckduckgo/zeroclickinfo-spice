function ddg_spice_lobbying(api_result) {
    "use strict";

    if (!api_result || api_result.length === 0) {
        return;
    }

    var sorted_results = [];

    var query = DDG.get_query()
        .replace(/\s(lobbying|contribution[s]|campaign finance|campaign contribution[s]|lobbyist)/, '');

    /* get rid of entries in the api result that don't contain
        an amount spent or received.  */
    for(var e in api_result){
        //make sure we don't look at _proto_ objects
        if(!api_result.hasOwnProperty(e)){
            continue;
        }
        if((api_result[e].total_given || api_result[e].total_received))
            sorted_results.push(api_result[e]);  
    }

    // sort by sum of amounts given and received
    sorted_results = sortTotal(sorted_results);
    
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



    // sort results by sum or total given and received
    function sortTotal(array){
        return array.sort(function(a, b){
            var x = a.total_received + a.total_given;
            var y = b.total_received + b.total_given;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
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

// Return the contribution amounts
Handlebars.registerHelper('given', function(){
    "use strict";
    return (this.total_given ? 'Given: $' + this.total_given.toFixed(0) 
        + (this.total_received ? ',' : '') : null);
});

// Return the contribution amounts
Handlebars.registerHelper('received', function(){
    "use strict";
    return (this.total_received ? 'Received: $' + this.total_received.toFixed(0) : null);
});