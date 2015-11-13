(function (env) {
    "use strict";
    env.ddg_spice_pubmed = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('pubmed');
        }
        api_result = api_result.esearchresult.idlist;
        var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&retmax=10&id=';
        $.ajax({
            url: url + api_result.join(),
            async: false,
            dataType: 'json',
            success: function(r) {                                                                                             
                delete r.result.uids;
                api_result = r.result;
                var articles = Object.keys(api_result).map(function(key){return api_result[key]});
                api_result = articles;
            }
        });    
        Spice.add({
            id: "pubmed",
            name: "Pubmed",
            data: api_result,
            meta: {
                sourceName: "Pubmed",
                sourceUrl: 'http://www.ncbi.nlm.nih.gov/pubmed/',
                rerender: [ 'description' ]
            },
            normalize: function(item) {
                var boxData = [{heading: 'Article'}];
                if (item.title) {
                    boxData.push({
                        label: "Title",
                        value: item.title,
                    });
                }
                var authors = [];
                if (item.authors) {
                    for (var i in item.authors) {
                        authors.push(item.authors[i].name);
                    }
                    boxData.push({
                        label: "Authors",
                        value: authors.join(),
                    });
                }
                if (item.pubdate) {
                    boxData.push({
                        label: "Date",
                        value: item.pubdate,
                    });
                }
                if (item.source) {
                    boxData.push ({
                        label: "Source",
                        value: item.source,
                    });
                }
                var tmp_url = 'http://www.ncbi.nlm.nih.gov/pubmed/' + item.uid;
                return {
                    hrefTitle: item.title,
                    title: item.title,
                    href: tmp_url,
                    url: tmp_url,
                    subtitle: authors.join(", "),
                    description: '',
                    infoboxData: boxData,
                }
            },
            onItemShown: function(item) {
                var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id='+item.uid;
                if (item.loadedAbstract) { return; }

                $.ajax({
                    url: url,
                    dataType: 'xml',
                    success: function(r) {
                        var abstract_text = r.getElementsByTagName('AbstractText')[0].firstChild.data;
                        item.set('description', abstract_text);
                    }
                });

                item.loadedAbstract = 1;
            },
            templates: {
                group: 'text',
                variants: {
                    tileSnippet: "large"
                },
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));

