(function (env) {
    "use strict";
    env.ddg_spice_arrow = function(api_result){

        if (!api_result || !api_result.itemserviceresult || api_result.itemserviceresult.transactionArea[0].response.success !== true) {
            return Spice.failed('arrow');
        }
        
        var partResults = [], //results holder
            searchLink = api_result.itemserviceresult.data[0].resources[0].uri, //pull out the searchLink
            totalItems = api_result.itemserviceresult.transactionArea[0].responseSequence.totalItems, //get all the items that can be found
            displayItems = api_result.itemserviceresult.data[0].PartList, //these are items available to display
            numDisplay = displayItems.length; //how many of thse will we have
        
        //lets process all the items
        if(displayItems.length > 0){
			 for (var i = 0; i < displayItems.length; i++) {
                 
             	var item = displayItems[i],
                 	leastPrice=999999999,  //store some pseudo globals
            		maxQty=0,
                    //ideally we will use the partLink from the one with greatest quantity
                	//or first link we encounter
					partLink='', 
                    //each item can have multiple sources and within each source there could be
                    //multiple versions of a part - even though they are considered the same part
                    //ie. different packaging
                	pricingSources = item.InvOrg.sources; 
                 
                if(pricingSources.length > 0){
                    
                    //we iterate through all the sources
                    for(var j = 0; j < pricingSources.length; j++){
						var source = pricingSources[j],
                            sourceParts = source.sourceParts;
                        
                        //naive version - we wont handle tiered pricing
                        if(sourceParts.length > 0){
                            //iterate through all the source parts
                            for(var k=0; k < sourceParts.length; k++){
                                var sp = sourceParts[k],
                                    currPrice = sp.Prices.resaleList[0].price;
								
                                //do an exhaustive search for least price
                                if(currPrice >0 && currPrice < leastPrice){
                                    leastPrice = currPrice;
                                }
                                
                                //find the max quantity available
                                if(sp.Availability[0].fohQty > maxQty){
									maxQty = sp.Availability[0].fohQty;
                                    
                                    //find the partlink
                                    if(sp.resources.length > 0){
										for(var r1=0; r1 < sp.resources.length; r1++){
                                            var ttype = sp.resources[r1].type;
                                            if(ttype==='detail'){
												partLink=sp.resources[r1].uri;
                                                break;
                                            }
                                        }
                                    }
                                }
                            } //end sourceParts loop
                        } //end no sourceParts
                    } //end source loop
                } //end no pricingSources 
                
                //put a link just in case
                if(partLink===''){
                  	partLink = searchLink;
                }
                
                //could not find pricing
                if(leastPrice===999999999){
                    leastPrice=0.0;
                }
                 
                //if the price is 0, lets not display anything
                var displayPrice='';
                
                //USD is now forced
                //is this $ sign safe?
                if(leastPrice > 0.0){
                    displayPrice='$'+leastPrice.toFixed(4);
                }
                
                //return null if no img
                var imgLink=null,
                    datasheetLink='';
                 
                //find the image + datasheet links
                if(item.resources.length > 0){
                     for(var r2=0; r2 < item.resources.length; r2++){
                         var ttype = item.resources[r2].type;
                         if(ttype==='original_datasheet'){
                             datasheetLink=item.resources[r2].uri;
                         }else if(ttype==='img_lg'){
						 	imgLink=item.resources[r2].uri;
                             //hack for spaces in the img url
                            imgLink = imgLink.replace(/\s/g, '%20');
                         }
                     }
                 }
                 
                //we dont use the normalize, since we pretty much process the js already
                var part={
                    partNum:item.partNum,
                    brand:item.manufacturer.mfrName,
                    description: item.desc,
                    price: displayPrice,
                    qty: maxQty,
                    title: DDG.strip_html(item.partNum).toUpperCase(),
                    heading: DDG.strip_html(item.partNum).toUpperCase(),
                    url: partLink,
                    img: imgLink,
                    img_m: imgLink,
                    datasheet: datasheetLink
                };
                 
                partResults.push(part);
             }
        }
        
        //add to the Spice
        Spice.add({
            id: "arrow",
            name: "Arrow Parts",
            data: partResults,
            signal: 'high',
            meta: {
                itemType: "Parts",
                sourceName: "parts.arrow.com",
                sourceUrl: searchLink
            },
            relevancy: {
                skip_words: ['arrow', 'part'],
                primary: [{
                    key: 'partNum',
                    strict: true
                }]
            },
            templates: {
                group: 'products',
                options:{
                    rating: false,
                    detailVariant: 'light',
                    buy: Spice.arrow.buy
                }
            }
        });
    };
}(this));