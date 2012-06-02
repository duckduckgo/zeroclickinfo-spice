function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {	
	items = new Array();
	items[0] = new Array();

	// Main content and title
	items[0]['a'] = get_content(movie);
	items[0]['h'] = movie['Title'] + ' (' + movie['Year'] + ')';

	// Source name and url of the imdb page
	items[0]['s'] = 'IMDB';
	items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];

	// Thumbnail image of the movie poster
//	items[0]['i'] = movie['Poster'];

	// Render
	nra(items);
    } 
}

function get_content(movie) {
    var content = '';

    content += "&nbsp;&nbsp;";
    content += "<big><b>" + movie['imdbRating'] + "</b></big>";
    content += "&nbsp;&nbsp;";
    content += movie['Rated'];
    content += "&nbsp;&nbsp;";
    content += movie['Runtime'];
    content += "<br /><br />";

    content += movie['Plot'];
    content += "<br /><br />";
    
    content += "<b> Director(s): </b>" + movie['Director'] + "<br />";
    content += "<b> Writer(s): </b>" + movie['Writer'] + "<br />";
    content += "<b> Star(s): </b>" + movie['Actors'] + "<br />";
    content += "<br />";
    
    return content;
}