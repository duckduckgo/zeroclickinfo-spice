function ddg_spice_yoga_asanas(apiResult) {

    var numFound = apiResult.response.numFound,
        docs = apiResult.response.docs,
        i,
        seen = {},
        d,
        seen_key,
        deDuped = [];

    if (!apiResult || !numFound) {
        return Spice.failed('yoga_asanas');
    }

    //de-dupe by default
    for(i = 0;i < numFound; i++){
        d = docs[i];
        d.meta = eval("(" + d.meta + ")");
        seen_key = d.title + d.meta.srcName;
        if(seen_key in seen){
            continue;
        }
        else{
            deDuped.push(d);
            seen[seen_key] = true;
        }
    }

    // unde-dupe if it's a sequence
    if( (docs[docs.length - 1].meta.order - docs[0].meta.order) == (numFound - 1) ){
        deDuped = docs;
    }

    Spice.add({
        id: 'yoga_asanas',
        name: 'Yoga Asanas',

        data: deDuped,
        normalize: function(a){
            var meta = a.meta;
            delete a.meta;

            return {
                image: meta.img,
                title: a.title,
                altSubtitle: a.paragraph,
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
        },

    });
}
