function ddg_spice_yoga_asanas(apiResult) {

    if (!apiResult || !apiResult.response.numFound) {
        return Spice.failed('yoga_asanas');
    }

	Spice.add({
		id: 'yoga_asanas',
		name: 'Yoga Asanas',

		data: apiResult.response.docs,
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
