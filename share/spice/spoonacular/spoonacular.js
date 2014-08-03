(function (env) {
    "use strict";
    env.ddg_spice_spoonacular = function(api_result){

    var query = DDG.get_query(),
        query_encoded = DDG.get_query_encoded();

    var searchTerm = query.replace(/recipes|recipe/i,'').trim();        

        Spice.add({
            id: "spoonacular",
            name: "Recipes",
            data: api_result,
            meta: {
                sourceName: 'spoonacular',
                itemType: 'Recipes',
                // FIXME local icon
                sourceIconUrl: 'http://spoonacular.com/favicon.ico',
                sourceUrl: 'http://spoonacular.com/' + encodeURIComponent(searchTerm.replace(/ /g,'-'))
            },

            template_group: 'info',

            templates: {
                item: Spice.spoonacular.spoonacular,
                item_detail: Spice.spoonacular.spoonacular_detail,
                detail: Spice.spoonacular.spoonacular_detail,
                options: {
                    moreAt: true,
                    aux: false
                }
            }

            /*templates: {
                group: 'base',
                options: {
                    content: Spice.spoonacular.spoonacular_detail,
                    moreAt: true
                }
            }*/
        });
    };

    /*
     * Create the image link of the recipe.
     */
    Handlebars.registerHelper("makeImage", function(id, image) {
        "use strict";

        var url = "http://webknox.com/recipeImages/"+id+"-240x150";

        // get the file ending
        var ending = image.match(/\..{2,4}$/)[0];
        return url + ending;
    });


    /*
     * Create the big image link of the recipe.
     */
    Handlebars.registerHelper("makeBigImage", function(id, image) {
        "use strict";

        var url = "http://webknox.com/recipeImages/"+id+"-312x231";

        // get the file ending
        var ending = image.match(/\..{2,4}$/)[0];
        return url + ending;
    });


    /*
    * Helper for Handlebarsjs to allow for conditions with comparison.
    */
    Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    /*
     * Format ranking values.
     */
    Handlebars.registerHelper("format", function(rankingValue) {
        "use strict";

        // get non number content
        var text = rankingValue.match(/[^0-9]+/gi)[0];
        var number = rankingValue.replace(text,'')

        var r = new Number(number).toLocaleString('en');

        if (text == '$') {
            r = text+r+' per serving';
        } else if (text == 'min') {
            r = r+' '+text + 'utes to make';
        } else {
            r = r+' '+text;
        }
        
        return r;
    });

    /*
     * Format aggregate likes values.
     */
    Handlebars.registerHelper("formatLikes", function(likes) {
        "use strict";

        var r = new Number(likes).toLocaleString('en');
        
        return r;
    });

    /*
     * Get the image of the badge.
     */
    Handlebars.registerHelper("badge", function(type) {
        "use strict";

        return DDG.get_asset_path("spoonacular", type+"-badge.png").replace("//", "/");
    });

    /*
     * Create the link to the recipe.
     */
    Handlebars.registerHelper("recipeLink", function(id, title) {
        "use strict";

        var safeTitle = title.replace(/\'/g,'').replace(/\"/g,'').replace(/&/g,'').replace(/\?/g,'').replace(/ /g,'-');

        return "http://spoonacular.com/"+safeTitle+"-"+id;
    });

    /*
     * Iterate over the badges of the recipe. Skip "vegetarian" if the recipe is "vegan". Also limit the number of badges to 4 to make it fit next to the recipe image.
     */
    Handlebars.registerHelper('iterateBadges', function(context, options) {
      var ret = '';

      var skipVegetarian = false;
      var max = 4;
      for (var i = 0; i < context.length; i++) {
        if (context[i] == 'vegan') {
            skipVegetarian = true;
            max = 5;
        }
      }
      
      for (var i = 0; i < Math.min(context.length,max); i++) {
        if (context[i] == 'vegetarian' && skipVegetarian) {
            continue;
        }

        ret = ret + options.fn(context[i]);
      }

      return ret;
    });

}(this));


/*function ddg_spice_spoonacular(res) {

    var query = DDG.get_query(),
        query_encoded = DDG.get_query_encoded();

    var searchContainedRecipe = query_encoded.match(/recipe/i),
        searchTerm = query.replace(/recipes|recipe/i,'').trim(),
        moreUrl = 'http://spoonacular.com/' + searchTerm;

    Spice.add({
        id: 'recipes',
        name: 'Recipes',

        data: res,

        trump: true, 

        meta: {
            total: res.length,
            searchTerm: searchTerm,
            itemType: 'Recipes',
            detailBg: 'image',
            detailClass: 'detail--i',
            // FIXME local icon
            sourceIconUrl: 'http://spoonacular.com/favicon.ico',
            sourceUrl: moreUrl,
            sourceName: 'spoonacular'
        },

        normalize: res,

        sort_fields: {
            rating: function(a,b){
                return (a.rating > b.rating) ? -1 : 1;
            }
        },
        sort_default: 'rating',

        
        relevancy: {

            skip_words: [ "recipes", "recipe", "ingredient", "ingredients" ],

            primary: [
                { key: 'recipeName' },
                { key: 'attributes.cuisine.0' },
                { key: 'ingredients' }
            ]

        },
        

        template_group: 'products_simple',

        templates: {
            detail: Spice.spoonacular.spoonacular_detail,
            item_detail: Spice.spoonacular.spoonacular_detail,

            options: {
                brand: true,
                rating: true
            }
        }

    });
}
*/