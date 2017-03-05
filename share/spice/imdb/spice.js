function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = new Array();
        items[0] = new Array();
    
        // Main content and title
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = movie['Title'];

        // Source name and url of the imdb page
        items[0]['s'] = 'IMDB';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];

        // Render
        nra(items);
    } 
}    

function get_snippet(movie) {
    var snippet, div;
    
    snippet = d.createElement('span');
    div = d.createElement('div');
    div.innerHTML = movie['Title'] + " is a " + movie['Year'] + " movie, ";
    div.innerHTML += "rated " + movie['imdbRating'] + ", ";
    div.innerHTML += "starring " + movie['Actors'] + "."; 
    snippet.appendChild(div);

    return snippet;
}
