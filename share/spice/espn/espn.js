function ddg_spice_espn_process_stats(player) {
    var season_year;
    if (player.stats.season && player.stats.season.year) {
        season_year = player.stats.season.year;
    } else if (player.stats.season) {
        season_year = player.stats.season.startDate.substr(0,4);
    } else if (player.stats.year && player.stats.year.dates) {
        season_year = player.stats.year.dates;
    }
    console.log(player.stats);
    console.log(season_year);
    if (player.stats.season)
        player.seasonDescription = player.stats.season.description;
    player.seasonTimeFrame   = "'" + ((season_year + '').substr(2, 2) - 1)
                             + "-'" + (season_year + '').substr(2, 2);
    switch (player.sport) {
        case 'basketball':
            player.averagePointsPerGame = (player.stats.points / player.stats.gamesStarted).toFixed(1) + '';
            player.threePointPercentage = ((player.stats.threePointPercentage + 0) * 100).toFixed(1) + '';
            player.fieldGoalPercentage  = player.stats.fieldGoalPercentage.toFixed(1) + '';
            player.freeThrowPercentage  = player.stats.freeThrowPercentage.toFixed(1) + '';
        break;
        case 'hockey':
            player.goals = player.stats.goals;
            player.assists = player.stats.assists;
            player.points = player.stats.points;
            player.averageTimeOnIce = player.stats.averageTimeOnIce;
        break;
        case 'tennis':
            player.rank        = player.stats.year.rank;
            player.matchesWon  = player.stats.year.singlesMatchesWon;
            player.matchesLost = player.stats.year.singlesMatchesLost;
            player.titles      = player.stats.year.singlesTitles;
        break;
        case 'racing':
            player.starts   = player.stats.starts;
            player.lapsLead = player.stats.lapsLead;
            player.wins     = player.stats.wins;
            player.top10s   = player.stats.top10s;
        break;
        case 'golf':
            player.wins              = player.stats.wins;
            player.topTenFinishes    = player.stats.topTenFinishes;
            player.tournamentsPlayed = player.stats.tournamentsPlayed;
            player.cupPoints         = player.stats.cupPoints;
        break;
        case 'soccer':
            player.goals          = player.stats.totalGoals;
            player.shots          = player.stats.totalShots;
            player.starts         = player.stats.starts;
            player.foulsCommitted = player.stats.foulsCommitted;
        break;
        case 'baseball':
            //needs case by case handingly by position played.
        break;
        case 'football':
            //needs case by case handingly by position played.
        break;
    }
}

var player = {};
var numberOfCalls = 1;

function ddg_spice_espn(api_result) {
    var player_info   = api_result.sports[0].leagues[0].athletes[0];

    if (player_info.competitors) {
        player.team       = player_info.competitors[0].team;
        player.teamID     = player.team.id;
        player.teamCity   = player.team.location;
        player.teamName   = player.team.name;
    }

    if (player_info.headshots)
        player.headshot   = player_info.headshots.gamecast.href;

    player.sport  = api_result.sports[0].name;
    player.league = api_result.sports[0].leagues[0].abbreviation;

    player.id     = player_info.id;
    player.name   = player_info.displayName;
    player.stats  = player_info.stats;

    nrj('/js/spice/espn/' + player.sport + '/' + player.league
            + '/athletes/' + player.id + '/news/foo/ddg_spice_espn_news');
    if (player.team) {
        numberOfCalls += 2;
        nrj('/js/spice/espn/' + player.sport + '/' + player.league
                + '/teams/' + player.teamID + '/foo/bar/ddg_spice_espn_team');
        nrj('/js/spice/espn/' + player.sport + '/' + player.league
                + '/teams/' + player.teamID + '/events/dates/ddg_spice_espn_events');
    } else {
        numberOfCalls += 1;
        nrj('/js/spice/espn/' + player.sport + '/' + player.league
                + '/athletes/' + player.id + '/events/dates/ddg_spice_espn_events');
    }

    ddg_spice_espn_process_stats(player);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_news(api_result) {
    player.headline = api_result.headlines.filter(function(article) {
                            if (article.headline && article.source)
                                return true;
                      }).slice(0,3);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(api_result) {
    var record               = api_result.sports[0].leagues[0].teams[0].record;
    var totalGames           = record.wins + record.losses + record.ties;
    player.teamWinPercentage = Math.floor(record.wins / totalGames * 100);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_events(api_result) {
    var events    = api_result.sports[0].leagues[0].events;
    player.events = [];

    for (var i = events.length - 1; i > 0 && player.events.length < 5; i--) {
        var eventDate = new Date(events[i].date);
        if (eventDate.getTime() > new Date().getTime() - 24*60*60*1000)
            continue;
        eventDate.setMonth(eventDate.getMonth()+1);

        if (!events[i].competitions[0]) continue;
        var home, away, win, competitors = events[i].competitions[0].competitors;

        $.map(competitors, function(competitor, index) {
            // this should be rewritten as a switch for clarity
            if (player.team) {
                var teamName = competitor.team.location + ' ' + competitor.team.name;
                competitors[competitor.homeAway] = {
                    'teamName' : teamName,
                    'score'    : competitor.score,
                    'link'     : 'http://espn.go.com/' + player.league + '/team/_/name/'
                                   + (teamName.replace(' ', '').substr(0,3)
                                   + '/' + teamName.replace(' ', '-')).toLowerCase(),
                };
                if (competitor.team.id == player.teamID)
                    win = competitor.score > competitors[index ? 0 : 1].score ? 1 : 0;
                if (index == 1)
                    player.events.push({
                        'date' : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
                        'link' : (events[i].links.web.boxscore ? 
                                    events[i].links.web.boxscore.href : null),
                        'home' : competitors.home,
                        'away' : competitors.away,
                        'win'  : win
                    });
            } else if (competitor.athlete.id == player.id) {
                var place = competitor.athlete.place ?
                                competitor.athlete.place : competitor.place;
                if (place) {
                    player.events.push({
                        'date'  : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
                        'name'  : events[i].competitions[0].name,
                        'place' : DDG.getOrdinal(place),
                        'win'   : place == 1 ? 1 : 0
                    });
                } else {
                    player.events.push({
                        'date'     : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
                        'name'     : events[i].competitions[0].note,
                        'opponent' : competitors[index+1] ?
                                        competitors[index+1].athlete.displayName
                                        : competitors[index-1].athlete.displayName,
                        'win'      : competitor.isWinner
                    });
                }
            }
        });
    }

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (numberOfCalls--) return;
    Spice.render({
        data             : player,
        header1          : player.name + ' (' + player.sport.charAt(0).toUpperCase() + player.sport.slice(1) + ')',
        source_url       : 'http://espn.com/' + player.league + '/player/_/id/' + player.id,
        source_name      : 'ESPN',
        template_normal  : 'espn_' + player.sport,
        force_big_header : true,
        force_no_fold    : true
    });

    var current_tab = $('#espn_zci_news_link')[0];
    $('.espn_zci_tab_link')
        .click(function() {
            $('.espn_zci_tab_link').removeClass('espn_zci_tab_selected');
            current_tab = $(this).addClass('espn_zci_tab_selected')[0];
            $('.espn_zci_tab').each(function() { this.style.display = 'none'; });
            $('#' + this.id.replace('_link', ''))[0].style.display = 'block';
        })
        .mouseenter(function() {
            $(this).addClass('espn_zci_tab_selected');
        })
        .mouseleave(function() {
            if ($(this)[0] !== current_tab)
                $(this).removeClass('espn_zci_tab_selected');
        });
}
