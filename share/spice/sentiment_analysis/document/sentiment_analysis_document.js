(function(env) {
    "use strict";
    env.ddg_spice_sentiment_analysis = {

        path: "/js/spice/sentiment_analysis",
        id: "sentiment_analysis",
        item: null,
        results: [],

        document: function(api_result) {
	    $.getScript(this.path+'/entities/'+ encodeURIComponent(api_result.url));

    	    //Adds Document Analysis data to the object to be passed to the frontend
	    var obj = {};
	    obj.title = 'Document Analysis';
	    obj.sentiment = api_result.docSentiment.type;
	    obj.score = api_result.docSentiment.score;
	    obj.url = api_result.url;
	    this.results.push(obj);
        },

	//Adds Entity Analysis to object that will be passed to the frontend
	entities: function(api_result) {
	    var self = this;

	    api_result.entities.forEach(function(entity){
	        var obj = {}
	        obj.title = entity.text;
     	        obj.sentiment = 'Relevance: '+entity.relevance;
	        obj.score = 'Type: '+entity.type;
	    
	        //If URL for more info about entity exists, add to object
	        entity.disambiguated && entity.disambiguated.dbpedia && (obj.url = entity.disambiguated.dbpedia);
	        self.results.push(obj);
	    });

	    this.render(this.results);
        },
    
        render: function(api_result) {
            Spice.add({
                id: 'sentiment_analysis',
                name: 'Answer',
                data: api_result,
                normalize: function(item) {
                    return {
		        title: item.title,
		        description: item.score,
                        subtitle: item.sentiment,
		        url: item.url
                    };
                },
                templates: {
                    group: 'icon',
		    detail: false,
		    item_detail: false,
                    options: {
                        moreAt: false
                    }
                },
	        onShow: function(item) {
		    //if there are Entities, add label to separate Document result from Entities results
		    var label_html_singular = '<span class="metabar__item-type" style="margin-left: 30px;"><b>Entity:</b></span>';
		    var label_html_plural = '<span class="metabar__item-type" style="margin-left: 30px;"><b>Entites:</b></span>';
		    if(api_result.length == 2) {
		        $('.tile.tile--c.tile--sentiment_analysis:first').after(label_html_singular);
		    } else if (api_result.length > 2) {
		        $('.tile.tile--c.tile--sentiment_analysis:first').after(label_html_plural);
		    }
	        }
	    });
       }
    }

    env.ddg_spice_sentiment_analysis_document = ddg_spice_sentiment_analysis.document.bind(ddg_spice_sentiment_analysis);
    env.ddg_spice_sentiment_analysis_entities = ddg_spice_sentiment_analysis.entities.bind(ddg_spice_sentiment_analysis);

}(this));
