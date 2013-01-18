/*
  nr is the prefix for this function space.
  */
function ddg_spice_doi(bib) {

  function format_author(author) {
  	return author['literal']
  }

  function format_authors(authors) {
  	var i = 0;
	var ret = "";
  	while (authors.length - i > 3) {
		ret += format_author(authors[i]);
		ret += ", ";
		i++;
	}
  	while (authors.length - i > 1) {
		ret += format_author(authors[i]);
		ret += " and ";
		i++;
	}
	ret += format_author(authors[i]);
  	return ret;
  }

  console.log(bib);
  // validity check
  if (bib['DOI'] && bib['author'] && bib['title']) {

  	items = new Array();
  	items[0] = new Array();
	items[0]['a'] = "by " + format_authors(bib['author']);
	if (bib['issued'] && bib['issued']['raw']) {
		items[0]['a'] += ", " + bib['issued']['raw'];
	}
	items[0]['a'] += ", doi:" + bib['DOI'] + "<br/>";
	items[0]['h'] = bib['title'];
	items[0]['s'] = "dx.doi.org";
	if (bib['url']) {
		items[0]['u'] = bib["URL"];
	} else {
		items[0]['u'] = "http://dx.doi.org/" + bib['DOI'];
	}
	nra(items);
  }
}
