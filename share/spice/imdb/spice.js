function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = [[]];    
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = movie['Title'] + " (" + movie["Year"]+ ")";
        items[0]['s'] = 'IMDB';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];
        items[0]['force_big_header'] = true;

        // Render
        nra(items);
    } 
}    

function get_snippet(movie) {
    var snippet, div;
    
    snippet = d.createElement('span');
    div = d.createElement('div');
    
    var runtime = movie["Runtime"].replace(/\s/g, "").replace("min", "m");
    
    div.innerHTML = movie['Title'] + " is a " + movie['Year'] + " movie ("
                  + movie['imdbRating'] + "/10, "
                  + movie["Rated"] + ", "
                  + runtime + "), "
                  + "starring " + movie['Actors'];
    if (movie["Director"]){
        div.innerHTML += ", and directed by " + movie["Director"];
    } 

    if (movie["Plot"]){
        div.innerHTML += ".<br>Plot: <i>" + movie["Plot"] + "</i>";
    }
    
    snippet.appendChild(div);

    return snippet;
}