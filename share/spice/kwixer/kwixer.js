
    
function ddg_spice_kwixer(api_response) {
    if (!api_response || api_response.length==0 ) return;

    var skipArray = ['movie with','movies with', 'movies starring','film with','films with','films starring','film starring','movies featuring','films featuring'];
    var finalArray = new Array();
    var itemsToInsertAtTheEnd = new Array();
    var ddg_spice_kwixer_query = DDG.get_query();
    var remainer = ddg_spice_kwixer_query.toLowerCase();
    
    for(var index in skipArray)
    {
        if(skipArray.hasOwnProperty(index))
            remainer = remainer.replace(skipArray[index],"");
    }
    remainer = remainer.replace(/^\s+|\s+$/g, '');
    var remainerArray = remainer.split(" ");
    //checks if the result is relevant.
    //if the item doesn't have an image sets the default image and puts it in the end
    //replaces large with medium images for faster loading
    for(var index in api_response)
    {
        if(api_response.hasOwnProperty(index))
        {
            var item = api_response[index];
            //item.ResourceDetails2.toLowerCase().indexOf(remainer) != -1
            //DDG.isRelevant(item.ResourceDetails2,skipArray)
            //DDG.isRelevant(remainer,skipArray)
            var isRelevant = false;
            var actors = item.ResourceDetails2.toLowerCase();
            //workaound for DDG.isRelevant
            //mainly to ignore queries like "movies featuring people" this will only check if there's a match with at least one actor 
            for (var index in remainerArray)
            {
                if(remainerArray.hasOwnProperty(index))
                {
                    //just checking if there's one match or not, the api is already intelligent enough to ignore "and" etc..
                    if(actors.indexOf( remainerArray[index]) != -1)
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
        source_url               : "https://www.kwixer.com/#/explore?category=movie&query=" + ddg_spice_kwixer_query ,
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
/* 
* replaces "large_" with "medium_" images and empty ones with a default one.
* also checks for image extensions - if image url doesn't contain an image extension replaces it with a default image
* if image doesn't end with .jpg or .png the image doesn't work for some reason through the DDG Proxy
*/
/* commented for now because we're already doing a loop before 
Handlebars.registerHelper("getMediumImage", function (image) {
    if(image && image.length > 0)
    {
       
        if( image.indexOf(".jpeg") != -1 || image.indexOf(".jpg") != -1 || image.indexOf(".png") != -1 )
            image= image.replace("large_", "medium_");
        else
            image = "https://kwix.blob.core.windows.net/icons/icon-watching-vanilla.png";
    }
    else
        image = "https://kwix.blob.core.windows.net/icons/icon-watching-vanilla.png";
    return image;
});
*/
//replaces ";" with ","
Handlebars.registerHelper("formatDetail", function (detail) {
    if(detail)
        detail = detail.replace(/;/g,", ");
    return detail;
});
