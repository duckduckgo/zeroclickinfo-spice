var ddg_spice_kwixer_carousel_add_items;
var ddg_spice_kwixer_single_item;
var ddg_spice_kwixer_query;
var ddg_spice_kwixer_server_query;
function ddg_spice_kwixer(api_response) {
    if (!api_response || api_response.length==0 ) return;

    //api_response = api_response.slice(0,1);
    ddg_spice_kwixer_query = DDG.get_query();
    ddg_spice_kwixer_server_query = ddg_spice_kwixer_query;
    var searchEndTriggers = ['actor','actress','movies','films','movie','film'];
    var searchStartTriggers = ['films starring','film starring','movies with', 'movies starring',
    'movies directed by','movies directed', 'directed movies',
    'film with','films with','movie with',
    'film director','film by',
    'movies','movie',
    'director',
    'actor','actress' ,
    'kwixer'];

    var needToCheckForStart = true;
    for(var index in searchEndTriggers)
    {
        var str = " " + searchEndTriggers[index];
        var lastIndexOfTrigger= ddg_spice_kwixer_server_query.lastIndexOf(str);
        if(lastIndexOfTrigger == ddg_spice_kwixer_server_query.length - str.length)
        {
            ddg_spice_kwixer_server_query = ddg_spice_kwixer_server_query.substring(0, lastIndexOfTrigger);
            needToCheckForStart = false;
            break;//no need to continue since triggered by one of the items
        }
    }
    if(needToCheckForStart)
    {
        for(var index in searchStartTriggers)
        {
            var str = searchStartTriggers[index] + " ";
            if(ddg_spice_kwixer_server_query.indexOf(str) == 0)
            {
                ddg_spice_kwixer_server_query = ddg_spice_kwixer_server_query.replace(str ,"");
                break;
            }
        }
    }
    
    //set default image if empty
    //fixed here so no test needed on the handlebar template
    for(var index in api_response)
    {
        var item = api_response[index];
        if(!item.ResourceImageUrl || item.ResourceImageUrl.length == 0)
            item.ResourceImageUrl = "https://kwix.blob.core.windows.net/icons/icon-watching-vanilla.png";
        else
            item.ResourceImageUrl = item.ResourceImageUrl.replace("large_","medium_");
        if(item.ResourceDetails2)
            item.ResourceDetails2 = item.ResourceDetails2.replace(/;/g,", ");
        if(item.ResourceGenre)
            item.ResourceGenre = item.ResourceGenre.replace(/;/g,", ");
    }


    ddg_spice_kwixer_carousel_add_items =
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
                li_height                : 130
            },
            force_no_fold            : true,
            //item_callback            : spotlight_resize,
        });
}
