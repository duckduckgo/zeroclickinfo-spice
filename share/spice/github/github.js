function ddg_spice_github(api_result) {
    var query = DDG.get_query()
                .replace(/^\s*github\s+/, "");

    var results = api_result.data.repositories;
    if (results.length == 0) return;

    Spice.render({
        data             : api_result,
        header1          : query + " (GitHub)",
        source_url       : 'http://www.github.com/search?q='
                            + encodeURIComponent(query),
        source_name      : 'GitHub',
        template_normal  : (results.length == 1 ? 'github' : 'github_list'),
        force_big_header : true,
        force_no_fold    : true
    });

    $("#gh_showHide").click(function(){
        $("#gh_more_results").toggle();
    });
}


// Make sure we display only three items.
Handlebars.registerHelper("last_pushed", function(){

    var last_pushed = Math.floor((new Date() - new Date(this.pushed)) / (1000*60*60*24));

    var years_ago = Math.floor(last_pushed / 365);
    if (years_ago >= 1) {
        last_pushed = years_ago + " year" + (years_ago == 1 ? "" : "s") + " ago";
    } else if (last_pushed == 0) {
        last_pushed = "today";
    } else if (last_pushed == 1) {
        last_pushed = "yesterday";
    } else {
        last_pushed = last_pushed + " day" + (last_pushed == 1 ? "" : "s") + " ago";
    }

    return last_pushed;
});