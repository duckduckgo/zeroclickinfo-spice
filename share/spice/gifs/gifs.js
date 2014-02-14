function ddg_spice_gifs(res) {
    if(!res || !res.data || !res.data.length){ return; }

    var searchTerm = DDG.get_query().replace(/gif+/i,'').trim();

    var items = res.data.map(function(item){
        return {
            h: item.images.original.url,
            j: item.images.original.url,
            u: item.url,
            ih: item.images.original.height,
            iw: item.images.original.width
        }
    });

    Spice.render({
        id: 'gifs',
        name: 'Gifs',

        data: items,

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
