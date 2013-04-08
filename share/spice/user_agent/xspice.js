var ddg_spice_user_agent = function() {
    var context = [];
    context.push(["User Agent: ", navigator.userAgent]);
    context.push(["Vendor: ", navigator.vendor]);
    context.push(["Cookies: ", document.cookie]);
    context.push(["Referrer: ", document.referrer]);
    context.push(["Do Not Track: ", navigator.doNotTrack || navigator.msDoNotTrack]);
    context.push(["Host: ", navigator.host || document.domain]);
    context.push(["Language: ", navigator.language]);

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