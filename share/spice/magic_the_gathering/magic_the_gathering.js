(function (env) {
    "use strict";
    env.ddg_spice_magic_the_gathering = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('magic_the_gathering');
        }

        // Render the response
        Spice.add({
            id: "magic_the_gathering",
            name: "Cards",
            data: api_result,
            meta: {
                itemType: "Cards",
                sourceName: "Deckbrew.com",
                sourceUrl: "http://deckbrew.com/api/",
                count: api_result.length,
            },
            normalize: function(item) {
                if (item.name === DDG.get_query()){
                    item.exactMatch = true;

                } 
                var card_image = DDG.toHTTP(item.editions[0].image_url);
                var infoboxData = [
                    { heading: "Card Details" },
                    { label: "Types", value: item.types },
                    { label: "Subtypes", value: item.subtypes },
                    { label: "Colors", value: item.colors },
                    { label: "CMC", value: item.cmc },
                    { label: "Cost", value: item.cost },
                    { label: "Power", value: item.power },
                    { label: "Toughness", value: item.toughness }
                ];
                return {
                    title: item.name,
                    description: item.text,
                    subtitle: item.editions[0].flavor,
                    url: item.editions[0].store_url,
                    image: card_image,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: "media",
                options: {
                    aux: true,
                    moreAt: true
                }
            }
        });
    };
    function pushArrayData(arr) {
        
    }
    //function getInfoBoxData(item) {
      //  var infoboxData = [{
        //    heading: 'Card Details:'
       // }];
       // for (var i = 1; i <= 15; i++) {
       //     if(item["strIngredient" + i] !== "") {
       //         infoboxData.push({
       //             label: item["strMeasure" + i] + "" + item["strIngredient" + i]
       //         });
       //     }
      //  }
      // return infoboxData;
   // }
}(this));
