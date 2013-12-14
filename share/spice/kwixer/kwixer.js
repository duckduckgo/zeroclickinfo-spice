var ddg_spice_kwixer_carousel_add_items;
var ddg_spice_kwixer_single_item;
var ddg_spice_kwixer_query;
var ddg_spice_kwixer_server_query;
function ddg_spice_kwixer_test_queries()
{
    var tests = ['movie Skyfall','film with tom cruise','films with tom cruise',
    'movies with tom cruise','movies with tom cruise and Kate',
    'movies tom cruise and Kate','film starring tom cruise',
    'films starring tom cruise and kate','movies starring tom cruise and Kate',
    'movies directed Steven','movies directed by Steven',
    'director Steven', 'film director Steven','film by Steven','films by Steven','films directed by Steven',
    'actress Kate','actor tom cruise','tom cruise actor',
    'Keira Knightley actress','James Bond films',
    'James Bond movies','Skyfall movie','Skyfall film'];
    var expectedResults = [
    'Skyfall','tom cruise','tom cruise','tom cruise',
    'tom cruise and Kate','tom cruise and Kate',
    'tom cruise','tom cruise and kate','tom cruise and Kate',
    'Steven','Steven','Steven','Steven','Steven','Steven','Steven',
    'Kate','tom cruise','tom cruise','Keira Knightley',
    'James Bond','James Bond','Skyfall','Skyfall'];
    
    for (var i=0;i<tests.length;i++)
    { 
        if( ddg_spice_kwixer_getQuery(tests[i]) != expectedResults[i])
        {
            console.log("Test nb " + i + " failed for " + tests[i] + " : expected " 
                + expectedResults[i] + " but got " + ddg_spice_kwixer_getQuery(tests[i]));
        }
        else
            console.log("test succeeded: " + tests[i] + " - " + expectedResults[i]);
    }

}
function ddg_spice_kwixer_getQuery(ddgQuery)
{
    var result = ddgQuery;
    var searchEndTriggers = ['actor','actress','movies','films','movie','film'];
    var searchStartTriggers = ['films starring','film starring','movies with', 'movies starring',
    'movies directed by','movies directed', 'directed movies',
    'film with','films with','movie with',
    'film director','film by',
    'films by','films directed by',
    'movies','movie',
    'director',
    'actor','actress' ,
    'kwixer'];

    var needToCheckForStart = true;
    for (var index=0;index<searchEndTriggers.length;index++)
    {
        var str = " " + searchEndTriggers[index];
        var lastIndexOfTrigger= result.lastIndexOf(str);
        if(lastIndexOfTrigger == result.length - str.length)
        {
            result = result.substring(0, lastIndexOfTrigger);
            needToCheckForStart = false;
            break;//no need to continue since triggered by one of the items
        }
    }
    if(needToCheckForStart)
    {
        for (var index=0;index<searchStartTriggers.length;index++)
        {
            var str = searchStartTriggers[index] + " ";
            if(result.indexOf(str) == 0)
            {
                result = result.replace(str ,"");
                break;
            }
        }
    }
    return result;
}

function ddg_spice_kwixer(api_response) {
    if (!api_response || api_response.length==0 ) return;

    //api_response = api_response.slice(0,1);
    ddg_spice_kwixer_query = DDG.get_query();
    ddg_spice_kwixer_server_query = ddg_spice_kwixer_getQuery(ddg_spice_kwixer_query);
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
