function ddg_spice_yoga_asanas(apiResult) {
    var numFound,
        docs,
        asanas = {};

    if (!apiResult || !apiResult.response.numFound) {
        return Spice.failed('yoga_asanas');
    }

    numFound = apiResult.response.numFound;
    docs = apiResult.response.docs;

    console.log("docs: ", docs);
    console.log("meta 0: ". docs);
    asanas = {
        id: 'yoga_asanas',
        name: 'Yoga Asanas',

        data: docs,
        templates: {
            group: 'media',
            item_detail: false,
            detail: false,
            options: {
                moreAt: true,
                footer: Spice.yoga_asanas.footer
            }
        }
    };

    console.log("asanas.data: ", asanas.data);
    console.log("order diff: ",docs[docs.length - 1].meta.order - docs[0].meta.order); 
    console.log("numFound: ", numFound);
    // if not a sequence de-dupe 
    if(!((docs[docs.length - 1].meta.order - docs[0].meta.order) == (numFound - 1))){
        asanas.relevancy = {dup: ['title', 'srcName']};
    }

    asanas.normalize =  function(a){
            var meta = a.meta;
            delete a.meta;

            return {
                image: meta.img,
                title: a.title,
                altSubtitle: a.paragraph,
                url: meta.srcUrl,
                srcName: meta.srcName,
                srcUrl: meta.srcUrl,
                srcIcon: meta.favicon
            };
        };

    Spice.add(asanas);
}
