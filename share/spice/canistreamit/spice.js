function ddg_spice_canistreamit(movies) {
    "use strict";
    
    // Words to skip when isRelevant is called.
    if(movies && movies.length >= 1 && DDG.isRelevant(movies[0].title, skip)) {
        var result,img,snippet,link,div;
        var items = new Array();
        for(var i = 0; i < movies.length; i++) {
            result = movies[i];

            // Make title for header
            var header = 'Watch ' + result.title + " ("+result.year+")";

            var item = new Array();
            var content = "<div><i>Starring:</i> "+result.actors+".</div>";
            var streamingStr = "";
            var rentalStr = "";
            var streamingCount = 0;
            var rentalCount = 0;
            for(var subtype in result.affiliates)
            {
                var service = result.affiliates[subtype];
                var price = parseFloat(service.price);
                if(price > 0)
                {
                    rentalStr += service.friendlyName.replace("Rental","");
                    rentalStr += "($"+service.price+")";
                    rentalStr += ", ";
                    rentalCount++;
                }
                else
                {
                    streamingStr += service.friendlyName;
                    streamingStr += ", ";
                    streamingCount++;
                }
            }
            if(streamingCount > 0)
            {
              content += "<div><i>Streaming on</i> "+streamingStr.substring(0,streamingStr.length-2)+".</div>";
            }
            if(rentalCount > 0)
            {
              content += "<div><i>Rent from </i> "+rentalStr.substring(0,rentalStr.length-2)+".</div>";
            }


            item['a'] = content;

            item['h'] = header;

            // Source name and url for the More at X link.
            item['s'] = 'CanIStream.It';
            item['u'] = result.links.shortUrl;

            // Force no compression.
            item['f'] = 1;

            // Thumbnail url
            item['i'] = result.image;

            items.push(item);

        }
        // The rendering function is nra.
        nra(items);
    }
}

