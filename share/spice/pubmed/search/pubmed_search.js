(function (env) {
    "use strict";
    env.ddg_spice_pubmed_search = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('pubmed');
        }

        var idlist = api_result.esearchresult.idlist,
            url = '/js/spice/pubmed/ids/' + idlist.join(),
            query = api_result.esearchresult.translationset[0].from;

        $.ajax({
            url: url,
            async: false,
            dataType: 'json',
            success: function(r) {
                delete r.result.uids;
                api_result = r.result;
                var articles = Object.keys(api_result).map(function(key){
                        return api_result[key];
                    });
                api_result = articles;

                Spice.add({
                    id: "pubmed",
                    name: "Reference",
                    data: api_result,
                    meta: {
                        sourceName: "Pubmed",
                        sourceUrl: 'http://www.ncbi.nlm.nih.gov/pubmed/?term=' + query,
                        rerender: [ 'description' ],
                        snippetChars: 140
                    },
                    normalize: function(item) {
                        var authors = [];
                        if (item.authors) {
                            for (var i in item.authors) {
                                authors.push(item.authors[i].name);
                            }
                        }
                        var tmp_url = 'http://www.ncbi.nlm.nih.gov/pubmed/' + item.uid;
                        return {
                            title: item.title,
                            url: tmp_url,
                            subtitle: authors.join(", ") || ' ',
                            description: '',
                            tileTitle: "3line-small"
                        };
                    },
                    onItemShown: function(item) {
                        var url = '/js/spice/pubmed/abstract/' + item.uid;
                        if (item.loadedAbstract) { return; }
                        $.ajax({
                            url: url,
                            dataType: 'json',
                            success: function(r) {
                                var abstract_text = '';
                                if ( typeof r.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText.text != 'undefined' ) {
                                    abstract_text = r.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText.text;
                                } else {
                                    abstract_text = 'No abstract available';
                                }
                                item.set('description', abstract_text);
                            }
                        });

                        item.loadedAbstract = 1;
                    },
                    templates: {
                        group: 'text',
                        variants: {
                            tileTitle: '4line',
                            tileSnippet: "large",
                            tile: 'wide'
                        },
                        options: {
                            moreAt: true,
                            footer: Spice.pubmed_search.footer
                        }
                    }
                });
            }
        });
    };
}(this));
