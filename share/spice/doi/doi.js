(function (env) {
    "use strict";
    env.ddg_spice_doi = function(api_result){

        if (!api_result || !api_result.DOI || !api_result.author || !api_result.title || api_result.error) {
            return Spice.failed('doi');
        }

        // validity check
        if (api_result.DOI && api_result.author && api_result.title) {

            items = new Array();
            items[0] = new Array();
            items[0].a = "by " + h(format_authors(api_result.author));
            if (api_result.issued && api_result.issued.raw) {
                items[0].a += ", " + h(api_result.issued.raw);
            }
            items[0].a += ", doi:" + h(api_result.DOI) + ". ";
            items[0].a += "<br />";
            items[0].a += "<pre style=\"display:none\" id=\"api_resulttex\"></pre>";
            items[0].a += "<a href=\"javascript:fetch_api_resulttex('" + h(api_result.DOI) + "');\")>BibTeX</a> &bull; ";
            items[0].h = h(api_result.title);
            items[0].s = "dx.doi.org";
            if (api_result.url) {
                items[0].u = api_result["URL"];
            } else {
                items[0].u = "http://dx.doi.org/" + api_result.DOI;
            }
        }
        Spice.add({
            id: "doi",

            name: "Reference", // Or Science?
            data: api_result,
            meta: {
                sourceName: "dx.doi.org",
                sourceUrl: api_result.URL
            },
            normalize: function(item) {
                return {
                    title: api_result.title,
                };
            },
            templates: {
                group: 'list_detail',
                options: {
                    content: 'record',
                    moreAt: false
                }
            }
        });
    };
}(this));

function format_author(author) {
    if (author.family) {
        var ret = "";
        if (author.given) {
            ret += author.given + " ";
        }
        if (author.dropping-particle) {
            ret += author.dropping-particle + " ";
        }
        if (author.non-dropping-particle) {
            ret += author.non-dropping-particle + " ";
        }
        ret += author.family;
        if (author.suffix) {
            ret += " " + author.suffix;
        }
        return ret;
    } else {
        return author.literal
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
