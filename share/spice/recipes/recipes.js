(function(env) {
    "use strict";
    env.ddg_spice_recipes = function (res) {

    if (!res) {
        return Spice.failed('recipes');
    }

    var query = DDG.get_query(),
        query_encoded = DDG.get_query_encoded();

    // delete for spice
    // if(!res.matches || !res.matches.length){ return; }

    var normalize = function(item) {

            // skip any results that don't have images:
            if (!item.imageUrlsBySize) {
                return null;
            }

            var m = { };

            /* item */

            m.title = m.heading = item.recipeName.replace(/ recipe/i,"");
            m.url = "http://www.yummly.com/recipe/" + item.id + '?prm-v1';

            m.image = m.img = item.imageUrlsBySize['250'];
            m.ratingText = item.sourceDisplayName;

            /* detail */

            m.cuisine = item.attributes && item.attributes.cuisine && item.attributes.cuisine[0];

            if(item.totalTimeInSeconds){
                m.cookingTime = item.totalTimeInSeconds / 60;
            }

            if(item.ingredients && item.ingredients.length){
                var searchTermContainsRecipe = rq.match(/recipe/i),
                    len = item.ingredients.length;

                m.ingredientString = item.ingredients.join(", ");
                m.ingredientDetails = item.ingredients.map(function(ingredient,i) {
                    var refinedTerm = (searchTermContainsRecipe) ? query.replace(/ recipe/i,' ' + ingredient + ' recipe') : query + ' ' + ingredient,
                        displayName = ingredient;

                    // append comman to all but the last:
                    if(i!==len-1){
                        displayName += ", ";
                    }

                    return {
                        name: ingredient,
                        displayName: displayName,
                        url: '?q=' + encodeURIComponent(refinedTerm)
                    }
                });

                // normalization: description for item, ingredientString for custom detail template
                m.description = m.ingredientString;
            }

            m.flavors = sortAndFormatFlavors(item.flavors);

            return m;

    }; // normalize()

    /**
     * takes a hash of flavor names + strength [0,1]
     * and returns a sparse array used to render bar
     * chart
     *
     * @param {Object} flavors
     * @return {Array}
     */
    var sortAndFormatFlavors = function(flavors){
        if(!flavors){ return null; }

        var sparse = [];

        for(var key in flavors){
            var strength = flavors[key];

            if(strength){

                // replace some of yummly flavor words,
                // for some reason the api doesn't match
                // their UI and we like the words on their UI better:
                if(key==="piquant"){
                    key = "spicy";
                }
                if(key==="meaty"){
                    key = "savory";
                }

                sparse.push({
                    name: key,
                    url: '/?q=' + key + '+' + query_encoded.replace(/ /g,'+'),
                    strength: Math.round(strength * 100)
                });
            }
        }

        if(!sparse.length){ return null; }

        return sparse.sort(function(a,b){
            return (a.strength > b.strength) ? -1 : 1;
        });
    }

    var //normalizedData = normalizeData(res.matches),

        searchContainedRecipe = !!(query_encoded.match(/recipe/i)),
        searchTerm = query.replace(/recipes|recipe/i,'').trim(),
        moreUrl = res.attribution.url + '?q=' + searchTerm + '&prm-v1'; // should replace trigger word or use the same logic that is used for the api call

    Spice.add({
        id: 'recipes',
        name: 'Recipes',

        data: res.matches,  //normalizedData,

        trump: searchContainedRecipe,   // XXX: signal?

        meta: {
            // count: normalizedData.length,
            total: res.totalMatchCount,
            searchTerm: searchTerm,
            itemType: 'Recipes',
            detailBg: 'image',
            // TODO: the following metadata will be injected by spice
            sourceIconUrl: DDG.get_asset_path('recipes','yummly.com.ico'), // temp fix for pb
            sourceUrl: moreUrl,
            sourceName: 'Yummly'
        },

        normalize: normalize,

        sort_fields: {
            rating: function(a,b){
                return (a.rating > b.rating) ? -1 : 1;
            }
        },
        sort_default: 'rating',

        /*
        relevancy: {

            skip_words: [ "recipes", "recipe", "ingredient", "ingredients" ],

            primary: [
                { key: 'recipeName' },
                { key: 'attributes.cuisine.0' },
                { key: 'ingredients' }
            ]

        },
        */

        templates: {
            item: 'basic_image_item',
            options: {
                brand: true,
                rating: true,
                buy: Spice.recipes.recipes_view_full,
                subtitle_content: Spice.recipes.recipes_subtitle,
                description_content: Spice.recipes.recipes_ingredients
            }
        }
    });
};
}(this));
