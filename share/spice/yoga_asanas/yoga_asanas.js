function ddg_spice_yoga_asanas(apiResult) {

    if (!apiResult || !apiResult.response.numFound) {
        return Spice.failed('yoga_asanas');
    }

	for(i = 0; i < apiResult.response.numFound; i++){
		var a = apiResult.response.docs[i];
		var meta = eval("(" + a.meta + ")");
		delete a.meta;

		Spice.add({
			id: 'yoga_asanas',
			name: 'Yoga Asanas',

			data: a,
			normalize: function(x){
				return {
					image: meta.img,
					title: a.title,
					subtitle: a.paragraph
				};
			},

			meta: {
				srcName: meta.srcName,
				srcUrl: meta.srcUrl,
				srcIcon: meta.favicon
			},

			templates: {
				group: 'media',
			},
	
		});
	}
}
