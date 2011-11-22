function nrat(alts) 
{
  console.log(alts);
  
  // validity check
  if (alts['Items']) {

    var items = new Array();
    var i = 0;

    for (item in alts['Items']) {
      
      items[i] = new Array();
      items[i]['a'] = alts['Items'][i]['Name'];

      i++;
    }

    
    console.log(items[0]['a']);
    nra(items);
  }
}

