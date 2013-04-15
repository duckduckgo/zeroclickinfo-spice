function ddg_spice_drinks(api_result) {

    var drink = api_result[0];
    
    // validity check
    if (!drink.name) return;

    Spice.render({
        data             : drink,
        header1          : drink.name + " (Drinks)",
        source_url       : drink.url,
        source_name      : 'The Drink Project',
        template_normal  : 'drinks',
        force_no_fold    : true
    });
}