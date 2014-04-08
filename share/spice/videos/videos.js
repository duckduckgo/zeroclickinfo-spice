function ddg_spice_videos(apiResult) {

    Spice.add({
        id: 'videos',
        name: 'Videos',

        allowMultipleCalls: true,

        data: apiResult.results,

        meta: {
            next: apiResult.next
        },

        relevancy: {
            dup: 'id'
        }
    });

}
