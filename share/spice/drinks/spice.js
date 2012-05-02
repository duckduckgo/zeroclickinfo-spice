function ddg_spice_drinks(drink) {
    
    
    var snippet = '';
    
    // validity check
    if (drink['name']) {
      
              
      snippet = '<b>' + drink['name'] + "<\b>";
       
      for(num in drink['ingredients'])
      	snippet += drink['ingredients'][num] + "<br />";
      	
      if (drink['procedure'])
      	snippet += drink['procedure'];

      items = new Array();
      items[0] = new Array();
      items[0]['a'] = snippet;
      items[0]['h'] = '';

      // Source name and url for the More at X link.
      items[0]['s'] = 'DrinkProject.com';
      items[0]['u'] = 'http://www.drinkproject.com/';
      items[0]['f'] = 1;

      nra(items);
    }
}
