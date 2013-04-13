var player = {};
var numberOfCalls = 3;

function ddg_spice_espn(api_result) {
    console.log('ddg_spice_espn');
    console.log(api_result);

    var player_info   = api_result.sports[0].leagues[0].athletes[0];
    var playerTeam    = player_info.competitors[0].team;

    player.id         = player_info.id;
    player.name       = player_info.displayName;
    player.headshot   = player_info.headshots.gamecast.href;
    player.stats      = player_info.stats;
    player.teamID     = playerTeam.id;
    player.teamCity   = playerTeam.location;
    player.teamName   = playerTeam.name;

    nrj('/js/spice/espn/basketball/nba/athletes/'
            + player.id + '/news/foo/ddg_spice_espn_news');
    nrj('/js/spice/espn/basketball/nba/teams/'
            + player.teamID + '/foo/bar/ddg_spice_espn_team');
    nrj('/js/spice/espn/basketball/nba/teams/'
            + player.teamID + '/events/dates/ddg_spice_espn_events');

    player.seasonDescription = player.stats.season.description;
    player.seasonTimeFrame   = "'" + ((player.stats.season.year + '').substr(2, 2) - 1)
                             + "-'" + (player.stats.season.year + '').substr(2, 2);

    player.averagePointsPerGame = (player.stats.points / player.stats.gamesStarted).toFixed(1) + '';
    player.threePointPercentage = ((player.stats.threePointPercentage + 0) * 100).toFixed(1) + '';
    player.fieldGoalPercentage  = player.stats.fieldGoalPercentage.toFixed(1) + '';
    player.freeThrowPercentage  = player.stats.freeThrowPercentage.toFixed(1) + '';

    ddg_spice_espn_bind();
}

function ddg_spice_espn_news(api_result) {
    console.log('ddg_spice_espn_news');
    console.log(api_result);

    player.headline = api_result.headlines.filter(function(article) {
                            if (article.headline && article.source)
                                return true;
                      }).slice(0,3);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(api_result) {
    console.log('ddg_spice_espn_team');
    console.log(api_result);

    var record               = api_result.sports[0].leagues[0].teams[0].record;
    var totalGames           = record.wins + record.losses + record.ties;
    player.teamWinPercentage = Math.floor(record.wins / totalGames * 100);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_events(api_result) {
    console.log('ddg_spice_espn_events');
    console.log(api_result);

    var events    = api_result.sports[0].leagues[0].events;
    player.events = [];

    for (var i = events.length - 1; i > 0 && player.events.length < 5; i--) {
        var eventDate = new Date(events[i].date);
        if (eventDate.getTime() > new Date().getTime() - 24*60*60*1000)
            continue;
        eventDate.setMonth(eventDate.getMonth()+1);

        var home, away, win, competitors = events[i].competitions[0].competitors;

        competitors.map(function(competitor, index, array) {
            var teamName = competitor.team.location + ' ' + competitor.team.name;
            competitors[competitor.homeAway] = {
                'teamName' : teamName,
                'score'    : competitor.score,
                'link'     : 'http://espn.go.com/nba/team/_/name/'
                               + (teamName.replace(' ', '').substr(0,3)
                               + '/' + teamName.replace(' ', '-')).toLowerCase(),
            };
            if (competitor.team.id == player.teamID)
                win = competitor.score > array[index ? 0 : 1].score ? 1 : 0;
        });

        player.events.push({
            'date' : eventDate.getUTCMonth() + '/' + eventDate.getUTCDate(),
            'link' : events[i].links.web.boxscore.href,
            'home' : competitors.home,
            'away' : competitors.away,
            'win'  : win
        });
    }

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (numberOfCalls--) return;
    Spice.render({
        data             : player,
        //header1          : '<a href="' + player.more_link + '">'+ player.name + '</a>' + ' (Basketball),
        header1          : player.name + ' (Basketball)',
        source_url       : 'http://espn.com/nba/player/_/id/' + player.id,
        source_name      : 'ESPN',
        template_normal  : 'espn',
        force_big_header : true
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
