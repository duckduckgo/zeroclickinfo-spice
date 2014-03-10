// `ddg_spice_urban_dictionary` is a callback function that gets
// "urban dictionary cool" or "urban dictionary ROTFL."

// Note: This plugin can display adult content and profanity.

function ddg_spice_urban_dictionary(response) {
	if (!(response || response.response.result_type === "exact"
            || response.list || response.list[0]))
        return;

    var word       = response.list[0].word;
	var definition = response.list[0].definition.replace(/(\r?\n)+/gi, '<br/>');

    Spice.render({
        data             : { 'definition' : definition },
        header1          : word + " (Urban Dictionary)",
        source_url       : 'http://www.urbandictionary.com/define.php?term=' + word,
        source_name      : 'Urban Dictionary',
        template_normal  : 'urban_dictionary',
        force_big_header : true,
    });
}
