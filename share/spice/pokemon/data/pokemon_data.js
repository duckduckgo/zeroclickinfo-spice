(function (env) {
    "use strict";

    var ID = 'pokemon',
        DESCRIPTION_ENDPOINT = '/js/spice/pokemon/description/{id}',
        POKEAPI_SPRITE_URL = 'http://pokeapi.co/media/img/{id}.png',
        INFOBOX_PROPS = ['hp', 'attack', 'defense', 'height', 'weight', 'speed'];

    /**
     *  [ Pokemon::Data ]
     */
    env.ddg_spice_pokemon_data = function(api_result){
        if (!api_result) {
            return Spice.failed('pokemon');
        }

        Spice.add({
            id: ID,
            name: 'Pokedex',
            data: api_result,
            meta: {
                sourceName: 'pokeapi.co',
                sourceUrl: 'http://pokeapi.co/',
                sourceIconUrl: 'http://pokeapi.co/static/favicon.ico'
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    image: getSprite.call(item),
                    infoboxData: getInfoboxData.call(item),
                    eggGroups: getCollectionNames.call(item, 'egg_groups'),
                    types: getCollectionNames.call(item, 'types')
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.pokemon_data.content,
                    moreAt: true
                }
            }
        });

        if( api_result.descriptions.length > 0 ) {
            fetchDescription(api_result.descriptions);
        }
    };

    /**
     *  [ Pokemon::Description ]
     */
    env.ddg_spice_pokemon_description = function(api_result){
        var description = Handlebars.helpers.ellipsis(api_result.description, 140);

        Spice.getDOM(ID).find('.pokemon__description').html(description);
    };
    
    /**
     * Chooses a random pokemon's description from the available sets
     * and then calls the Pokemon::Description endpoint to fetch its full text
     *
     * @param {Array} descriptions
     */
    function fetchDescription(descriptions) {
        var randIndex = Math.floor(Math.random() * descriptions.length),
            id = descriptions[randIndex].resource_uri.match(/(\d+)\/$/)[1];

        $.getScript(DESCRIPTION_ENDPOINT.replace('{id}', id));
    }

    /**
     * Returns the list of capitalized names from a collection
     *
     * @context {item}
     * @param {Array} collection
     * @return {Array}
     */
    function getCollectionNames(collection) {
        return $.map(this[collection], function(element) {
            return DDG.capitalize(element.name);
        });
    }

    /**
     * Returns the list of label/value pairs to display in the Info Box
     *
     * @context {item}
     * @return {Array}
     */
    function getInfoboxData() {
        var infoboxData = [{ heading: 'Stats:' }];

        for( var prop in this ) {
            if( INFOBOX_PROPS.indexOf(prop) !== -1 && parseInt(this[prop], 10) ) {
                infoboxData.push({
                    label: DDG.capitalize(prop),
                    value: this[prop]
                });
            }
        }

        return infoboxData;
    }

    /**
     * Returns the url of the pokemon's sprite or null if the API doesn't provide any
     *
     * @context {item}
     * @return {String / null}
     */
    function getSprite() {
        if( this.sprites.length !== 0 ) {
            return POKEAPI_SPRITE_URL.replace('{id}', this.national_id);
        } else {
            return null;
        }
    }
}(this));
