function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		console.log(rotten);
		var query = DDG.get_query().split(' ');
		var mpaa;
		for(var i = 0;i < query.length;i++) {
			if(query[i] === 'r' || query[i] === 'pg' || query[i] === 'pg-13' || query[i] === 'g') {
				mpaa = query[i].toUpperCase();
				console.log(mpaa);
			}
		}
		var out = '', length, executed = false;
		out += '<div style="movies"><ul>';
		for(var i = 0;i < rotten.movies.length;i++) {
            var movie = rotten.movies[i];
            var rating;
            if (movie.ratings.critics_score === -1) {
            	rating = "Not Yet Reviewed";
            } else {
            	rating = movie.ratings.critics_rating + ' - ' + movie.ratings.critics_score +'%';
            }
            
			var bullet = '<li><a href="' + movie.links.alternate + '" '
						+ 'title="' + (movie.critics_consensus ? movie.critics_consensus : '') + '">'
                    	+ movie.title +'</a> ('
                    	+ movie.mpaa_rating + ') <i>' 
                    	+ rating
                   		+ '</i></li>';
            if(mpaa) {
            	if(mpaa === movie.mpaa_rating) {
            		executed = true;
					out += bullet;
				}
			} else {
				executed = true;
				out += bullet;
			}
        }
        //Check if the
        if(!executed) {
        	return;
        }
		out += '</ul></div>';
		var items = [[]];
		items[0]['a'] = out;
		items[0]['h'] = 'Currently In Theaters';
		items[0]['s'] = 'Rotten Tomatoes';
		items[0]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
		items[0]['force_big_header'] = true;
		items[0]['f'] = 1;
		nra(items);
	}
}

