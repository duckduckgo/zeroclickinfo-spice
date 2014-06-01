function ddg_spice_imdb(api_result) {
    "use strict";

    if (!api_result.api_result == 'True') {
        return Spice.failed("imdb");
    }

    Spice.add({
        data              : api_result,
        header1           : api_result.Title + ' (IMDb)',
        sourceUrl        : 'http://www.imdb.com/title/'
            + api_result.imdbID,
        sourceName       : 'IMDb',
        templates: {
            item: Spice.imdb.imdb,
            detail: Spice.imdb.imdb
        },
        
        
        
    });
}


Handlebars.registerHelper('runtime', function(){
    "use strict";

    return (movie.runtime !== 'N/A') ?
    	'' :
    	this.Runtime.replace(/\s/g, '').replace('min', 'm');
});


function reverse(s){
    "use strict";

    return s.split("").reverse().join("");
}

function replaceLast(input, a, b) {
    "use strict";

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
    "use strict";

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
    "use strict";

    return (this.Rated === 'N/A') ? 'unrated' : this.Rated;
});


// runtime
Handlebars.registerHelper('get_runtime', function(){
    "use strict";

    if (this.Runtime !== 'N/A') {
        var runtime = this.Runtime.replace(/\s+/g, '').replace("min", "m");
        return runtime + ", ";
    }

    return '';
});


// check for movie or tv show
Handlebars.registerHelper('result_type', function(){
    "use strict";

    if (this.Type !== "N/A") {
	return this.Type;
    }
    return "title"; //eg, Goodbye Miami (2013) is an unrated title starring...
});


// imdbRating
Handlebars.registerHelper('get_rating', function(){
    "use strict";

    return (this.imdbRating !== 'N/A') ?
        this.imdbRating + "/10" :
        "unrated";
});


// actors
Handlebars.registerHelper('actors_and_director', function(){
    "use strict";

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
    "use strict";

    if (this.Plot !== 'N/A') {
    	return this.Plot;
    }

    return '';
});
