function ddg_spice_images(apiResult) {

    Spice.add({
        id: 'images',
        name: 'Images',

        allowMultipleAdds: true,

        data: apiResult.results,

        meta: {
            next: apiResult.next
        }
    });

}
