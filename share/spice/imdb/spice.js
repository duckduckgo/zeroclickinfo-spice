function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = [[]];    
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = movie['Title'] + " (" + movie["Year"]+ ")";
        items[0]['s'] = 'IMDb';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];
        items[0]['f'] = 1;
	    items[0]['i'] = movie['Poster'];
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
    
    var Rating, Score, Runtime;

    if (movie["Runtime"] == "N/A"){
        Runtime = "";
    }else{
        Runtime = " (" + movie["Runtime"].replace(/\s/g, "").replace("min", "m") + ", ";
    }

    if (movie["imdbRating"] == "N/A"){
        Score = "";
    }else{
        Score = "IMDb rating " + movie["imdbRating"].replace(/\s/g, "") + "/10) ";
    }

    if (movie["Rated"] == "N/A"){
        Rating = "unrated";
    } else {
        Rating = movie["Rated"].replace(/\s/g, "");
    }
     
    if (Rating === "R" || Rating === "NC-17" || Rating === "unrated") {
        Rating = "an " + Rating;
    } else {
        Rating = "a " + Rating;
    }
        

    div.innerHTML = movie['Title'] + " ("
                  + movie['Year'] + ") "
                  + "is " + Rating + " movie"
                  + Runtime
                  + Score
                  + " starring " + movie['Actors'];
    if (movie["Director"]){
        div.innerHTML += ", and directed by " + movie["Director"] + ".";
    } 

    if (movie["Plot"]){
        div.innerHTML += " " + movie["Plot"];
    }
    
    snippet.appendChild(div);

    return snippet;
}