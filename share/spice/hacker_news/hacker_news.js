function ddg_spice_hacker_news(api_result) {

    // Check for at least 1 result
    if (!api_result.results.length) return;

    var query = DDG.get_query().replace(/\bhn\b|\bhacker news\b/, "").trim();

    Spice.render({
        data:               api_result,
        header1 :           "Hacker News",
        source_url :        "http://www.hnsearch.com/search#request/all&q=" + query,
        source_name :       "Hacker News",
        template_normal :   "hacker_news",
        force_big_header :  true
    });

    // Add click event.
    $("a.hn_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
}


// creates an anchor linking to a result's commments
Handlebars.registerHelper("organizeResults", function(options) {
    "use strict";

    var topStories = [],
        topComments = [],
        otherStories = [],
        result;

    function isStory (r) {
        return (r.type === "submission");
    }

    // Adds result to appropriate list
    function addResult (result) {
        var location;

        if ( isStory(result) ) {
            location = (topStories.length < 3) ? topStories : otherStories;
        } else {
            location = topComments;
        }

        location.push(result);
    };

    // checks if we can use this result given its type
    // and the number of results we already have
    function canUse (result) {

        if ( isStory(result) ) {
            return (otherStories.length < 3 || topStories.length < 3);
        } else {
            return (topComments.length < 3);
        }
    };

    // checks if we've filled all 3 result lists
    function isFull () {
        return (topStories.length == 3 &&
                otherStories.length == 3 &&
                topComments.length == 3);
    };

    for (var i = 0; i < this.results.length; i++) {

        result = this.results[i].item;

        // Check if result is needed and
        // appends to correct list
        if ( canUse(result) ) {
            addResult(result);
        }

        if ( isFull() ) break;
    }

    // Invoke context of template with hn object as context.
    return options.fn({
        topStories : topStories,
        topComments : topComments,
        otherStories : otherStories
    });
});