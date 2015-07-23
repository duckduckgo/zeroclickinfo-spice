
function ddg_spice_yoga_asanas(apiResult) {

    if (!apiResult || !apiResult.response.numFound) {
        return Spice.failed('yoga_asanas');
    }

    var docs = apiResult.response.docs,
        first = JSON.parse(docs[0].meta).order,
        last = JSON.parse(docs[docs.length - 1].meta).order,
        asanas = {
            id: 'yoga_asanas',
            name: 'Yoga Asanas',
            data: docs,
            normalize: function(item){
                var meta = JSON.parse(item.meta);
                // if not deleted will break "More at" links
                delete item.meta;

                return {
                    image: meta.img,
                    altSubtitle: item.paragraph,
                    url: meta.srcUrl,
                    srcName: meta.srcName,
                    srcUrl: meta.srcUrl,
                    srcIcon: meta.favicon
                };
            },
            templates: {
                group: 'media',
                item_detail: false,
                detail: false,
                options: {
                    moreAt: false,
                    footer: Spice.yoga_asanas.footer
                }
            }
        };

    // if not a sequence de-dupe
    if( (last - first) !== (apiResult.response.numFound - 1) ){
        asanas.relevancy = { dup: ['title', 'srcName'] };
    }

    Spice.add(asanas);
}
