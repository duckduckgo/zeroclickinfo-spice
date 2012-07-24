var items = new Array();
items[0] = new Array();
items[0]['a'] = '';
items[0]['h'] = '';
items[0]['s'] = 'ESPN';
items[0]['u'] = 'http://espn.com';
items[0]['force_big_header'] = 1;

var tabs = '';
var news = '';
var photos = '';
var stats = '';
var gamelog = '';
var videos = '';
var style = '';

function ddg_spice_espn(response) {

    var teams = {};
    teams['5'] = {"name":"Cavaliers", "location":"Cleveland"};
    teams['7'] = {"name":"Nuggets", "location":"Denver"};
    teams['2'] = {"name":"Celtics", "location":"Boston"};
    teams['1'] = {"name":"Hawks", "location":"Atlanta"};
    teams['9'] = {"name":"Warriors", "location":"Golden State"};
    teams['6'] = {"name":"Mavericks", "location":"Dallas"};
    teams['3'] = {"name":"Hornets", "location":"New Orleans"};
    teams['11'] = {"name":"Pacers", "location":"Indiana"};
    teams['99'] = {"name":"All-Stars", "location":"West"};

    player = response.sports[0].leagues[0].athletes[0];
    team = player.positions[0].id;
    stats = player.stats;
    items[0]['h'] = player.displayName + " (ESPN)";

    console.log(player);

    tabs = 'Team: ' + teams[player.positions[0].id]['location'] + " "
         + teams[player.positions[0].id]['name'] + '<br>'
         + (player.schools ? 'College: ' + player.schools[0].name + '<br>' : '')
         // Missing from documentation?
         //+ 'Drafted: ' + 'no info' + '<br>'
         
         + '<span id="espn_zci_news_link">News</span> | '
         + '<span id="espn_zci_photos_link">Photos</span> | '
         + '<span id="espn_zci_stats_link">Stats</span> | '
         + '<span id="espn_zci_gamelog_link">Game Log</span> | '
         + '<span id="espn_zci_videos_link">Videos</span>';

    photos = '<div id="espn_zci_photos">'
           + 'pretty pictures'
           + '</div>';

    playerStats = [ 'assists',
                    'athleteStatus',
                    'height',
                    'weight',
                    'dateOfBirth',
                    'blocks',
                    'defensiveRebounds',
                    'doubleDouble',
                    'ejections',
                    'fieldGoalsMade',
                    'fieldGoalsAttempted',
                    'fieldGoalPercentage',
                    'fouls',
                    'freeThrowsMade',
                    'freeThrowsAttempted',
                    'freeThrowPercentage',
                    'gamesStarted',
                    'minutes',
                    'offensiveRebounds',
                    'points',
                    'rebounds',
                    'steals',
                    'threePointersMade',
                    'threePointersAttempted',
                    'threePointPercentage',
                    'tripleDouble',
                    'turnovers',
                  ];

    function prepareStat(s, index, array) {
        display = s.replace(/([a-z\d](?=[A-Z])|[a-zA-Z](?=\d))/g, "$1 ");
        display = display.toLowerCase();
        display = '<tr><td>'
                + display.charAt(0).toUpperCase() + display.slice(1)
                + ':</td><td>'
                + (player[s] ? player[s] : stats[s])
                + '</td></tr>';
        return display;
    }

    playerStats = playerStats.map(prepareStat);
    var nestedStats = [ 'Birthplace', 'Position' ];
    [ player.birthPlace.state + ', ' + player.birthPlace.city,
      player.positions[0].name,
    ].map(function(s) {
        playerStats.unshift('<tr><td>' + nestedStats.shift()
                          + '</td><td>' + s + '</td></tr>');
    });

    stats  = '<table id="espn_zci_stats">'
           + playerStats.join("")
           + '</table>';

    gamelog = '<div id="espn_zci_gamelog">'
            + 'remember when arsenal tried to walk it in?'
            + '</div>';

    videos = '<div id="espn_zci_videos">'
           + 'moving pictures!'
           + '</div>';


    style = '<style>'
          + '#espn_zci_videos_link, #espn_zci_gamelog_link, '
          + '#espn_zci_stats_link, #espn_zci_photos_link, '
          + '#espn_zci_news_link {'
          + 'font-weight:bold;'
          + '}'
          + '#espn_zci_videos, #espn_zci_gamelog, '
          + '#espn_zci_stats, #espn_zci_photos {'
          + 'display:none; margin-top:5px;'
          + '}'
          + '.tr_odd {'
          + 'background-color:lightgrey;'
          + '}'
          + '</style>';

    nrj("/js/spice/espn/basketball/nba/9/news/ddg_spice_espn_news");
	

}

function ddg_spice_espn_news(response) {
    console.log(response);
    headlines = response.headlines;

    var news = '<div id="espn_zci_news"><ul>'

    for (var i = 0; i < 3 && i < headlines.length; i++) {
        var article = headlines[i];
        news += '<li><a href="' + article.links.web.href
             +  '">' + article.headline + '</a>'
             +  ' (' + article.source + ')</li>';
    }
    news += '</ul>'
         +  '</div>';

    items[0]['a'] = tabs
                  + news
                  + photos
                  + stats
                  + gamelog
                  + videos
                  + style;

	nra(items);
    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    var table = document.getElementById("espn_zci_stats");
    for (var i = 0; i < table.rows.length; i++) {
        if (i % 2 == 0) table.rows[i].className="tr_odd";
    }

    ids = ["espn_zci_videos_link", "espn_zci_gamelog_link",
               "espn_zci_stats_link", "espn_zci_photos_link", "espn_zci_news_link"];
    var bgtabs = [];
    ids.map( function(id) {
        bgtabs.push(document.getElementById(id.replace("_link","")))
    });
    YAHOO.util.Event.addListener(ids, "click", function(e) {
        var current_tab = this.id.replace("_link", "");
        bgtabs.map(function(i){i.style.display="none";});
        current_tab = document.getElementById(current_tab);
        current_tab.style.display = "block";
        e.stopImmediatePropagation();
    });
}
