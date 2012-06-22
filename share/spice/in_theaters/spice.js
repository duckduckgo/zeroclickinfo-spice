function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		console.log(rotten);
		var query = DDG.get_query().split(' ');
		var mpaa;

		//Check if the user wants to filter by MPAA rating
		for(var i = 0;i < query.length;i++) {
			if(query[i] === 'r' || query[i] === 'pg' || query[i] === 'pg-13' || query[i] === 'g') {
				mpaa = query[i].toUpperCase();
				console.log(mpaa);
			}
		}
		var out = '', length, executed = false;
		out += '<div style="movies"><ul>';

		if(rotten.movies.length > 5) {
			length = 5;
		} else {
			length = rotten.movies.length;
		}

		//Get the movies
		for(var i = 0;i < length;i++) {
			var movie = rotten.movies[i];
			var rating;

			//Check if the movie has ratings
			if (movie.ratings.critics_score === -1) {
				rating = "Not Yet Reviewed";
			} else {
				rating = movie.ratings.critics_score + '/100';
			}

			//Get cast of the movie
			var starring = ' starring ' + movie.abridged_cast[0].name + ' as ' + movie.abridged_cast[0].characters[0];

			var hour = 0;
			var min = 0;
			if(movie.runtime >= 60) {
				hour = Math.floor(movie.runtime / 60);
				min = movie.runtime - (hour * 60);
			} else {
				min = movie.runtime;
			}
			//Display the movie
			var bullet = '<li title="' + movie.synopsis + '"><a href="' + movie.links.alternate + '" title="' + movie.synopsis + '"><b>'
						+ movie.title +'</b></a>' + starring + ' ('
						+ movie.mpaa_rating + ', ' + hour + 'hr. ' + min + 'min., ' 
						+ 'rated ' + rating + ')'
						+ '</li>';

			//Check if MPAA is available
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
		//Check if it returned any results
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

