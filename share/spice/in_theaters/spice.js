function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		console.log(rotten);
		var out = '', length, more = '';
		out += '<div style="movies"><ul>';
		more += out;
		for(var i = 0;i < rotten.movies.length;i++) {
			for(var i = 0;i < rotten.movies.length;i++) {
            var movie = rotten.movies[i];

            if (movie.ratings.critics_score === -1){
                rating = "Not Yet Reviewed";
            } else {
                rating = movie.ratings.critics_rating + ' - ' + rotten.movies[i].ratings.critics_score +'%';
            }
            
            var bullet = '<li><a href="' + movie.links.alternate + '">'
                       + movie.title +'</a> ('
                       + movie.mpaa_rating + ') <i>' 
                       + rating
                       + '</i></li>';
            if(i < 5) {
                out += bullet;
            } else {
                more += bullet;
            }
        }
		}
		out += '</ul></div>';
		more += '</ul></div>';
		var items = [[],[]];
		items[0]['a'] = out;
		items[0]['h'] = 'Currently In Theaters';
		items[0]['s'] = 'Rotten Tomatoes';
		items[0]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
		items[0]['force_big_header'] = true;
		items[0]['f'] = 1;

		items[1]['a'] = more;
		items[1]['t'] = 'Show more movies';
		items[1]['s'] = 'Rotten Tomatoes';
		items[1]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';		
		items[1]['f'] = 1;
		nra(items);
	}
}