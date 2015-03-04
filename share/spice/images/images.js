Spice.images = {

    id: 'images',
    name: 'Images',
    allowMultipleCalls: true,
    model: 'Image',
    relevancy: {
        dup: 'j'
    },

    isValidResponse: function(res) {
        return res && res.results && res.results.length;
    },

    onResponse: function(res) {
        return {
            data: res.results,
            meta: {
                next: res.next,
                searchTerm: res.query
            }
        };
    }
}
