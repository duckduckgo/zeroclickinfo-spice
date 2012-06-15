function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		console.log(rotten);
		var out = '', length;
		if(rotten.movies.length > 5) {
			length = 5;
		} else {
			length = rotten.movies.length;
		}
		out += '<div style="movies">';
		out += '<ul>';
		for(var i = 0;i < length;i++) {
			out += '<li><a href="' + rotten.movies[i].links.alternate + '">' + rotten.movies[i].title + 
					'</a> (' + rotten.movies[i].mpaa_rating + ') <i>Critic\'s Rating: ' + rotten.movies[i].ratings.critics_score + 
					'</i></li>';
		}
		out += '</ul>';
		var items = [[]];
		items[0]['a'] = out;
		items[0]['h'] = 'In Theaters';
		items[0]['s'] = 'Rotten Tomatoes';
		items[0]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
		items[0]['f'] = 1;
		nra(items);
	}
}