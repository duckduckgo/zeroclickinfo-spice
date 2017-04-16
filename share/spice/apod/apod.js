(function (env) {
    "use strict";
    env.ddg_spice_apod = function(api_response) {

        if (!api_response) {
            return;
        }

        //get image if it exists
        var imgRegex = /(?:href=\")(image\/.*)(?:\")/i
        if(!imgRegex.exec(api_response)){
    	    return
        }
        var img = imgRegex.exec(api_response)[1]


        //get description
        var explnIndex = api_response.indexOf("<center>", img.lastIndex)
        var htmlScrap = api_response.substr(explnIndex)
        var textExtract = htmlScrap.split("<center>")[2]
        var explanation = DDG.strip_html(textExtract.split("Explanation:")[1])

    
        //get title
        var titleRegex = /([\s\S]*)<\/center>/
        var title = DDG.strip_html(titleRegex.exec(textExtract))
        var title_short = title.split("Image")[0]
  
	var results = {image:"http://apod.nasa.gov/apod/"+img, text: explanation, title: title_short}
 
        
        Spice.add({
            id: 'apod',
            name: 'Nasa',
            data: results,
            meta: {
                sourceName: 'Nasa',
		sourceUrl: 'http://apod.nasa.gov/apod/astropix.html',
                itemType: "Images",
            },
	    normalize: function(item) {
                return {
                    image: item.image,
                    title: item.title,
                    description: item.text
                }
            },
            templates: {
		group: 'info',
            }
        });
    }
} (this));
