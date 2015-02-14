(function (env) {
    "use strict";
    env.ddg_spice_pokemon = function(api_result){
        var POKEAPI_IMAGE_URL = 'http://pokeapi.co/media/img/{id}.png';
        
        // Validate the response (customize for your Spice)
        if (!api_result) {
            return Spice.failed('pokemon');
        }

        // Render the response
        Spice.add({
            id: 'pokemon',
            name: 'Pokedex',
            data: api_result,
            meta: {
                sourceName: 'pokeapi.co',
                sourceUrl: 'http://pokeapi.co/api/v1/pokemon/' + api_result.name,
                sourceIconUrl: 'http://pokeapi.co/static/favicon.ico'
            },
            normalize: function(item) {
              item.image = POKEAPI_IMAGE_URL.replace('{id}', item.national_id);
              item.title = item.name;
              item.types = item.types.map(function(type) { return DDG.capitalize(type.name); });
              
              return item;
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.pokemon.content,
                    moreAt: true
                }
            }
        });
    };
    
    Handlebars.registerHelper("valueOrDash", function(value) {
        return parseInt(value, 10) || '-';
    });
}(this));
