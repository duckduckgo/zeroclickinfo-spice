function getQueryParams() 
{
    var script = $('[src*="/js/spice/kwixer/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/kwixer\/([^\/]*)/)[1];
    query = $.trim(decodeURIComponent(query));
    if (!query) {
        return [];
    }
    return query;
}
    
function ddg_spice_kwixer(api_response) {
    if (!api_response || api_response.length==0 ) return;

    var ddg_spice_kwixer_query = DDG.get_query();
    var ddg_spice_kwixer_server_query = getQueryParams();
    Spice.render({
        header1                  : ddg_spice_kwixer_query + ' (Kwixer)',
        source_url               : "https://www.kwixer.com/#/explore?category=movie&query=" + ddg_spice_kwixer_server_query , //TODO more at URL 
        source_name              : 'Kwixer',
        force_big_header         : true,
        force_favicon_domain     : 'www.kwixer.com',
        template_frame           : 'carousel',
        spice_name               : 'kwixer',
        template_options         : {
            template_detail          : 'kwixer_detail',
            template_item            : 'kwixer',
            items                    : api_response,
            li_height                : 155
        },
        force_no_fold            : true,
    });
}
/* 
* replaces "large_" with "medium_" images and empty ones with a default one.
* also checks for image extensions - if image url doesn't contain an image extension replaces it with a default image
* if image doesn't end with .jpg or .png the image doesn't work for some reason through the DDG Proxy
*/
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
//replaces ";" with ","
Handlebars.registerHelper("formatDetail", function (detail) {
    if(detail)
        detail = detail.replace(/;/g,", ");
    return detail;
});
