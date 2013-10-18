function ddg_spice_espn_process_stats(ddg_spice_espn_player) {
    var season_year;
    if (ddg_spice_espn_player.stats.season && ddg_spice_espn_player.stats.season.year) {
        season_year = ddg_spice_espn_player.stats.season.year;
    } else if (ddg_spice_espn_player.stats.season) {
        season_year = ddg_spice_espn_player.stats.season.startDate.substr(0,4);
    } else if (ddg_spice_espn_player.stats.year && ddg_spice_espn_player.stats.year.dates) {
        season_year = ddg_spice_espn_player.stats.year.dates;
    }
    if (ddg_spice_espn_player.stats.season)
        ddg_spice_espn_player.seasonDescription = ddg_spice_espn_player.stats.season.description;
    ddg_spice_espn_player.seasonTimeFrame   = "'" + ((season_year + '').substr(2, 2) - 1)
                             + "-'" + (season_year + '').substr(2, 2);
    console.log('stats', ddg_spice_espn_player.stats);
    switch (ddg_spice_espn_player.sport) {
        case 'basketball':
            ddg_spice_espn_player.averagePointsPerGame =
                (ddg_spice_espn_player.stats.points / ddg_spice_espn_player.stats.gamesStarted).toFixed(1) + '';
            ddg_spice_espn_player.threePointPercentage=
                ((ddg_spice_espn_player.stats.threePointPercentage + 0) * 100).toFixed(1) + '';
            ddg_spice_espn_player.fieldGoalPercentage =
                ddg_spice_espn_player.stats.fieldGoalPercentage.toFixed(1) + '';
            ddg_spice_espn_player.freeThrowPercentage =
                ddg_spice_espn_player.stats.freeThrowPercentage.toFixed(1) + '';
        break;
        // For NHL, I would show, Goals, Assists, +/-, Hits (for goalies it
        // would be Record (W/L/T), Save%, GAA. OTL)
        case 'hockey':
            switch (ddg_spice_espn_player.position) {
                case 'center':
                case 'left wing':
                case 'defense':
                    ddg_spice_espn_player.goals = ddg_spice_espn_player.stats.goals;
                    ddg_spice_espn_player.assists = ddg_spice_espn_player.stats.assists;
                    ddg_spice_espn_player.plusMinus = ddg_spice_espn_player.stats.plusMinus;
                    ddg_spice_espn_player.averageTimeOnIce = ddg_spice_espn_player.stats.averageTimeOnIce;
                break;
                case 'goaltender':
                    ddg_spice_espn_player.wins = ddg_spice_espn_player.stats.wins;
                    ddg_spice_espn_player.losses = ddg_spice_espn_player.stats.losses;
                    ddg_spice_espn_player.saves = ddg_spice_espn_player.stats.saves;
                    ddg_spice_espn_player.goalsAgainstAverage = ddg_spice_espn_player.stats.goalsAgainstAverage;
                    ddg_spice_espn_player.overtimeLosses = ddg_spice_espn_player.stats.overtimeLosses;
                break;
            }
        break;
        case 'tennis':
            ddg_spice_espn_player.rank        = ddg_spice_espn_player.stats.year.rank;
            ddg_spice_espn_player.matchesWon  = ddg_spice_espn_player.stats.year.singlesMatchesWon;
            ddg_spice_espn_player.matchesLost = ddg_spice_espn_player.stats.year.singlesMatchesLost;
            ddg_spice_espn_player.titles      = ddg_spice_espn_player.stats.year.singlesTitles;
        break;
        case 'racing':
            ddg_spice_espn_player.starts   = ddg_spice_espn_player.stats.starts;
            ddg_spice_espn_player.lapsLead = ddg_spice_espn_player.stats.lapsLead;
            ddg_spice_espn_player.wins     = ddg_spice_espn_player.stats.wins;
            ddg_spice_espn_player.top10s   = ddg_spice_espn_player.stats.top10s;
        break;
        case 'golf':
            ddg_spice_espn_player.wins              = ddg_spice_espn_player.stats.wins;
            ddg_spice_espn_player.topTenFinishes    = ddg_spice_espn_player.stats.topTenFinishes;
            ddg_spice_espn_player.tournamentsPlayed = ddg_spice_espn_player.stats.tournamentsPlayed;
            ddg_spice_espn_player.cupPoints         = ddg_spice_espn_player.stats.cupPoints;
        break;
        case 'soccer':
            ddg_spice_espn_player.goals          = ddg_spice_espn_player.stats.totalGoals;
            ddg_spice_espn_player.shots          = ddg_spice_espn_player.stats.totalShots;
            ddg_spice_espn_player.starts         = ddg_spice_espn_player.stats.starts;
            ddg_spice_espn_player.foulsCommitted = ddg_spice_espn_player.stats.foulsCommitted;
        break;
        case 'football':
            switch (ddg_spice_espn_player.position) {
                case 'quarterback':
                    ddg_spice_espn_player.role = 'passing';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    if (!ddg_spice_espn_player.stats) return;
                    ddg_spice_espn_player.completionPercentage = ddg_spice_espn_player.stats.completionPercentage;
                    ddg_spice_espn_player.passingAttempts = ddg_spice_espn_player.stats.passingAttempts;
                    ddg_spice_espn_player.passingYards = ddg_spice_espn_player.stats.passingYards;
                    ddg_spice_espn_player.passingTouchdowns = ddg_spice_espn_player.stats.passingTouchdowns;
                break;
                case 'center':
                case 'offensive guard':
                case 'offensive tackle':
                    ddg_spice_espn_player.role = 'rushing';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    if (!ddg_spice_espn_player.stats) return;
                    ddg_spice_espn_player.rushingAttempts = ddg_spice_espn_player.stats.rushingAttempts;
                    ddg_spice_espn_player.rushingYards = ddg_spice_espn_player.stats.rushingYards;
                    ddg_spice_espn_player.longRushing = ddg_spice_espn_player.stats.longRushing;
                    ddg_spice_espn_player.yardsPerRushAttempt = ddg_spice_espn_player.stats.yardsPerRushAttempt;
                break;
                case 'running back':
                case 'wide receiver':
                case 'tight end':
                    ddg_spice_espn_player.role = 'receiving';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    if (!ddg_spice_espn_player.stats) return;
                    ddg_spice_espn_player.receptions = ddg_spice_espn_player.stats.receptions;
                    ddg_spice_espn_player.receivingYards = ddg_spice_espn_player.stats.receivingYards;
                    ddg_spice_espn_player.fumbles = ddg_spice_espn_player.stats.fumbles;
                    ddg_spice_espn_player.receivingTouchdowns = ddg_spice_espn_player.stats.receivingTouchdowns;
                break;
                case 'defensive tackle':
                case 'defensive end':
                case 'middle linebacker':
                case 'outside linebacker':
                case 'cornerback':
                case 'safety':
                case 'nickelback':
                case 'dimeback':
                    ddg_spice_espn_player.role = 'defense';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    if (!ddg_spice_espn_player.stats) return;
                    ddg_spice_espn_player.totalTackles = ddg_spice_espn_player.stats.totalTackles;
                    ddg_spice_espn_player.passesDefended = ddg_spice_espn_player.stats.passesDefended;
                    ddg_spice_espn_player.fumblesForced = ddg_spice_espn_player.stats.fumblesForced;
                    ddg_spice_espn_player.interceptions = ddg_spice_espn_player.stats.interceptions;
                break;
                case 'kicker':
                case 'holder':
                case 'long snapper':
                case 'punter':
                case 'kick returner':
                case 'upback':
                case 'gunner':
                    // these positions, when not supplementary, do not appear to have stats from espn,
                    // so skip the stats tab. See "steve weatherford" for an example.
                    ddg_spice_espn_player.stats = false;
                break;
            }
        break;
        // For MLB, I would show, R, RBI, AVG, SLG (for pitchers it would be
        // W/L, ERA, SO, WHIP - for closers substitute Wins for Saves)
        case 'baseball':
            if (ddg_spice_espn_player.stats.slugAverage)
                ddg_spice_espn_player.slugAverage = ddg_spice_espn_player.stats.slugAverage;
            switch (ddg_spice_espn_player.position) {
                case 'pitcher':
                    ddg_spice_espn_player.role = 'pitching';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    ddg_spice_espn_player.wins = ddg_spice_espn_player.stats.wins;
                    ddg_spice_espn_player.losses = ddg_spice_espn_player.stats.losses;
                    ddg_spice_espn_player.ERA = ddg_spice_espn_player.stats.ERA;
                    ddg_spice_espn_player.strikeouts = ddg_spice_espn_player.stats.strikeouts;
                    ddg_spice_espn_player.walks = ddg_spice_espn_player.stats.walks;
                    ddg_spice_espn_player.runsAgainst = ddg_spice_espn_player.stats.runs;
                    ddg_spice_espn_player.innings = ddg_spice_espn_player.stats.fullInnings;
                    ddg_spice_espn_player.WHIP =
                        ((ddg_spice_espn_player.walks + ddg_spice_espn_player.runsAgainst)
                            / ddg_spice_espn_player.innings).toFixed(2);
                break;
                case 'catcher':
                case 'first base':
                case 'second base':
                case 'third base':
                case 'shortstop':
                case 'left field':
                case 'center field':
                case 'right field':
                    ddg_spice_espn_player.role = 'batting';
                    ddg_spice_espn_player.stats = ddg_spice_espn_player.stats[ddg_spice_espn_player.role];
                    ddg_spice_espn_player.runs = ddg_spice_espn_player.stats.runs;
                    ddg_spice_espn_player.RBIs = ddg_spice_espn_player.stats.RBIs;
                    ddg_spice_espn_player.average = ddg_spice_espn_player.statsaverage;
                    ddg_spice_espn_player.slugAverage = ddg_spice_espn_player.stats.slugAverage;
                break;
            }
        break;
    }
    console.log(ddg_spice_espn_player);
}

var ddg_spice_espn_player = {};
var ddg_spice_espn_calls = 1;

function ddg_spice_espn(api_result) {
    console.log('player', api_result);
    var ddg_spice_espn_player_info   = api_result.sports[0].leagues[0].athletes[0];

    if (ddg_spice_espn_player_info.competitors) {
        ddg_spice_espn_player.team       = ddg_spice_espn_player_info.competitors[0].team;
        ddg_spice_espn_player.teamID     = ddg_spice_espn_player.team.id;
        ddg_spice_espn_player.teamCity   = ddg_spice_espn_player.team.location;
        ddg_spice_espn_player.teamName   = ddg_spice_espn_player.team.name;
    }

    if (ddg_spice_espn_player_info.headshots)
        ddg_spice_espn_player.headshot =
            encodeURIComponent(ddg_spice_espn_player_info.headshots.gamecast.href);

    ddg_spice_espn_player.sport  = api_result.sports[0].name;
    ddg_spice_espn_player.league = api_result.sports[0].leagues[0].abbreviation;

    if (ddg_spice_espn_player_info.positionsPlayed)
        ddg_spice_espn_player.position = ddg_spice_espn_player_info.positionsPlayed[0].name.toLowerCase();
    else if (ddg_spice_espn_player_info.positions)
        ddg_spice_espn_player.position = ddg_spice_espn_player_info.positions[0].name.toLowerCase();

    ddg_spice_espn_player.id     = ddg_spice_espn_player_info.id;
    ddg_spice_espn_player.name   = ddg_spice_espn_player_info.displayName;

    nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league
            + '/athletes/' + ddg_spice_espn_player.id + '/news/foo/ddg_spice_espn_news');
    if (ddg_spice_espn_player.team) {
        ddg_spice_espn_calls += 2;
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league
                + '/teams/' + ddg_spice_espn_player.teamID + '/foo/bar/ddg_spice_espn_team');
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league
                + '/teams/' + ddg_spice_espn_player.teamID + '/events/dates/ddg_spice_espn_events');
    } else {
        ddg_spice_espn_calls += 1;
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league
                + '/athletes/' + ddg_spice_espn_player.id + '/events/dates/ddg_spice_espn_events');
    }


    if (ddg_spice_espn_player_info.stats) {
        ddg_spice_espn_player.stats = ddg_spice_espn_player_info.stats;
        ddg_spice_espn_process_stats(ddg_spice_espn_player);
    }

    ddg_spice_espn_bind();
}

function ddg_spice_espn_news(api_result) {
    console.log('news', api_result);
    ddg_spice_espn_player.headline =
        $(api_result.headlines).filter(function(i, article) {
            if (article.headline && article.source) {
                article.headline = DDG.strip_html(article.headline);
                article.source = DDG.strip_html(article.source);
                return true;
            }
        }).get().slice(0,3);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(api_result) {
    var record               = api_result.sports[0].leagues[0].teams[0].record;
    var totalGames           = record.wins + record.losses + record.ties;
    ddg_spice_espn_player.teamWinPercentage = Math.floor(record.wins / totalGames * 100);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_events(api_result) {
    console.log('events', api_result);
    var events    = api_result.sports[0].leagues[0].events;
    ddg_spice_espn_player.events = [];

    for (var i = events.length - 1; i > 0 && ddg_spice_espn_player.events.length < 5; i--) {
        var eventDate = new Date(events[i].date);
        if (eventDate.getTime() > new Date().getTime() - 24*60*60*1000)
            continue;
        eventDate.setMonth(eventDate.getMonth()+1);

        if (!events[i].competitions[0]) continue;
        var home, away, win, competitors = events[i].competitions[0].competitors;

        $.map(competitors, function(competitor, index) {
            // this should be rewritten as a switch for clarity
            if (ddg_spice_espn_player.team) {
                var teamName = competitor.team.location + ' ' + competitor.team.name;
                competitors[competitor.homeAway] = {
                    'teamName' : teamName,
                    'score'    : competitor.score,
                    'link'     : 'http://espn.go.com/' + ddg_spice_espn_player.league + '/team/_/name/'
                                   + (teamName.replace(' ', '').substr(0,3)
                                   + '/' + teamName.replace(' ', '-')).toLowerCase(),
                };
                if (competitor.team.id == ddg_spice_espn_player.teamID)
                    win = competitor.score > competitors[index ? 0 : 1].score ? 1 : 0;
                if (index == 1)
                    ddg_spice_espn_player.events.push({
                        'date' : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
                        'link' : (events[i].links.web.boxscore ? 
                                    events[i].links.web.boxscore.href : null),
                        'home' : competitors.home,
                        'away' : competitors.away,
                        'win'  : win
                    });
            } else if (competitor.athlete.id == ddg_spice_espn_player.id) {
                var place = competitor.athlete.place ?
                                competitor.athlete.place : competitor.place;
                if (place) {
                    ddg_spice_espn_player.events.push({
                        'date'  : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
                        'name'  : events[i].competitions[0].name,
                        'place' : DDG.getOrdinal(place),
                        'win'   : place == 1 ? 1 : 0
                    });
                } else {
                    ddg_spice_espn_player.events.push({
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
    if (ddg_spice_espn_calls--) return;
    Spice.render({
        data             : ddg_spice_espn_player,
        header1          : ddg_spice_espn_player.name + ' ('
                            + ddg_spice_espn_player.sport.charAt(0).toUpperCase()
                            + ddg_spice_espn_player.sport.slice(1) + ')',
        source_url       : 'http://espn.com/' + ddg_spice_espn_player.league
                            + '/ddg_spice_espn_player/_/id/' + ddg_spice_espn_player.id,
        source_name      : 'ESPN',
        template_normal  : 'espn_' + ddg_spice_espn_player.sport,
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
