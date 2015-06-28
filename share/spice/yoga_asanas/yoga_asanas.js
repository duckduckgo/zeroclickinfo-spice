function ddg_spice_yoga_asanas(apiResult) {

    if (!apiResult || !apiResult.response.result.numFound) {
        return Spice.failed('yoga_asanas');
    }

	for(i = 0; i < apiResult.response.result.length; i++){
		var a = apiResult.response.result[i];
		Spice.add({
			id: 'yoga_asanas',
			name: 'Yoga Asanas',

			data: a,
			normalize: function(x){
				return {
					image: a.meta.img,
					title: a.title,
					subtitle: a.paragraph
				};
			},

			meta: {
				srcName: a.meta.srcName,
				srcUrl: a.meta.srcUrl,
				srcIcon: a.meta.favicon
			},

			templates: {
				group: 'media'
			},
	
		});
	}
}
