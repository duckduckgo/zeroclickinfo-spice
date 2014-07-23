function ddg_spice_videos(apiResult) {

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

        relevancy: {
            dup: 'id'
        }
    });

}
