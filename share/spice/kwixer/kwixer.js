
    
function ddg_spice_kwixer(api_response) {
    if (!api_response || api_response.length==0 ) return;

    var skipArray = ['movie with','movies with', 'movies starring','film with','films with','films starring','film starring','movies featuring','films featuring','movies with the',' the '];
    var finalArray = [];
    var itemsToInsertAtTheEnd = [];
    var ddg_spice_kwixer_query = DDG.get_query();
    var remainder = ddg_spice_kwixer_query.toLowerCase();
    
    for(var index in skipArray)
    {
        if(skipArray.hasOwnProperty(index))
            remainder = remainder.replace(skipArray[index],"");
    }
    remainder = remainder.replace(/^\s+|\s+$/g, '');

    if(remainder.length <= 2)
        return;

    var remainderArray = remainder.split(" ");
    //checks if the result is relevant.
    //if the item doesn't have an image sets the default image and puts it in the end
    //replaces large with medium images for faster loading
    for(var index in api_response)
    {
        if(api_response.hasOwnProperty(index))
        {
            var item = api_response[index];
            var isRelevant = false;
            var actors = item.ResourceDetails2.toLowerCase();
            //workaound for DDG.isRelevant
            //mainly to ignore queries like "movies featuring people" this will only check if there's a match with at least one actor
            var actorArray = actors.split(";"); 
            
            /*
            for (var index in actorArray) {
                if(actorArray.hasOwnProperty(index)) {    
                    if(DDG.isRelevant(actorArray[index], ['movies', 'with','starring','film','films','featuring'], 4, true)) {
                        isRelevant = true;
                        break;
                    }
                }
            }
            */
            
            for (var index in remainderArray)
            {
                if(remainderArray.hasOwnProperty(index))
                {
                    //just checking if there's one match or not, the api is already intelligent enough to ignore "and" etc..
                    //we need to match actors for now, because the API's default search searches also by general context.
                    if(actors.indexOf( remainderArray[index]) != -1)
                    {
                        isRelevant = true;
                        break;
                    }
                }
            }
            
            if(isRelevant)
            {
                if(!item.ResourceImageUrl || item.ResourceImageUrl.length == 0 || (item.ResourceImageUrl.indexOf(".jpeg") == -1 && item.ResourceImageUrl.indexOf(".jpg") == -1 && item.ResourceImageUrl.indexOf(".png") == -1))
                {
                    item.ResourceImageUrl= "https://kwix.blob.core.windows.net/icons/icon-watching-vanilla.png";
                    itemsToInsertAtTheEnd.push(item);
                }
                else
                {
                    item.ResourceImageUrl = item.ResourceImageUrl.replace("large_", "medium_");
                    finalArray.push(item);
                }
            }
        }
    }
    if(itemsToInsertAtTheEnd.length > 0)
    {
        finalArray = finalArray.concat(itemsToInsertAtTheEnd);
    }

    if (!finalArray || finalArray.length==0 ) return;

    Spice.render({
        header1                  : ddg_spice_kwixer_query + ' (Kwixer)',
        source_url               : "https://www.kwixer.com/#/explore?category=movie&query=" + DDG.get_query_encoded() ,
        source_name              : 'Kwixer',
        force_big_header         : true,
        force_favicon_domain     : 'www.kwixer.com',
        template_frame           : 'carousel',
        spice_name               : 'kwixer',
        template_options         : {
            template_detail          : 'kwixer_detail',
            template_item            : 'kwixer',
            items                    : finalArray,
            li_height                : 155
        },
        force_no_fold            : true
    });
}

Handlebars.registerHelper("formatDetail", function (detail) {
    if(detail)
        detail = detail.replace(/;/g,", ");
    return detail;
});
