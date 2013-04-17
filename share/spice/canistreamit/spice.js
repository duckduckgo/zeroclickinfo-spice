function ddg_spice_canistreamit(movies) {
    "use strict";
    
    // Words to skip when isRelevant is called.
    if(movies) {
        var result,
            items = [],
            hasOwn = Object.prototype.hasOwnProperty;

        for(var i = 0; i < movies.length; i++) {
            result = movies[i];

            // Make title for header
            var header = 'Watch ' + result.title + " ("+result.year+")",
                item = [],
                content = "<div><i>Starring:</i> "+result.actors+".</div>",
                streamingStr = "",
                rentalStr = "",
                streamingCount = 0,
                rentalCount = 0,
                service,
                price;

            for(var subtype in result.affiliates) {
                if(hasOwn.call(result.affiliates, subtype)) {
                    service = result.affiliates[subtype];
                    price = parseFloat(service.price);

                    if(price > 0) {
                        rentalStr += service.friendlyName.replace("Rental","");
                        rentalStr += "($"+service.price+")";
                        rentalStr += ", ";
                        rentalCount++;
                    } else {
                        streamingStr += service.friendlyName;
                        streamingStr += ", ";
                        streamingCount++;
                    }
                }
            }
            if(streamingCount > 0) {
              content += "<div><i>Streaming on</i> "+streamingStr.substring(0,streamingStr.length-2)+".</div>";
            }
            if(rentalCount > 0) {
              content += "<div><i>Rent from </i> "+rentalStr.substring(0,rentalStr.length-2)+".</div>";
            }

            item = {
                a: content,
                h: header,
                // Source name and url for the More at X link.
                s: 'CanIStream.It',
                u: result.links.shortUrl,
                // Force no compression.
                f: true,
                i: result.image
            };
            items.push(item);
        }
        // The rendering function is nra.
        nra(items);
    }
}

