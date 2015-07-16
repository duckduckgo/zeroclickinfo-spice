function ddg_spice_yoga_asanas(apiResult) {

    var numFound = apiResult.response.numFound,
		docs = apiResult.response.docs,
		i,
		d,
	    prev_title,
		prev_srcName,
		title,
		srcName,
		deDuped = [];

    if (!apiResult || !numFound) {
        return Spice.failed('yoga_asanas');
    }

	for(i = 0;i < numFound; i++){
		console.log(docs[i]);
		d = docs[i];
		title = d.title;
		srcName = d.meta.srcName;
		if( (title != prev_title) || (srcName != prev_srcName) ){
			deDuped.push(d);
		}
		prev_title = title;
		prev_srcName = srcName;
	}

	Spice.add({
		id: 'yoga_asanas',
		name: 'Yoga Asanas',

		data: deDuped,
		normalize: function(a){
			var meta = eval("(" + a.meta + ")");
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
