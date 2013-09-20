function ddg_spice_imdb(api_result) {

    if (!api_result.api_result == 'True') return;

    Spice.render({
        data              : api_result,
        header1           : api_result.Title + ' (IMDb)',
        source_url        : 'http://www.imdb.com/title/'
            + api_result.imdbID,
        source_name       : 'IMDb',
        template_normal   : 'imdb',
        force_big_header  : true,
        force_space_after : true,
        force_no_fold     : true,
    });
}


Handlebars.registerHelper('runtime', function(){
    return (movie.runtime !== 'N/A') ?
    	'' :
    	this.Runtime.replace(/\s/g, '').replace('min', 'm');
});


function reverse(s){
    return s.split("").reverse().join("");
}

function replaceLast(input, a, b) {
    var out = reverse(input).replace(a, reverse(b));
    return reverse(out);
}


/*
 * rating_adjective
 *
 * help make the description of the movie gramatically correct
 * used in reference to the rating of the movie, as in
 *   'an' R rated movie, or
 *   'a'  PG rated movie
 */
Handlebars.registerHelper("rating_adjective", function() {
    var currentDate = new Date();
    var released = this.Released !== 'N/A' ? new Date(this.Released) : -1;
    var adjective;

    // Is it released?
    if ( released > currentDate || this.Year > currentDate.getFullYear() ){
        return 'an upcoming ';
	}

	return ( this.Rated === "R" ||
		this.Rated === "M" || 
		this.Rated === "NC-17" ||
		this.Rated === "N/A" ) ?  "an" :"a";
});


// mpaa_rating
Handlebars.registerHelper('mpaa_rating', function(){
    return (this.Rated === 'N/A') ? 'unrated' : this.Rated;
});


// runtime
Handlebars.registerHelper('get_runtime', function(){
    if (this.Runtime !== 'N/A') {
        var runtime = this.Runtime.replace(/\s+/g, '').replace("min", "m");
        return runtime + ", ";
    }

    return '';
});


// check for movie or tv show
Handlebars.registerHelper('result_type', function(){
    if (this.Type !== "N/A") {
	return this.Type;
    }
    return "title"; //eg, Goodbye Miami (2013) is an unrated title starring...
});


// imdbRating
Handlebars.registerHelper('get_rating', function(){
    return (this.imdbRating !== 'N/A') ?
        this.imdbRating + "/10" :
        "unrated";
});


// actors
Handlebars.registerHelper('actors_and_director', function(){
    if (this.Actors !== 'N/A' && this.Director !== 'N/A') {
	   return "starring " + this.Actors +
              " and directed by " + this.Director;
    }

    else if (this.Actors !== 'N/A'){
        var actors = replaceLast(this.Actors, ',', ' and ');
	return "starring " + actors;
    }

    else if (this.Director !== 'N/A') {
    	return "directed by " + this.Director;
    }

    else {
        return '';
    }
});

// movie plot
Handlebars.registerHelper('plot', function(){
    if (this.Plot !== 'N/A') {
    	return this.Plot;
    }

    return '';
});
