(function(env) {
    "use strict";
    env.ddg_spice_videos = function(apiResult) {

        if (!apiResult || !apiResult.results || !apiResult.results.length) {
            return Spice.failed('videos');
        }

        Spice.add({
            id: 'videos',
            name: 'Videos',
            allowMultipleCalls: true,
            data: apiResult.results,
            model: 'Video',
            meta: {
                next: apiResult.next,
                searchTerm: apiResult.query
            },
            templates: {
                group: 'videos'
            },
            relevancy: {
                dup: 'id'
            }
        });
    }
}(this));
