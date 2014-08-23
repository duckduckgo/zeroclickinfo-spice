(function (env) {
    "use strict";
    env.ddg_spice_<: $lia_name :> = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('<: $lia_name :>');
        }
        
        // Render the response
        Spice.add({
            id: "<: $lia_name :>",
            
            // Customize these properties
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://<: $ia_domain :>/details/' + api_result.name
            },
            templates: {
                group: '<: $ia_group :>',
                options: {
                    content: Spice.<: $lia_name :>.content,
                    moreAt: true
                }
            <: $ia_rel :>
        });
    };
}(this));
