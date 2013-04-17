var ddg_spice_canistreamit = function(api_result) {
    Spice.render({
        data              : api_result,
        header1           : "Streaming (Can I Stream.it?)",
        force_big_head0er  : true,
        source_name       : "Can I Stream.it?",
        source_url        : "http://www.canistream.it/",
        template_normal   : "canistreamit"
    });
};

Handlebars.registerHelper("checkAffiliates", function(affiliates) {
    var hasOwn = Object.prototype.hasOwnProperty;
    
});