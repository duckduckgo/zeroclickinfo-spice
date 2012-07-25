var items = new Array();
items[0] = new Array();
items[0]['a'] = '';
items[0]['h'] = '';
items[0]['s'] = 'ESPN';
items[0]['u'] = 'http://espn.com';
items[0]['force_big_header'] = 1;
items[0]['f'] = 1;

var tabs = '';
var news = '';
var team = '';
var stats = '';
var gamelog = '';
var videos = '';
var style = '';
var teamID = 0;

var callsMade = 0;
var numberOfCalls = 2;

function ddg_spice_espn(response) {

    var player = response.sports[0].leagues[0].athletes[0];
    var playerTeam = player.competitors[0].team;
    teamID = playerTeam.id;
    stats = player.stats;
    items[0]['u'] = items[0]['u'] + "/nba/player/_/id/" + player.id;
    items[0]['h'] = player.displayName + " - "
                  + playerTeam.location + " "
                  + playerTeam.name
                  + " (ESPN)";

    console.log(player);

    tabs = [ 'news', 'stats', 'team', 'gamelog', 'videos' ];
    tabs = tabs.map(function(s, index, array) {
        return '<span id="espn_zci_' + s + '_link">'
            +  s.charAt(0).toUpperCase() + s.slice(1)
            +  '</span>' + (index == array.length - 1 ? "" : " | ");
    }).join("");

    team = '<div id="espn_zci_team">'
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
                          + ':</td><td>' + s + '</td></tr>');
    });

    stats  = '<table id="espn_zci_stats">'
           + playerStats.join("");
           + '</table>';

    gamelog = '<div id="espn_zci_gamelog">'
            + 'remember when arsenal tried to walk it in?'
            + '</div>';

    videos = '<div id="espn_zci_videos">'
           + 'moving pictures!'
           + '</div>';


    style = '<style>'
          + '#espn_zci_videos_link, #espn_zci_gamelog_link, '
          + '#espn_zci_stats_link, #espn_zci_team_link, '
          + '#espn_zci_news_link {'
          + 'font-weight:bold;'
          + 'padding:5px;'
          + 'text-align:center;'
          + '}'
          + '#espn_zci_videos, #espn_zci_gamelog, '
          + '#espn_zci_stats, #espn_zci_team {'
          + 'display:none; margin-top:5px;margin-bottom:15px;'
          + '}'
          + '.tr_odd {'
          + 'background-color:lightgrey;'
          + '}'
          + '#zero_click_abstract table td {'
          + 'padding-right: 15px;'
          + '}'
          + '#zero_click_abstract table th {'
          + 'color:666666;font-size:12px;font-weight:700;'
          + '}'
          + '</style>';

    nrj("/js/spice/espn/basketball/nba/athletes/"
            + player.id + "/news/foo/ddg_spice_espn_news");
    nrj("/js/spice/espn/basketball/nba/teams/"
            + teamID + "/foo/bar/ddg_spice_espn_team");
}

function ddg_spice_espn_news(response) {
    console.log(response);
    headlines = response.headlines;

    news = '<div id="espn_zci_news"><ul>';

    for (var i = 0; i < 3 && i < headlines.length; i++) {
        var article = headlines[i];
        news += '<li><a href="' + article.links.web.href
             +  '">' + article.headline + '</a>'
             +  ' (' + article.source + ')</li>';
    }
    news += '</ul>'
         +  '</div>';

    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(response) {
    response = response.sports[0].leagues[0].teams[0];
    var record = response.record;
    var stats = response.stats;
    var roster = response.athletes;
    var logo = response.logos.large.href;
    var teamColor = response.color;
    var totalGames = record.wins + record.losses + record.ties;
    var winPercentage = Math.floor(record.wins / totalGames * 100);
    var lossPercentage = Math.floor(record.losses / totalGames * 100);
    var tiePercentage = 100 - winPercentage - lossPercentage;
    var season = record.season.year
               + " (" + record.season.description + " season)";
    console.log(response);
    team = '<div id="espn_zci_team">'
         + '<img style="float:right;" src="' + logo + '">'
         + '<fieldset style="border-top:1px solid #'
         + teamColor + ';padding:10px 10px 20px 10px;width:67%;">'
         + '<legend>&nbsp;' + season + '&nbsp;</legend>'
         + '<div style="background-color:green;width:'
         + winPercentage + '%">&nbsp;' + record.wins + ' wins</div>'
         + '<div style="background-color:red;width:'
         + lossPercentage + '%">&nbsp;' + record.losses + ' losses</div>'
         + (tiePercentage ? 
            '<div style="background-color:grey;width:'
            + tiePercentage + '%">&nbsp;' + record.ties + ' ties</div>'
            : "") + '</fieldset>'
         + '<table style="border-spacing:20px;margin-top:10px;">'
         + '<th>Name</th><th>Position</th><th>No.</th>'
         + '<th>Age</th><th>HT</th><th>WT</th>'
         + roster.map(function(player) {
             return '<tr>'
                    + '<td><a href="/?q='
                    + encodeURIComponent(player.displayName)
                    + '">' + player.displayName + '</td>'
                    + '<td>' + player.positions[0].name + '</td>'
                    + '<td>' + player.jersey + '</td>'
                    + '<td>' + player.age + '</td>'
                    + '<td>' + player.height + '</td>'
                    + '<td>' + player.weight + '</td>'
                    + '</tr>';
         }).join("") + '</table>';
    team += '</div>';

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (++callsMade != numberOfCalls) return;

    items[0]['a'] = tabs
                  + news
                  + team
                  + stats
                  + gamelog
                  + videos
                  + style;

	nra(items);

    var table = document.getElementById("espn_zci_stats");
    for (var i = 0; i < table.rows.length; i++) {
        if (i % 2 == 0) table.rows[i].className="tr_odd";
    }

    ids = [ "espn_zci_videos_link",
            "espn_zci_gamelog_link",
            "espn_zci_stats_link",
            "espn_zci_team_link",
            "espn_zci_news_link"
          ];

    var bgtabs = [];
    ids.map( function(id) {
        bgtabs.push(document.getElementById(id.replace("_link","")))
    });

    var current_link = document.getElementById("espn_zci_news_link");
    YAHOO.util.Dom.setStyle(current_link, "text-decoration", "underline");


    YAHOO.util.Event.addListener(ids, "click", function(e) {
        YAHOO.util.Dom.setStyle(current_link, "text-decoration", "none");
        current_link = this;
        YAHOO.util.Dom.setStyle(this, "text-decoration", "underline");
        var current_tab = this.id.replace("_link", "");
        bgtabs.map(function(i){i.style.display="none";});
        current_tab = document.getElementById(current_tab);
        current_tab.style.display = "block";
        e.stopImmediatePropagation();
    });

    YAHOO.util.Event.addListener(ids, "mouseenter", function(e) {
        YAHOO.util.Dom.setStyle(this, 'text-decoration', 'underline');
    });

    YAHOO.util.Event.addListener(ids, "mouseleave", function(e) {
        if (this != current_link) {
            YAHOO.util.Dom.setStyle(this, 'text-decoration', 'none');
        }
    });
}
