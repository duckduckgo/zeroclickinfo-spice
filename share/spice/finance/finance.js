function ddg_spice_finance (api_result) {

	// Verify API response contains results

	if(!api_result || api_result.query.results.quote.StockExchange == null) {
        return;
    }

	// Render spice instant answer
	Spice.render({

		//define Spice.render properties here:
		data              : api_result,
		force_big_header  : true,
		header1           : api_result.query.results.quote.Name + " (" + api_result.query.results.quote.symbol + ") - " + api_result.query.results.quote.StockExchange,
		source_name 	  : "Yahoo! Finance",
		source_url        : "http://finance.yahoo.com/q?s=" + api_result.query.results.quote.symbol,
		template_normal   : "finance"
   });
};
