(function (env) {
    "use strict";

    /**
     * Get the search term from the DDG query that triggered this IA.
     *
     * @return {String} The unencoded search term without the IA trigger words.
     */
    function getSearchTerm() {
        var query = DDG.get_query();
        var triggers = [
            'magic card',
            'mtg',
            'magic: the gathering',
            'magic the gathering'
        ];
        return query.replace(new RegExp(triggers.join('|')), '').trim();
    }

    env.ddg_spice_magic_the_gathering = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.object === 'error') {
            return Spice.failed('magic_the_gathering');
        }

        // Render the response
        Spice.add({
            id: "magic_the_gathering",
            name: "Games",
            data: api_result.data,
            meta: {
                itemType: "Cards",
                sourceName: "Scryfall",
                sourceUrl: "https://scryfall.com/search?q="
                    + encodeURIComponent(getSearchTerm()),
                searchTerm: getSearchTerm(),
                count: api_result.data.length,
                snippetChars: 150
            },
            normalize: function(item) {
                if (item.name === DDG.get_query()){
                    item.exactMatch = true;

                }

                // the template calls a .set() function on the item, so change
                // the 'set' field in the item so an error isn't thrown
                item['set_label'] = item.set;
                delete item.set;
                var card_image = item.image_uris
                            ? DDG.toHTTPS(item.image_uris.png)
                            : "";
                var classify = item.type_line.split('—');
                var type = classify[0] ? classify[0].trim() : ' ';
                var subtype = classify[1] ? classify[1].trim() : ' ';
                var infoboxData = [
                    { heading: "Card Details" },
                    { label: "Types", value: type },
                    { label: "Subtypes", value: subtype },
                    { label: "Colors", value: item.colors },
                    { label: "CMC", value: item.cmc },
                    { label: "Cost", value: item.mana_cost },
                    { label: "Power", value: item.power },
                    { label: "Toughness", value: item.toughness }
                ];
                return {
                    title: item.name,
                    description: item.oracle_text ? item.oracle_text : "No description",
                    artist: 'Illus. ' + item.artist,
                    subtitle: subtype,
                    altSubtitle: type,
                    url: DDG.toHTTPS(item.scryfall_uri),
                    rarity: item.power ? item.power + "/" + item.toughness : null,
                    image: card_image,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: "media",
                options: {
                    footer: Spice.magic_the_gathering.footer,
                    content: Spice.magic_the_gathering.content,
                    aux: true,
                    moreAt: true
                },
                variants: {
                    tileSnippet: "large",
                    tileTitle: "1line-large"
                },
                elClass: {
                    tileFoot: "tx-clr--grey-light"
                }
            }
        });
    };
}(this));
