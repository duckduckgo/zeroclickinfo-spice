function ddg_spice_recipes(res) {
    if(!res.matches || !res.matches.length){ return; }

    var normalizeData = function(matches){
        var normalized = [];

        for(var i=0,m; m=matches[i]; i++){
            // skip any results that don't have images:
            if(!m.imageUrlsBySize){ continue; }

            m.recipeName = m.recipeName.replace(/ recipe/i,"");
            m.url = "http://www.yummly.com/recipe/" + m.id;

            m.image = m.imageUrlsBySize['250'];

            m.cuisine = m.attributes && m.attributes.cuisine && m.attributes.cuisine[0];

            if(m.totalTimeInSeconds){
                m.cookingTime = m.totalTimeInSeconds / 60;
            }

            if(m.ingredients && m.ingredients.length){
                var searchTermContainsRecipe = rq.match(/recipe/i)
                    len = m.ingredients.length;

                if(searchTermContainsRecipe){
                    m.showIngredientsOnTile = true;
                }

                m.ingredientString = m.ingredients.join(", ");
                m.ingredientDetails = m.ingredients.map(function(ingredient,i){
                    var refinedTerm = (searchTermContainsRecipe) ? rqd.replace(/ recipe/i,' ' + ingredient + ' recipe') : rqd + ' ' + ingredient,
                        displayName = ingredient;

                    // append comman to all but the last:
                    if(i!==len-1){
                        displayName += ", ";
                    }

                    return {
                        name: ingredient,
                        displayName: displayName,
                        url: '?q=' + refinedTerm.replace(/ /g,'+')
                    }
                });
            }

            m.flavors = sortAndFormatFlavors(m.flavors);

            normalized.push(m);
        }

        // sort by rating:
        return normalized.sort(function(a,b){
            return (a.rating > b.rating) ? -1 : 1;
        });
    }

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
                    url: '/?q=' + key + '+' + rqd.replace(/ /g,'+'),
                    strength: Math.round(strength * 100)
                });
            }
        }

        if(!sparse.length){ return null; }

        return sparse.sort(function(a,b){
            return (a.strength > b.strength) ? -1 : 1;
        });
    }

    var normalizedData = normalizeData(res.matches),
        searchContainedRecipe = !!(rqd.match(/recipe/i)),
        searchTerm = rqd.replace(/recipes|recipe/i,'').trim(),
        moreUrl = res.attribution.url + '?q=' + searchTerm; // should replace trigger word or use the same logic that is used for the api call

    Spice.render({
        id: 'recipes',
        name: 'Recipes',

        data: normalizedData,

        trump: searchContainedRecipe,

        meta: {
            count: normalizedData.length,
            total: res.totalMatchCount,
            searchTerm: searchTerm,
            itemType: 'Recipes',
            sourceIconUrl: DDG.get_asset_path('recipes','yummly.com.ico'),
            sourceUrl: moreUrl,
            sourceName: 'Yummly',
            detailBg: 'image',
            detailClass: 'detail--i'
        },

        templates: {
            item: 'recipes',
            detail: 'recipes_detail'
        }

    });
}
