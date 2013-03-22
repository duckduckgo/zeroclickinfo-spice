function ddg_spice_bible ( api_result ) {
	
	// validity check
	if ( !api_result.length ) return;

	var result = api_result[0];
	var header = result.bookname + ' ' + result.chapter + ':' + result.verse;

	Spice.render({
		data: 				result,
		header1 : 			header + " (Bibl Verse)",
		source_name : 		'Bible.org',
		source_url : 		'http://bible.org/',
		template_normal : 	"bible",
		force_no_fold : 	true
	});
}


/*******************************
  Handlebars helpers
  *******************************/

// creates an anchor linking to a result's commments
Handlebars.registerHelper ('cleanText', function( text ) {

	// Link to be removed.
	var rmlink = '<a style=\"\" target=\"_blank\" href=\"http:\/\/bible.org\/page.php?page_id=3537\">&copy;NET<\/a>';
	
	return text.replace(rmlink, '').replace('“', '').replace('”', '');
});