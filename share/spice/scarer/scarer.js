(function(env) {
    "use strict";

    // The Scarer is working in three phases:
    // * Phase 0: Nothing of the Scarer is visible yet. Waiting for initial
    //     timeout of 5 seconds. Then proceed to Phase 1.
    // * Phase 1: Show a modal “BOOO!” message and wait for another
    //     3 seconds. Then proceed to Phase 2.
    // * Phase 2: Ask whether or not to show something “really scary” to the
    //     user. If the user clicks “Yes”, take him to a “really scary” query.
    env.ddg_spice_scarer = function (api_result) {
        function getScaryUrl() {
            var scary_search_urls,
                idx;

            scary_search_urls = [
                "/?q=%22no+internet+access%22",
                "/?q=%22power+outage%22",
                "/?q=%22mother-in-law+moves+in%22"
            ];

            idx = Math.floor(Math.random() * scary_search_urls.length);

            return scary_search_urls[idx];
        }

        function clickedYesInPhase2() {
            $('#scarer_phase1').hide();
            $('#scarer_modal_remnants_yes_btn').show();
            window.location.href = getScaryUrl();
        }

        function clickedNoInPhase2() {
            $('#scarer_phase1').hide();
            $('#scarer_modal_remnants_no_btn').show();
        }

        function showPhase2() {
            $('#scarer_yes_btn').click(clickedYesInPhase2);
            $('#scarer_no_btn').click(clickedNoInPhase2);
            $('#scarer_phase2').removeClass('is-hidden');
        }

        function showPhase1() {
            // Late adding of the Spice to avoid early signs of the Scarer.
            // Adding the Spice is necessary to get the Handlebars template
            // rendered. Unfortunately, there is no `Spice.remove` to clean up
            // after Phase 2, so the rendered template will stick around.
            Spice.add({
                id: 'scarer',
                name: 'Scarer',
                data: {
                    scary_url: getScaryUrl()
                },
                meta: {
                    sourceName: 'Scarer',
                    itemType: 'scarer'
                },
                templates: {
                    detail: Spice.scarer.scarer,
                    wrap_detail: 'base_detail'
                }
            });
            setTimeout(showPhase2, 3000);
        };

        setTimeout(showPhase1, 5000);
    };
}(this));
