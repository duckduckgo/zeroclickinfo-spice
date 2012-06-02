function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = new Array();
        items[0] = new Array();
    
        // Main content and title
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = '<b>' + movie['Title'] + '</b>' + ' (' + movie['Year'] + ')';

        // Source name and url of the imdb page
        items[0]['s'] = 'IMDB';
        items[0]['u'] = 'http://www.imdb.com/title/' + movie['imdbID'];

        // Render
        nra(items);
    } 
}    

function get_snippet(movie) {
    var snippet, div;
    var space = "&nbsp;&nbsp;&nbsp;";
    
    snippet = d.createElement('span');

    // Rating, Runtime and IMDB Rating
    div_rating = d.createElement('div');
    div_rating.innerHTML = space + movie['Rated'];
    div_rating.innerHTML+= space + "<big>" + movie['imdbRating'] + "</big>";
    snippet.appendChild(div_rating);

    // Movie plot and actors
    div_plot = d.createElement('div');
    div_plot.innerHTML = movie['Plot'];
    div_plot.innerHTML += " Directed by <i>" + movie['Director'] + "</i>, ";
    div_plot.innerHTML += "starring <i>" + movie['Actors'] + "</i>.";
    
    snippet.appendChild(div_plot);
    
    return snippet;
}
