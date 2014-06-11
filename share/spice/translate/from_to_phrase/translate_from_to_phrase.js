function ddg_spice_translate_from_to_phrase(api_result) {
    if (!api_result.matches.length) {
        return Spice.failed("translate_from_to_phrase");
    }
    var params = get_params("from_to");
    Spice.add({
        data: api_result,
        header1: params.to + " translations for " + params.phrase,
        sourceName: "MyMemory",
        sourceUrl: "http://mymemory.translated.net/s.php?q=" + params.phrase + "&sl=" + params.from + "&tl=" + params.to,
        templates: {
            item: Spice.translate_from_to_phrase.translate_from_to_phrase,
            detail: Spice.translate_from_to_phrase.translate_from_to_phrase
        }
    });
}