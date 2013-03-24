function ddg_spice_imdb(response) {

    if (!response['Response'] == 'True') return;

    var movie = {};
    var currentDate = new Date();
    var tempDate = response["Released"] != "N/A" ? new Date(response["Released"]) : "";
    movie.runtime = response["Runtime"].replace(/\s/g, "").replace("min", "m");
    movie.runtime = movie.runtime === "N/A" ? "" : movie.runtime + ", ";

    // Is a release date planned?
    if (tempDate && tempDate > currentDate){
        movie.rating = "an upcoming ";
        movie.releaseDate = tempDate.toDateString().slice(4);
    }
    // Is it upcoming?
    else if (response["Year"] > currentDate.getFullYear())
        movie.rating = "an upcoming ";
    // It's already out.
    else if (response["Rated"] === "R" || response["Rated"] === "NC-17" || response["Rated"] === "N/A")
        movie.rating = "an ";
    // otherwise:
    else
        movie.rating = "a ";
    // No releaseDate? releaseDate = year
    movie.releaseDate = !movie.releaseDate ? response["Year"] : releaseDate;

    // Unrated?
    if (response["Rated"] === "N/A") response.rating += "Unrated";
    else movie.rating += response["Rated"];

    // Reviews?
    movie.reviews = (response['imdbRating'] != "N/A") ?
                        response['imdbRating']+"/10) " : "None) ";
    
    movie.title = response['Title'];
    movie.year = response['Year'];

    if (response['Actors'] && response['Actors'] != "N/A")
        movie.actors = response['Actors'];

    if (response["Director"] && response["Director"] != "N/A")
        movie.director = response['Director'];

    if (response["Plot"] && response["Plot"] != "N/A")
        movie.plot = response["Plot"];

    Spice.render({
        data              : movie,
        header1           : movie.title + " (IMDb)",
        source_url        : 'http://www.imdb.com/title/'
                            + response['imdbID'],
        source_name       : 'IMDb',
        template_normal   : 'imdb',
        image             : (response['Poster'] != 'N/A' ?
                                response['Poster'] : ''),
        force_big_header  : true,
        force_space_after : true,
        force_no_fold     : true,
    });
}    
