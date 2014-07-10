function ddg_spice_images(apiResult) {

    Spice.add({
        id: 'images',
        name: 'Images',

        allowMultipleCalls: true,

        data: apiResult.results,

        model: 'Image',

        meta: {
            next: apiResult.next,
            searchTerm: apiResult.query
        },

        relevancy: {
            dup: 'j'
        }
    });

}
