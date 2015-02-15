(function (env) {
    "use strict";

    env.ddg_spice_pokemon = function(api_result){
        var POKEAPI_SPRITE_URL = 'http://pokeapi.co/media/img/{id}.png';
        var INFOBOX_PROPS = ['hp', 'attack', 'defense', 'height', 'weight', 'speed'];
        
        if (!api_result) {
            return Spice.failed('pokemon');
        }

        Spice.add({
            id: 'pokemon',
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
                    content: Spice.pokemon.content,
                    moreAt: true
                }
            }
        });

        /**
         * Returns the list of capitalized names from a collection
         *
         * @param {Array} collection
         * @return {Array}
         */
        function getCollectionNames(collection) {
            return this[collection].map(function(element) {
                return DDG.capitalize(element.name);
            });
        }

        /**
         * Returns the list of label/value pairs to display in the Info Box
         *
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
         * @return {String / null}
         */
        function getSprite() {
            if( this.sprites.length !== 0 ) {
                return POKEAPI_SPRITE_URL.replace('{id}', this.national_id);
            } else {
                return null;
            }
        }
    };
}(this));
