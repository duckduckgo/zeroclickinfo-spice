function ddg_spice_lobbying(api_result) {
    "use strict";

    if (!api_result || api_result.length === 0) {
        return;
    }

    // Number of results to display
    var displayResults = 3;

    // to hold the data sorted in decending order
    var sorted_results = [];

    // get the query to display in the IA header
    var script = $('[src*="/js/spice/lobbying"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/lobbying\/([^\/]+)/)[1];
    query = decodeURIComponent(query);

   Spice.render({
        header1          : 'Political Contributions ' + '(' + query + ')',
        template_normal  : 'lobbying',
        source_url       : "http://influenceexplorer.com/search?query=" + query,
        source_name      : 'Influence Explorer',
        force_big_header : true,
        force_no_fold    : true
    });

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
        sorted_results[e].non_firm_spending = toCurrency(sorted_results[e].non_firm_spending);
    }
    
    var n = 0;
    for(e in sorted_results){
        // show the first n results
        if( n < displayResults){
            $('#lobbying_table tbody').append('<tr>'
                + '<td>' + getName(sorted_results[e]) + '</td>' 
                + '<td class="lobbying_type">' + getType(sorted_results[e]) + '</td>'
                + '<td>' + amtGiven(sorted_results[e]) + '</td>' 
                + '<td class="lobbying_amt">' + amtLobby(sorted_results[e]) + '</td>' 
                + '<td>' + amtRecv(sorted_results[e]) + '</td>'
                + '</tr>');
        }
        // more results button
        else if(n == displayResults && sorted_results.length > (displayResults+1)){
            $('#lobbying_table tbody').append("<tr class='moreRows'><td><a href=''>"
                + (sorted_results.length-(displayResults+1)) + " more " + '</a>...</td></tr>');
        }
        // the rest in hidden rows
        else{
                $('#lobbying_table tbody').append('<tr class="hiddenRows">'
                + '<td>' + getName(sorted_results[e]) + '</td>' 
                + '<td class="lobbying_type">' + getType(sorted_results[e]) + '</td>'               
                + '<td>' + amtGiven(sorted_results[e]) + '</td>' 
                + '<td class="lobbying_amt">' + amtLobby(sorted_results[e]) + '</td>' 
                + '<td>' + amtRecv(sorted_results[e]) + '</td>'
                + '</tr>');
        }
        n+=1;
    }

/**** helper functions *******/

    // click handler to show additional rows
    $('.moreRows').click(function(e){
        e.preventDefault();
        $('.moreRows').hide();
        $('.hiddenRows').show();
    });

    // Return the name truncated to 25 chars formatted as a link
    function getName(e){
        var name = (e.name ? (e.name.length < 30 ? e.name : e.name.substring(0,29) + ' ... ')
            : null);
        // we need a URL with no special chars
        // and '-' in place of white space
        var urlName = e.name.replace(/\s/gi, '-').replace(/[^\w\-]/gi, '');

        // form the url: link to exact page if we have the type and id
        // otherwise just link to the query page using the name field
        var url = (e.name ? "http://influenceexplorer.com/" 
            + (e.type ? e.type + "/" : "search?query=")
            + urlName+'/'
            + (e.id ? e.id : '') : null);
        return '<a href='+url+'>'+name+'</a>';
    }

    // Return the spent on lobbying
    function amtLobby(e){
        return (e.non_firm_spending ? '$' + e.non_firm_spending : '&ndash;');
    }

    // Return the amount given
    function amtGiven(e){
        return (e.total_given ? '$' + e.total_given : '&ndash;');
    }

    // Return the amount given
    function amtRecv(e){
        return (e.total_received ? '$' + e.total_received : '&ndash;');
    }

    // Return the type
    function getType(e){
        return (e.type ? e.type : '&ndash;');
    }

    // convert from whole number to currency format
    // i.e. 1000.00 to 1,000
    function toCurrency(num){
        if(num == 0){
            return null;
        }

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

    // sort results in decending order using the sum of total 
    // amounts given and received
    function sortTotal(array){
        return array.sort(function(a, b){
            var x = a.total_received + a.total_given + a.non_firm_spending;
            var y = b.total_received + b.total_given + b.non_firm_spending;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
}