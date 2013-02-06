function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		var query = DDG.get_query().toLowerCase().split(' ');
		var mpaa;
		var title = 'Currently In Theaters';
		var get_release = false;
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		//Check if the user wants to filter by MPAA rating
		for(var i = 0;i < query.length;i++) {
			if(query[i] === 'r' || query[i] === 'pg' || query[i] === 'pg-13' || query[i] === 'g') {
				mpaa = query[i].toUpperCase();
			}
			if(query[i] === 'opening') {
				title = 'Opening Movies'
				get_release = true;
			}
		}
		var out = '', length, executed = false, more = '', count = 0;
		out += '<div style="movies"><ul>';
		more += out;

		//Get the movies
		for(var i = 0;i < rotten.movies.length;i++) {
			var movie = rotten.movies[i];
			var rating;

			//Check if the movie has ratings
			if (movie.ratings.critics_score === -1) {
				rating = "Not Yet Reviewed";
			} else {
				rating = 'rated ' + movie.ratings.critics_score + '/100';
			}

			//Get cast of the movie
			var starring = '';
			if(movie.abridged_cast.length) {
				starring = ' starring ' + movie.abridged_cast[0].name;
			}

			var hour = 0;
			var min = 0;
			if(movie.runtime) {
				if(movie.runtime >= 60) {
					hour = Math.floor(movie.runtime / 60);
					min = movie.runtime - (hour * 60);
				} else {
					min = String(movie.runtime);
				}
				hour = ', ' + hour + 'hr ';
				min += 'min';
			} else {
				hour = '';
				min = '';
			}

			var release_date = '';
			//Get release date if it is an opening movie query
			if(get_release) {
				if(movie.release_dates.theater) {
					release_date = movie.release_dates.theater.split('-');
					release_date = ', ' + months[Number(release_date[1])-1] + ' ' + release_date[2];
				}
			}

			//Display the movie
			var bullet = '<li title="' + movie.synopsis + '"><a href="' + movie.links.alternate + '" title="' + movie.synopsis + '">'
						+ movie.title +'</a>' + starring + ' ('
						+ movie.mpaa_rating + hour + min + release_date + ') ' 
					 	+ rating
						+ '</li>';

			//Check if MPAA is available
			if(mpaa) {
				if(mpaa === movie.mpaa_rating) {
					count++;
					executed = true;
					//If there are more than 5 items, move to the second array
					if(count > 5) {
						more += bullet;
					} else {
						out += bullet;
					}
				}
			} else {
				count++;
				executed = true;
				if(count > 5) {
					more += bullet;
				} else {
					out += bullet;
				}
			}
		}
		//Check if it returned any results
		if(!executed) {
			return;
		}
		out += '</ul></div>';
		var items = [[],[]];
		items[0]['a'] = out;
		items[0]['h'] = title;
		items[0]['s'] = 'Rotten Tomatoes';
		items[0]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
		items[0]['force_big_header'] = true;
		items[0]['force_no_fold'] = 1;
		if(rotten.movies[0].posters.profile) {
			items[0]['i'] = rotten.movies[0].posters.profile;
		}
		if(count > 5) {
			more += '</ul></div>';
			items[1]['a'] = more;
			items[1]['t'] = 'More movies...';
			items[1]['s'] = 'Rotten Tomatoes';
			items[1]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
			items[1]['force_big_header'] = true;
			items[1]['force_no_fold'] = 1;
		}
		items
		nra(items);
	}
}

