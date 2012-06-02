function ddg_spice_imdb(movie) {

    // Validity check
    if (movie['Response'] == 'True') {
        items = new Array();
        items[0] = new Array();
    
        // Main content and title
        items[0]['a'] = get_snippet(movie);
        items[0]['h'] = movie['Title'] + ' (' + movie['Year'] + ')';

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
    div_rating.innerHTML += space + movie['Runtime'];
    div_rating.innerHTML+= space + "<big><b>" + movie['imdbRating'] + "</b></big>";
    snippet.appendChild(div_rating);

    // Movie plot
    div_plot = d.createElement('div');
    div_plot.innerHTML = movie['Plot'];
    snippet.appendChild(div_plot);

    // Director, Writer and Actors
    div_actors = d.createElement('div');
    div_actors.innerHTML = "<b>Director(s):</b>" + space + movie['Director'] + "<br />";
    div_actors.innerHTML += "<b>Writer(s):</b>" + space + movie['Writer'] + "<br />";
    div_actors.innerHTML += "<b>Star(s):</b>" + space + movie['Actors'];
    snippet.appendChild(div_actors);
    
    return snippet;
}
