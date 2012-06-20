function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = [[]];
        var snippet = get_snippet(movie);
        items[0]['a'] = snippet[0];
        items[0]['h'] = movie['Title'] + " (" + snippet[1] + ")";
        items[0]['s'] = 'IMDb';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];
        items[0]['f'] = 1;
        items[0]['i'] = (movie['Poster'] != "N/A") ? movie['Poster'] : "";
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;

        // Render
        nra(items);
    }
}    

function get_snippet(movie) {
    var snippet, div;
    
    snippet = d.createElement('span');
    div = d.createElement('div');
    
    var rating, releaseDate, currentDate, tempDate, runtime, reviews;
    currentDate = new Date();
    tempDate = (movie["Released"] != "N/A") ? new Date(movie["Released"]) : "";
    runtime = movie["Runtime"].replace(/\s/g, "").replace("min", "m");
    runtime = (runtime === "N/A") ? "" : runtime+", ";

    // Is a release date planned?
    if (tempDate && tempDate > currentDate){
        rating = "an upcoming ";
        releaseDate = tempDate.toDateString().slice(4);
    }
    // Is it upcoming?
    else if (movie["Year"] > currentDate.getFullYear()){
        rating = "an upcoming ";
    }
    // It's already out.
    else if (movie["Rated"] === "R" || movie["Rated"] === "NC-17" || movie["Rated"] === "N/A"){
        rating = "an ";
    }
    else {
        rating = "a ";
    }
    // No releaseDate? releaseDate = year
    releaseDate = (!releaseDate) ? movie["Year"] : releaseDate;

    // Unrated?
    if (movie["Rated"] === "N/A"){
        rating += "Unrated";
    }
    else {
        rating += movie["Rated"];
    }

    // Reviews?
    reviews = (movie['imdbRating'] != "N/A") ? movie['imdbRating']+"/10) " : "None) ";

    div.innerHTML = movie['Title'] + " ("
                  + movie['Year'] + ") "
                  + "is " + rating + " movie ("
                  + runtime
                  + "IMDb rating: " + reviews;
    if (movie['Actors'] && movie['Actors'] != "N/A"){
        div.innerHTML += "starring " + movie['Actors'];
    }

    if (movie["Director"] && movie["Director"] != "N/A"){
        div.innerHTML += ", and directed by " + movie["Director"] + ".";
    } 

    if (movie["Plot"] && movie["Plot"] != "N/A"){
        div.innerHTML += " " + movie["Plot"];
    }

    snippet.appendChild(div);

    return [snippet, releaseDate];
}
