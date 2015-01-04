(function (env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_response) {

    if (!api_response) {
        return Spice.failed('today_in_history');
    }
    
    // Extract our query	
    var script = $('[src*="/js/spice/today_in_history/"]')[0],
    source = $(script).attr('src'),
    ourquery = source.match(/today_in_history\/([^\/]+)/)[1];
    ourquery = ourquery.replace("_", " ");    
    
    // Extract data
    var item
    for (var key in api_response.query.pages) {
        if (api_response.query.pages[key].hasOwnProperty("extract"))
                item = api_response.query.pages[key].extract;
    }

    if(!item) {
        return Spice.failed('today_in_history');
    }

    var data_array = item.split("== Events ==\n")[1].split("\n\n\n== Births ==\n")[0].split("\n");
    //  This is the same as extracting the text blob like:    	
    //  var temp_a = item.text().split("== Events ==");
    //  var temp_b = temp_a[1].split("== Births ==");
    //  var temp_c = temp_b[0].split("\n");	
    //  var data_array = temp_c;


    // The number of array to contain data
    var numPod = Math.ceil(data_array.length/5);	

    // The number of objects in each array
    var podItems = Math.floor(data_array.length/numPod);

    // Check and see if we have some data left over
    var remainder = data_array.length % numPod;

    // Total number of objects in our pods
    var elements = numPod * podItems;

    // Initialize variables and fit objects into arrays (pods)
    var temp;	//temp array to hold year and string values (delimited by -)
    var array = [];
    var pod = 0, podObject = 0;
    array[0] = [];
    for (var i = 0; i < elements; i++) {
        temp = data_array[i].split(" – ");
        array[pod][podObject] = {year:temp[0], str:(temp.slice(1)).join(" ")};
        podObject++;
        if((i+1) % podItems == 0) {
            array[pod][podObject] = {range:array[pod][0].year+" - "+temp[0]};
            podObject = 0;
            pod++;
            array[pod] = [];
        }
    }

    // If we have some leftover objects, create another pod and put remaining objects in it
    if (remainder != 0) {
        var podObject = 0;
        array[numPod] = [];
        for(var num = elements; num < data_array.length; num++) {
            temp = data_array[num].split("–");
            array[numPod][podObject] = {year:temp[0], str:(temp.slice(1)).join(" ")};
            podObject++;
        }
        array[numPod][podObject] = {range:array[numPod][0].year+" - "+temp[0]};
    } else {
        array.splice((array.length-1),1);
    }

    Spice.add({
            id: "today_in_history",
            name: "History Today ("+ ourquery+")",
            data: array,
            meta: {
                itemType: "Timelines",
                sourceUrl: 'http://en.wikipedia.org/wiki/'+ ourquery,
                sourceName: 'Wikipedia'
            },
            templates: {
                group: 'base',
                detail: Spice.today_in_history.details,
                options: {
                    content: Spice.today_in_history.content
                }
            },
        });

    }

    // Return range values
    Handlebars.registerHelper('fetchrange', function(arr) {
        return new Handlebars.SafeString(arr[arr.length-1].range);
    });
} (this));

