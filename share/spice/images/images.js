function ddg_spice_images(apiResult) {

    if (!apiResult || !apiResult.results || !apiResult.results.length) {
        return Spice.failed('images');
    }

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
            dup: 'image'
        }
    });

}
