var tabs = '';
var news = '';
var team = '';
var stats = '';
var gamelog = '';
var headshot = '';
var playerID = 0;
var playerName = '';
var teamID = 0;
var teamCity = '';
var teamName = '';
var teamWinPercentage = 0;
var teamLossPercentage = 0;
var teamTiePercentage = 0;
var baseURL = 'http://espn.com';

var callsMade = 0;
var numberOfCalls = 3;

items = [];
items[0] = [];
items[0]['a'] = '';
items[0]['h'] = '';
items[0]['s'] = 'ESPN';
items[0]['force_big_header'] = 1;
items[0]['force_no_fold'] = 1;

function ddg_spice_espn_team_query(re) {
    var team = re.sports[0].leagues[0].teams[0];
    console.log(team);

    items[0]['a'] = '<br>'
                  + '<img src="/iu/?u=' + team.logos.large.href
                  + '" id="espn_news_image"><ul>';
    items[0]['u'] = baseURL;
    items[0]['h'] = team.location + " " + team.name + " (Basketball)";
    nra(items);
}

function ddg_spice_espn(response) {

    var player = response.sports[0].leagues[0].athletes[0];
    var playerTeam = player.competitors[0].team;
    playerID = player.id;
    headshot = player.headshots.gamecast;
    teamID = playerTeam.id;
    teamCity = playerTeam.location;
    teamName = playerTeam.name;

    nrj("/js/spice/espn/basketball/nba/athletes/"
            + player.id + "/news/foo/ddg_spice_espn_news");
    nrj("/js/spice/espn/basketball/nba/teams/"
            + teamID + "/foo/bar/ddg_spice_espn_team");
    nrj("/js/spice/espn/basketball/nba/teams/"
            + teamID + "/events/dates/ddg_spice_espn_events");

    stats = player.stats;
    playerName = player.displayName;
    items[0]['u'] = baseURL + "/nba/player/_/id/" + playerID;
    items[0]['h'] = '<a href="' + items[0]['u'] + '">'
                  + playerName
                  + '</a>'
                  + ' (Basketball)';

    console.log(player);

    tabs = [ 'news', 'stats', 'gamelog' ];
    tabs = tabs.map(function(s, index, array) {
        return '<span id="espn_zci_' + s + '_link">'
            +  s.charAt(0).toUpperCase() + s.slice(1)
            +  '</span>' + (index == array.length - 1 ? "" : " | ");
    }).join("");

    var playerStats = {
        //'assists'                : 'assists',
        //'athleteStatus'          : 'athleteStatus',
        //'height'                 : 'height',
        //'weight'                 : 'weight',
        //'blocks'                 : 'blocks',
        //'defensiveRebounds'      : 'defensiveRebounds',
        //'doubleDouble'           : 'doubleDouble',
        //'ejections'              : 'ejections',
        //'fieldGoalsMade'         : 'fieldGoalsMade',
        //'fieldGoalsAttempted'    : 'fieldGoalsAttempted',
        //'fouls'                  : 'fouls',
        //'freeThrowsMade'         : 'freeThrowsMade',
        //'freeThrowsAttempted'    : 'freeThrowsAttempted',
        //'gamesStarted'           : 'gamesStarted',
        //'minutes'                : 'minutes',
        //'offensiveRebounds'      : 'offensiveRebounds',
        //'rebounds'               : 'rebounds',
        //'steals'                 : 'steals',
        //'threePointersMade'      : 'threePointersMade',
        //'threePointersAttempted' : 'threePointersAttempted',
        //'tripleDouble'           : 'tripleDouble',
        //'turnovers'              : 'turnovers',
        'points'                 : 'Average Points Per Game',
        'threePointPercentage'   : '3-Point Field Goal Percentage (3P%)',
        'fieldGoalPercentage'    : 'Field Goal Percentage (FG%)',
        'freeThrowPercentage'    : 'Free Throw Percentage (FT%)',
    };

    function prepareStat(display, index, array) {
        stat = (player[display] ? player[display] : stats[display]) + '';
        if (display == 'points') stat = (stat / stats.gamesStarted) + '';
        else if (display == 'threePointPercentage') stat = ((stat + 0) * 100) + '';
        if (display.indexOf('Percentage') != -1) {
            stat = (stat.split('.')[0].length == 1 ? '0' : '')
                    + (Math.round(stat*10)/10).toFixed(1) + '%';
        }
        display = '<tr><th>' + playerStats[display] + ':</th><td>' + stat + '</td></tr>';
        return display;
    }

    var statsHTML = Object.keys(playerStats).map(prepareStat).join('');
    var statsTimeFrame = "'" + ((stats.season.year + '').substr(2, 2) - 1)
                       + "-'" + (stats.season.year + '').substr(2, 2);

    stats  = '<div id="espn_zci_stats">'
           + '<div class="blurb">'
           + playerName + ' '
           + statsTimeFrame + ' '
           + stats.season.description + ' season statistics:'
           + '</div>'
           + '<table>'
           + statsHTML
           + '</table>'
           + '</div>';
}

function ddg_spice_espn_events(response) {
    var events = response.sports[0].leagues[0].events;
    console.log(response);
    test = response;
    gamelog = '<div id="espn_zci_gamelog">'
            + '<div class="blurb">The ' + teamCity + ' ' + teamName
            + ' have won ' + teamWinPercentage + '% of their season games.'
            + '</div><table><tr>'
            + '<th></th><th>Home</th><th></th><th>Away</th>'
            + '<th></th><th></th></tr>';
    var recentGamesFound = 0;
    for (var i = events.length - 1; i > 0 && recentGamesFound < 5; i--) {
        var date = new Date(events[i].date);
        if (date.getTime() > new Date().getTime() - 24*60*60*1000)
            continue;
        recentGamesFound++;
        var competitors = events[i].competitions[0].competitors;
        date.setMonth(date.getMonth()+1);
        var outcome = '';
        gamelog += '<td>' + date.getUTCMonth() + '/' + date.getUTCDate() + '</td>';
        competitors.map(function(competitor, index, array) {
            teamDisplayName = competitor.team.location
                            + " " + competitor.team.name
            gamelog += '<td><a href="/?q='
                    +  encodeURIComponent(teamDisplayName)
                    +  '">' + teamDisplayName + '</a></td><td>'
                    +  (index == 0 ? ' vs ' : '</td>');
            if (index == 1) {
                outcome = competitor.score > array[0].score;
                var win = '<span style="color:green">W</span> ';
                var loss = '<span style="color:red">L</span> ';
                gamelog += '<td>'
                        +  '<a href="' + events[i].links.web.boxscore.href + '">' 
                        +  (competitor.team.id == teamID ?
                                (outcome ? win : loss)
                                + competitor.score
                                + '-' + array[0].score
                            : (outcome ? loss : win)
                                + array[0].score + '-'
                                + competitor.score)
                        +  '</a></td>';
            }
        });
        gamelog += '</tr>';
    }
    gamelog += '</table></div>';
    ddg_spice_espn_bind();

}

function ddg_spice_espn_news(response) {
    console.log(response);
    headlines = response.headlines;

    news = '<div id="espn_zci_news">'
         + '<img src="/iu/?u=' + headshot.href
         + '" height="110"'
         + '" width="150"'
         + '" id="espn_news_image">'
         + '<div class="blurb">'
         + playerName + ' is an American professional basketball player '
         + 'for the ' + teamCity  + ' ' + teamName + ' (NBA).'
         + '</div><ul>';

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
    teamWinPercentage = Math.floor(record.wins / totalGames * 100);
    teamLossPercentage = Math.floor(record.losses / totalGames * 100);
    teamTiePercentage = 100 - teamWinPercentage - teamLossPercentage;
    console.log(response);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (++callsMade != numberOfCalls) return;

    items[0]['a'] = tabs
                  + news
                  + team
                  + stats
                  + gamelog;

	nra(items);

    zci = document.getElementById("zero_click_abstract");
    YAHOO.util.Dom.setStyle(zci, "margin", "4px");
    YAHOO.util.Dom.removeClass(zci, "zero_click_snippet");

    ids = [ "espn_zci_gamelog_link",
            "espn_zci_stats_link",
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

        moreAtLink = YAHOO.util.Dom.getElementsByClassName(
                        "zero_click_more_at_link", "a", zci
                     )[0];

        switch (current_tab.id) {
            case "espn_zci_gamelog":
                moreAtLink.href = baseURL + "/nba/player/gamelog/_/id/"
                                + playerID;
                break;
            case "espn_zci_stats":
                moreAtLink.href = baseURL + "/nba/player/stats/_/id/"
                                + playerID;
                break;
            default:
                moreAtLink.href = baseURL + "/nba/player/_/id/"
                                + playerID;
        }

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
