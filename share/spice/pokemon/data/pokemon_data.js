(function (env) {
    "use strict";

    var ID = 'pokemon_data',
        INFOBOX_PROPS = ['hp', 'attack', 'defense', 'height', 'weight', 'speed'],
        DESCRIPTION_ENDPOINT = '/js/spice/pokemon/description/{id}',
        POKEAPI_SPRITE_URL = 'http://pokeapi.co/media/img/{id}.png';
    /**
     *  [ Pokemon::Data ]
     */
    env.ddg_spice_pokemon_data = function(api_result){
        if( !api_result ) {
            return Spice.failed('pokemon');
        }

        var bulbapedia_url = 'http://bulbapedia.bulbagarden.net/wiki/' + api_result.name;

        Spice.add({
            id: ID,
            name: 'Pokedex',
            data: api_result,
            meta: {
                sourceName: 'Bulbapedia',
                sourceUrl: bulbapedia_url,
                sourceIconUrl: 'http://bulbapedia.bulbagarden.net/favicon.ico'
            },
            normalize: function(item) {
                return {
                    url: bulbapedia_url,
                    title: item.name,
                    image: getSprite.call(item),
                    imageIsLogo: true,
                    infoboxData: getInfoboxData.call(item),
                    subtitle: (function(evolutions) {
                        if( evolutions.length > 0 ) {
                            var html = 'Evolves into ';
                            var evolution_htmls = [];

                            for (var i = 0; i < evolutions.length; i++) {
                                var temp_html = '<b><a href="?q={name}+pokemon&ia=pokedex">{name}</a></b>';

                                if (evolutions[i].level) {
                                    temp_html += ' (at level {evolve_level})'
                                } else if (evolutions[i].method == 'trade') {
                                    temp_html += ' (when traded)'
                                } else if (evolutions[i].method == 'stone') {
                                    temp_html += ' (using a stone)'
                                }

                                evolution_htmls.push(temp_html.replace(/{name}/g, evolutions[i].to).replace(/{evolve_level}/g, evolutions[i].level));
                            };

                            return new Handlebars.SafeString(html + evolution_htmls.join(', '));
                        }
                    }(item.evolutions))
                };
            },
            onShow: function() {
                fetchDescription(api_result.descriptions).done(function(api_result) {
                    var description = api_result ? api_result.description : 'Description not available';

                    Spice.getDOM(ID).find('.pokemon__description').html(description);
                });
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.pokemon_data.content,
                    moreText: [
                        {
                            href: 'http://www.pokemon.com/us/pokedex/' + api_result.name,
                            text: 'Pokemon.com'
                        },
                        {
                            href: 'http://pokeapi.co',
                            text: 'Data by Pokéapi'
                        }
                    ]
                }
            }
        });
    };

    /**
     * Chooses a random pokemon's description from the available sets
     * and then calls the Pokemon::Description endpoint to fetch its full text
     *
     * @param {Array} descriptions
     * @return {jqXHR} the Promise object
     */
    function fetchDescription(descriptions) {
        if( descriptions.length > 0 ) {
            var randIndex = Math.floor(Math.random() * descriptions.length),
                id = descriptions[randIndex].resource_uri.match(/(\d+)\/$/)[1];

            return $.getJSON(DESCRIPTION_ENDPOINT.replace('{id}', id));
        } else {
            return new jQuery.Deferred().resolve(null).promise();
        }
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
        var infoboxData = [{ heading: 'Info' }];

        if( this.types.length > 0 ) {
            infoboxData.push({
                label: 'Type',
                value: getCollectionNames.call(this, 'types').join(', ')
            });
        }

        if( this.egg_groups.length > 0 ) {
            infoboxData.push({
                label: 'Egg groups',
                value: getCollectionNames.call(this, 'egg_groups').join(', ')
            });
        }

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
