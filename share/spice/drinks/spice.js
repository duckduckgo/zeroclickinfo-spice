function ddg_spice_drinks(drink) {
    
    
    var snippet = '';
    var ing = '';
    var header = '';
    

    // validity check
    if (drink[0]['name']) {
      
      for(num in drink[0]['ingredients']) {
	  ing += ing ? '; ' : '';
	  var tmp_ing = drink[0]['ingredients'][num];
	  tmp_ing = tmp_ing.replace(/\./,'');
	  ing += tmp_ing;
      }
      ing += '.';
      ing = '<i>Ingredients: </i>' + ing;

      snippet = ing;
      if (drink[0]['procedure']) {
	snippet += snippet ? '<br>' : '';
      	snippet += '<i>Directions:</i> ' + drink[0]['procedure'];
      }

      var re = new RegExp('^[aehiou]');

      header = drink[0]['name'];
      header += ' (Drink)';

      items = new Array();
      items[0] = new Array();
      items[0]['a'] = snippet;
      items[0]['h'] = header;

      // Source name and url for the More at X link.
      items[0]['s'] = 'The Drink Project';
      items[0]['u'] = drink[0]['url'];
      items[0]['f'] = 1;

      nra(items);
    }
}
