// spice callback function
function ddg_spice_spoonacular (api_result) {
    "use strict";

    if (api_result.length == 0) return;

    // popular becomes best
    var query = api_result[0].query.replace(/popular/g, 'best');

    Spice.render({
        data: api_result,
        source_name: 'spoonacular',
        source_url: 'https://spoonacular.com/'+query,
        header1: query.replace(/\+/g,' '),
        force_big_header: true,
        more_logo: "spoonacular-logo.png",
        spice_name: 'spoonacular',
        template_frame: "carousel",
        template_options: {
            template_item: "spoonacular",
            template_detail: "spoonacular_detail",
            items: api_result
        }
    });  

}

/*
 * Create the image link of the recipe.
 */
Handlebars.registerHelper("makeImage", function(id, image) {
    "use strict";

    var url = "http://webknox.com/recipeImages/"+id+"-90x90";

    // get the file ending
    var ending = image.match(/\..{2,4}$/)[0];
    return url + ending;
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
        r = text+r;
    } else {
        r = r+' '+text;
    }
    
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


