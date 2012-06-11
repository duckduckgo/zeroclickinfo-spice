function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = [[]];    
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = movie['Title'] + " (" + movie["Year"]+ ")";
        items[0]['s'] = 'IMDb';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];
        items[0]['f'] = 1;
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
    
    var runtime = movie["Runtime"].replace(/\s/g, "").replace("min", "m");
    var rating;
    
    if (movie["Rated"] === "R" || movie["Rated"] === "NC-17"){
        rating = "an ";
    } else {
        rating = "a "
    }

    rating += movie["Rated"]
    
    div.innerHTML = movie['Title'] + " ("
                  + movie['Year'] + ") "
                  + "is " + rating + " movie ("
                  + runtime + ", "
                  + "IMDb rating " + movie['imdbRating'] + "/10) "
                  + "starring " + movie['Actors'];
    if (movie["Director"]){
        div.innerHTML += ", and directed by " + movie["Director"] + ".";
    } 

    if (movie["Plot"]){
        div.innerHTML += "<br>" + movie["Plot"];
    }
    
    snippet.appendChild(div);

    return snippet;
}