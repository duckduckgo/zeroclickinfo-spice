function ddg_spice_doi(bib) {

  function format_author(author) {
	if (author['family']) {
		var ret = "";
		if (author['given']) {
			ret += author['given'] + " ";
		}
		if (author['dropping-particle']) {
			ret += author['dropping-particle'] + " ";
		}
		if (author['non-dropping-particle']) {
			ret += author['non-dropping-particle'] + " ";
		}
		ret += author['family'];
		if (author['suffix']) {
			ret += " " + author['suffix'];
		}
		return ret;
	} else {
		return author['literal']
	}
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

  // validity check
  if (bib['DOI'] && bib['author'] && bib['title']) {

  	items = new Array();
  	items[0] = new Array();
	items[0]['a'] = "by " + h(format_authors(bib['author']));
	if (bib['issued'] && bib['issued']['raw']) {
		items[0]['a'] += ", " + h(bib['issued']['raw']);
	}
	items[0]['a'] += ", doi:" + h(bib['DOI']) + ". ";
	items[0]['a'] += "<br />";
	items[0]['a'] += "<pre style=\"display:none\" id=\"bibtex\"></pre>";
	items[0]['a'] += "<a href=\"javascript:fetch_bibtex('" + h(bib['DOI']) + "');\")>BibTeX</a> &bull; ";
	items[0]['h'] = h(bib['title']);
	items[0]['s'] = "dx.doi.org";
	if (bib['url']) {
		items[0]['u'] = bib["URL"];
	} else {
		items[0]['u'] = "http://dx.doi.org/" + bib['DOI'];
	}
	nra(items);
  }
}

// This uses the dummy doi_bibtex spice to lookup the bibliography data in
// bibtex format
function fetch_bibtex(doi) {
	nrj("/js/spice/doi_bibtex/" + doi);
}

// And this is the return call, showing the bibtex display field.
function ddg_spice_doi_bibtex(bibtex) {
	document.getElementById('bibtex').style.display = 'block';
	document.getElementById('bibtex').innerHTML = h(bibtex);

}

function h(txt) {
        return txt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

