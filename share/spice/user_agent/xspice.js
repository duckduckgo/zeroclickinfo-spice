var ddg_spice_user_agent = function() {
    var context = window.navigator;
    context.cookies = document.cookie;
    context.referrer = document.referrer;
    context.doNotTrack = context.doNotTrack || context.msDoNotTrack;
    context.host = context.host || document.domain;

    // Display the plugin.
    Spice.render({
        data             : context,
        header1          : 'User Agent',
        source_name      : 'Wikipedia',
        source_url       : 'https://en.wikipedia.org/wiki/User_agent',
        template_normal  : 'user_agent',
        force_big_header : true
    }); 
};

ddg_spice_user_agent();