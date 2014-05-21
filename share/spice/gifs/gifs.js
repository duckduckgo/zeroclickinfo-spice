function ddg_spice_gifs(res) {
    if(!res || !res.data || !res.data.length){ return; }

    var searchTerm = DDG.get_query().replace(/gifs?/i,'').trim();

    Spice.add({
        id: 'gifs',
        name: 'Gifs',

        data: res.data,
	normalize: function(item) {
	    return {
		h: item.images.original.url,
		j: item.images.original.url,
		u: item.url,
		ih: item.images.original.height,
		iw: item.images.original.width
	    };
	},
        meta: {
            sourceName: 'Giphy',
            sourceUrl: 'http://giphy.com/search/' + searchTerm,
            sourceIcon: true,
            count: res.pagination.count,
            total: res.pagination.total_count,
            itemType: 'Gifs'
        },

        view: 'Images'
    });
} 
