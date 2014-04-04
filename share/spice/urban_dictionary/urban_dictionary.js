// `ddg_spice_urban_dictionary` is a callback function that gets
// "urban dictionary cool" or "urban dictionary ROTFL."

// Note: This plugin can display adult content and profanity.

function ddg_spice_urban_dictionary(response) {
	if (!(response || response.response.result_type === "exact"
            || response.list || response.list[0]))
        return;

    var word       = response.list[0].word;
	var definition = response.list[0].definition.replace(/(\r?\n)+/gi, '<br/>');

    Spice.add({
        data             : { 'definition' : definition },
        header1          : word + " (Urban Dictionary)",
        sourceUrl       : 'http://www.urbandictionary.com/define.php?term=' + word,
        sourceName      : 'Urban Dictionary',
        templates: {
            item: Spice.urban_dictionary.urban_dictionary,
            detail: Spice.urban_dictionary.urban_dictionary
        },
        
    });
}
