function ddg_spice_news(apiResult) {
    DDG.duckbar.news.display($.map(apiResult, function(v,i) {
	v.template = 'news';
	v.duckbar_topic = 'news';
    }));
}
