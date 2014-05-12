(function (env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_response) {

    if (!api_response) {
        return;
    }
    
    // Extract our query	
    var script = $('[src*="/js/spice/today_in_history/"]')[0],
    source = $(script).attr('src'),
    query = source.match(/today_in_history\/([^\/]+)/)[1];
    query = query.replace("_", " ");    
    // Removes invalid entries from sentence array
    Array.prototype.clean = function() {
        for (var i = 0; i < this.length; i++) {
            if (!this[i] || this[i].contains("<!--")) {         
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
 
    var item = $( $.parseXML(api_response) ).find('extract');
    var clean_array = item.text().split("== Events ==")[1].split("== Births ==")[0].split("\n").clean();
    //  This is the same as extracting the text blob like:    	
    //  var temp_a = item.text().split("== Events ==");
    //  var temp_b = temp_a[1].split("== Births ==");
    //  var temp_c = temp_b[0].split("\n");	
    //  var clean_array = temp_c.clean();


    // The number of array to contain data
    var	numPod = Math.ceil(clean_array.length/5);	

    // The number of objects in each array
    var podItems = Math.floor(clean_array.length/numPod);

    // Check and see if we have some data left over
    var remainder = clean_array.length % numPod;

    // Total number of objects in our pods
    var elements = numPod * podItems;

    // Initialize variables and fit objects into arrays (pods)
    var temp;	//temp array to hold year and string values (delimited by -)
    var array = [];
    var pod = 0, podObject = 0;
    array[0] = [];
    for (var i = 0; i < elements; i++) {
        temp = clean_array[i].split(" – ");
	array[pod][podObject] = {year:temp[0], str:temp.slice(1)};
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
        for(var num = elements; num < clean_array.length; num++) {
            temp = clean_array[num].split("–");
            array[numPod][podObject] = {year:temp[0], str:temp.slice(1)};
	    podObject++;
    	}
        array[numPod][podObject] = {range:array[numPod][0].year+" - "+temp[0]};
    } else {
	array.splice((array.length-1),1);
    }

    Spice.add({
            id: "today_in_history",
            name: "Today In History",
            data: array,
            meta: {
		itemType: "Timelines",
                sourceUrl: 'http://en.wikipedia.org/wiki/'+ query,
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
