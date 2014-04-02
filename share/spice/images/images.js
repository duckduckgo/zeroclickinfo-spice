function ddg_spice_images(apiResult) {

    Spice.add({
        id: 'images',
        name: 'Images',

        allowMultipleCalls: true,

        data: apiResult.results,

        meta: {
            next: apiResult.next
        }
    });

}
