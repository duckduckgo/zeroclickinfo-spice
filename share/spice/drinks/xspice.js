function ddg_spice_drinks(response) {

    var drink = response[0];
    
    // validity check
    if (!drink.name) return;
      
    var ingredients = [];
    for (var i in drink.ingredients)
        ingredients.push(drink.ingredients[i]);
    drink.ingredients = ingredients;

    Spice.render({
        data             : drink,
        header1          : drink.name + " (Drinks)",
        source_url       : drink.url,
        source_name      : 'The Drink Project',
        template_normal  : 'drinks',
        force_no_fold    : true,
    });
}
