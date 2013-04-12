var player = {};
var callsMade = 0;
var numberOfCalls = 3;

function ddg_spice_espn(api_result) {
    console.log('ddg_spice_espn');
    console.log(api_result);

    var player_info   = api_result.sports[0].leagues[0].athletes[0];
    var playerTeam    = player_info.competitors[0].team;
    var baseURL       = 'http://espn.com';

    player.id         = player_info.id;
    player.name = player_info.displayName;
    player.headshot   = player_info.headshots.gamecast.href;
    //player.stats      = player_info.stats;
    player.teamID     = playerTeam.id;
    player.teamCity   = playerTeam.location;
    player.teamName   = playerTeam.name;

    player.more_link  = baseURL + '/nba/player/_/id/' + player.id;

    nrj('/js/spice/espn/basketball/nba/athletes/'
            + player.id + '/news/foo/ddg_spice_espn_news');
    nrj('/js/spice/espn/basketball/nba/teams/'
            + player.teamID + '/foo/bar/ddg_spice_espn_team');
    nrj('/js/spice/espn/basketball/nba/teams/'
            + player.teamID + '/events/dates/ddg_spice_espn_events');
    ddg_spice_espn_bind();
}

function ddg_spice_espn_news(api_result) {
    console.log('ddg_spice_espn_news');
    console.log(api_result);
    console.log("headline");
    console.log(api_result.headlines);

    player.headline = api_result.headlines.slice(0,3);
    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(api_result) {
    console.log('ddg_spice_espn_team');
    console.log(api_result);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_events(api_result) {
    console.log('ddg_spice_espn_events');
    console.log(api_result);

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (callsMade++ != numberOfCalls) return;
    Spice.render({
        data             : player,
        //header1          : '<a href="' + player.more_link + '">'+ player.name + '</a>' + ' (Basketball),
        header1          : player.name + ' (Basketball)',
        source_url       : player.more_link,
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
