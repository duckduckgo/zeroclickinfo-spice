function ddg_spice_images(apiResult) {
    Spice.add({
        id: "images",
        name: "Images",
        allowMultipleCalls: !0,
        data: apiResult.results,
        meta: {
            next: apiResult.next,
            searchTerm: apiResult.query
        },
        relevancy: {
            dup: "j"
        }
    });
}