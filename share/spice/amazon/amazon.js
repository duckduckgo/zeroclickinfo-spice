function ddg_spice_amazon(apiResult) {
    DDG.duckbar.products.display($.map(apiResult.results function(v,i) {
	v.template = 'products';
	v.duckbar_topic = 'products';
    }));
}