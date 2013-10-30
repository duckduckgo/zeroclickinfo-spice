function ddg_spice_espn_process_stats(ddg_spice_espn_player) {

    // season year, fall back to current year
    var season_year = new Date().getFullYear();
    if (ddg_spice_espn_player.stats.season && ddg_spice_espn_player.stats.season.year) {
        season_year = ddg_spice_espn_player.stats.season.year;
    } else if (ddg_spice_espn_player.stats.season) {
        season_year = ddg_spice_espn_player.stats.season.startDate.substr(0,4);
    } else if (ddg_spice_espn_player.stats.year && ddg_spice_espn_player.stats.year.dates) {
        season_year = ddg_spice_espn_player.stats.year.dates;
    }

    // season description
    if (ddg_spice_espn_player.stats.season && ddg_spice_espn_player.stats.season.description) {
        ddg_spice_espn_player.seasonDescription = ddg_spice_espn_player.stats.season.description;
    }

    // season length
    ddg_spice_espn_player.seasonTimeFrame   = "'" + ((season_year + '').substr(2, 2) - 1)
                             + "-'" + (season_year + '').substr(2, 2);

    // player's sport
    switch (ddg_spice_espn_player.sport) {
        case 'baseball':
	    ddg_spice_espn_player = new BaseballPlayer(ddg_spice_espn_player);
        break;
        case 'basketball':
	    ddg_spice_espn_player = new BasketballPlayer(ddg_spice_espn_player);
        break;
        case 'football':
	    ddg_spice_espn_player = new FootballPlayer(ddg_spice_espn_player);
	break;
        case 'hockey':
	    ddg_spice_espn_player = new HockeyPlayer(ddg_spice_espn_player);
        break;

	// Currently disabled cases...
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
    }

    return ddg_spice_espn_player;
}

var ddg_spice_espn_player = {};
var ddg_spice_espn_calls = 1;

function ddg_spice_espn(api_result) {
    // disable spice on iphone and android mobile
    if (ip || iam) return;
    if (api_result['status'] != 'success') return;
    if (!(api_result.sports && api_result.sports[0] && api_result.sports[0].leagues
                && api_result.sports[0].leagues[0] && api_result.sports[0].leagues[0].athletes
                && api_result.sports[0].leagues[0].athletes[0])) return;
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
    ddg_spice_espn_player.league = api_result.sports[0].leagues[0].abbreviation.toUpperCase();

    if (ddg_spice_espn_player_info.positionsPlayed)
        ddg_spice_espn_player.position = ddg_spice_espn_player_info.positionsPlayed[0].name.toLowerCase();
    else if (ddg_spice_espn_player_info.positions)
        ddg_spice_espn_player.position = ddg_spice_espn_player_info.positions[0].name.toLowerCase();

    ddg_spice_espn_player.id     = ddg_spice_espn_player_info.id;
    ddg_spice_espn_player.name   = ddg_spice_espn_player_info.displayName;

    nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league.toLowerCase()
            + '/athletes/' + ddg_spice_espn_player.id + '/news/foo/ddg_spice_espn_news');
    if (ddg_spice_espn_player.team) {
        ddg_spice_espn_calls += 2;
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league.toLowerCase()
                + '/teams/' + ddg_spice_espn_player.teamID + '/foo/bar/ddg_spice_espn_team');
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league.toLowerCase()
                + '/teams/' + ddg_spice_espn_player.teamID + '/events/dates/ddg_spice_espn_events');
    } else {
        ddg_spice_espn_calls += 1;
        nrj('/js/spice/espn/' + ddg_spice_espn_player.sport + '/' + ddg_spice_espn_player.league.toLowerCase()
                + '/athletes/' + ddg_spice_espn_player.id + '/events/dates/ddg_spice_espn_events');
    }


    // setup player's stats & process them
    ddg_spice_espn_player.stats = ddg_spice_espn_player_info.stats;
    if (ddg_spice_espn_player.stats)
        ddg_spice_espn_player = ddg_spice_espn_process_stats(ddg_spice_espn_player);

    // 20131030 (caine): started a hack to determine if stats were useful
    // and then realized it needed template support so tabling as aspirational
    // for someone else to pick up in redesign..
    /*var statCount = 0;
    var usefulStats = 0;
    for (var stat in ddg_spice_espn_player.stats) {
	// make sure the key comes from the object
	// and not the prototype...
	if (ddg_spice_espn_player.stats.hasOwnProperty(stat)) {
	    statCount++;
	    // stats set to 0 aren't really useful
	    if (ddg_spice_espn_player.stats[stat] > 0) {
		usefulStats++;
	    }
	}
    }
    console.log('statcount: '+statCount, 'useful stat count: '+usefulStats);
    if (statCount > 0) {
	var usefulStatRat = usefulStats / statCount;
	console.log("useful stat ratio: "+usefulStatRat);
    } else {
	console.log('no useful stats at all...');
	ddg_spice_espn_player.stats = false;
    }*/

    ddg_spice_espn_bind();
}

function ddg_spice_espn_news(api_result) {
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
    ddg_spice_espn_player.teamWinPercentage = record.wins && record.wins > 0 &&
	totalGames && totalGames > 0 ? Math.floor(record.wins / totalGames * 100) : 0;

    ddg_spice_espn_bind();
}

function ddg_spice_espn_events(api_result) {
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
                    'link'     : 'http://espn.go.com/' + ddg_spice_espn_player.league.toLowerCase()
                                   + '/team/_/name/' + (teamName.replace(' ', '').substr(0,3)
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
        source_url       : 'http://espn.com/' + ddg_spice_espn_player.league.toLowerCase()
                            + '/player/_/id/' + ddg_spice_espn_player.id,
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


/**
 * Players Types
**/

function BasketballPlayer(player) {
    var stats = player.stats;

    player.averagePointsPerGame = stats.gamesStarted && stats.gamesStarted > 0 && stats.points != undefined ? (stats.points / stats.gamesStarted).toFixed(1) : 0;
    player.threePointPercentage = stats.threePointPercentage ? (stats.threePointPercentage * 100).toFixed(1) : 0;
    player.fieldGoalPercentage = stats.fieldGoalPercentage ? stats.fieldGoalPercentage.toFixed(1) : 0;
    player.freeThrowPercentage = stats.freeThrowPercentage ? stats.freeThrowPercentage.toFixed(1) : 0;

    return player;
}

function HockeyPlayer(player) {
    // For NHL, I would show, Goals, Assists, +/-, Hits (for goalies it
    // would be Record (W/L/T), Save%, GAA. OTL)
    var stats = player.stats;

    switch (player.position) {
    case 'goaltender':
        player.wins = stats.wins ? stats.wins : 0;
        player.losses = stats.losses ? stats.losses : 0;
        player.saves = stats.saves ? stats.saves : 0;
        player.goalsAgainstAverage = stats.goalsAgainstAverage ? stats.goalsAgainstAverage : 0;
        player.overtimeLosses = stats.overtimeLosses ? stats.overtimeLosses : 0;
        break;
    default :
        player.goals = stats.goals ? stats.goals : 0;
        player.assists = stats.assists ? stats.assists : 0;
        player.plusMinus = stats.plusMinus ? stats.plusMinus : 0;
        player.averageTimeOnIce = stats.averageTimeOnIce ? stats.averageTimeOnIce : 0;
    }

    return player;
}

function FootballPlayer(player) {
    var stats = player.stats;

    switch (player.position) {
    case 'quarterback':
        player.role = 'passing';
        stats = stats[player.role];

        player.completionPercentage = stats.completionPercentage ? stats.completionPercentage.toFixed(1) : 0;
        player.passingAttempts = stats.passingAttempts ? stats.passingAttempts : 0;
        player.passingYards = stats.passingYards ? stats.passingYards : 0;
        player.passingTouchdowns = stats.passingTouchdowns ? stats.passingTouchdowns : 0;
        break;
    case 'center':
    case 'offensive guard':
    case 'offensive tackle':
        player.role = 'rushing';
        stats = stats[player.role];

        player.rushingAttempts = stats.rushingAttempts ? stats.rushingAttempts : 0;
        player.rushingYards = stats.rushingYards ? stats.rushingYards : 0;
        player.longRushing = stats.longRushing ? stats.longRushing : 0;
        player.yardsPerRushAttempt = stats.yardsPerRushAttempt ? stats.yardsPerRushAttempt : 0;
        break;
    case 'running back':
    case 'wide receiver':
    case 'tight end':
        player.role = 'receiving';
        stats = stats[player.role];

        player.receptions = stats.receptions ? stats.receptions : 0;
        player.receivingYards = stats.receivingYards ? stats.receivingYards : 0;
        player.fumbles = stats.fumbles ? stats.fumbles : 0;
        player.receivingTouchdowns = stats.receivingTouchdowns ? stats.receivingTouchdowns : 0;
        break;
    case 'defensive tackle':
    case 'defensive end':
    case 'middle linebacker':
    case 'outside linebacker':
    case 'cornerback':
    case 'safety':
    case 'nickelback':
    case 'dimeback':
        player.role = 'defense';
        stats = stats[player.role];

        player.totalTackles = stats.totalTackles ? stats.totalTackles : 0;
        player.passesDefended = stats.passesDefended ? stats.passesDefended : 0;
        player.fumblesForced = stats.fumblesForced ? stats.fumblesForced : 0;
        player.interceptions = stats.interceptions ? stats.interceptions : 0;
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
        player.stats = false;
        break;
    }

    return player;
}

function BaseballPlayer(player) {
    // For MLB, I would show, R, RBI, AVG, SLG (for pitchers it would be
    // W/L, ERA, SO, WHIP - for closers substitute Wins for Saves)
    var stats = player.stats;

    if (stats.slugAverage) {
        player.slugAverage = stats.slugAverage;
    }

    switch (player.position) {
    case 'pitcher':
        player.role = 'pitching';
        stats = stats[player.role];

        player.wins = stats.wins ? stats.wins : 0;
        player.losses = stats.losses ? stats.losses : 0;
        player.ERA = stats.ERA ? stats.ERA : 0;
        player.strikeouts = stats.strikeouts ? stats.strikeouts : 0;
        player.walks = stats.walks ? stats.walks : 0;
        player.runsAgainst = stats.runs ? stats.runs : 0;
        player.innings = stats.fullInnings ? stats.fullInnings : 0;

        player.WHIP = player.innings && player.innings > 0 &&
	    player.walks != undefined || player.runsAgainst != undefined ?
	    ((player.walks + player.runsAgainst) / player.innings).toFixed(2) : 0;

        break;
    case 'catcher':
    case 'first base':
    case 'second base':
    case 'third base':
    case 'shortstop':
    case 'left field':
    case 'center field':
    case 'right field':
        player.role = 'batting';
        stats = stats[player.role];

        player.runs = stats.runs ? stats.runs : 0;
        player.RBIs = stats.RBIs ? stats.RBIs : 0;
        player.average = stats.average ? stats.average : 0;
        player.slugAverage = stats.slugAverage ? stats.slugAverage : 0;
        break;
    }

    return player;
}
