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

    console.log(player);

    var answer = 'Team: ' + teams[player.positions[0].id]['location'] + " "
               + teams[player.positions[0].id]['name'] + '<br>'
               + (player.schools ? 'College: ' + player.schools[0].name + '<br>' : '')
               // Missing from documentation?
               //+ 'Drafted: ' + 'no info' + '<br>'
               
               + '<span id="espn_zci_news_link">News</span> | '
               + '<span id="espn_zci_photos_link">Photos</span> | '
               + '<span id="espn_zci_stats_link">Stats</span> | '
               + '<span id="espn_zci_gamelog_link">Game Log</span> | '
               + '<span id="espn_zci_videos_link">Videos</span>'

               + '<div id="espn_zci_news">'
               + '<ul>'
               + '<li>A1 (src1)</li><li>A2 (src2)</li><li>A3 (src3)</li>'
               + '</ul>'
               + '</div>'

               + '<div id="espn_zci_photos">'
               + 'pretty pictures'
               + '</div>'

               + '<div id="espn_zci_stats">'
               + 'Status: ' + player.athleteStatus + '<br>'
               + 'Position: ' + player.positions[0].name.toLowerCase() + '<br>'
               + 'Height: ' + player.height + '<br>'
               + 'Weight: ' + player.weight + '<br>'
               + 'Born: ' + player.birthPlace.city + ', ' + player.birthPlace.state
               + ' ' + player.dateOfBirth + '<br>'
               + 'Weight: ' + player.weight + '<br>'
               + 'Assists: ' + stats.assists + '<br>'
               + 'Blocks: ' + stats.blocks + '<br>'
               + 'Defensive rebounds: ' + stats.defensiveRebounds + '<br>'
               + 'Double double: ' + stats.doubleDouble + '<br>'
               + 'Ejections: ' + stats.ejections + '<br>'
               + 'Field goal percentage: ' + stats.fieldGoalPercentage + '<br>'
               + 'Field goals attempted: ' + stats.fieldGoalsAttempted + '<br>'
               + 'Field goals made: ' + stats.fieldGoalsMade + '<br>'
               + 'Fouls: ' + stats.fouls + '<br>'
               + 'Free throw percentage: ' + stats.freeThrowPercentage + '<br>'
               + 'Free throws attempted: ' + stats.freeThrowsAttempted + '<br>'
               + 'Free throws made: ' + stats.freeThrowsMade + '<br>'
               + 'Games started: ' + stats.gamesStarted + '<br>'
               + 'Minutes: ' + stats.minutes + '<br>'
               + 'Offensive rebounds: ' + stats.offensiveRebounds + '<br>'
               + 'Points: ' + stats.points + '<br>'
               + 'Rebounds: ' + stats.rebounds + '<br>'
               + 'Steals: ' + stats.steals + '<br>'
               + 'Three point percentage: ' + stats.threePointPercentage + '<br>'
               + 'Three pointers attempted: ' + stats.threePointersAttempted + '<br>'
               + 'Three pointers made: ' + stats.threePointersMade + '<br>'
               + 'Triple double: ' + stats.tripleDouble + '<br>'
               + 'Turnovers: ' + stats.turnovers + '<br>'
               + '</div>'

               + '<div id="espn_zci_gamelog">'
               + 'remember when arsenal tried to walk it in?'
               + '</div>'

               + '<div id="espn_zci_videos">'
               + 'moving pictures!'
               + '</div>';


    answer += '<style>'
           +  '#espn_zci_videos_link, #espn_zci_gamelog_link, '
           +  '#espn_zci_stats_link, #espn_zci_photos_link, '
           +  '#espn_zci_news_link {'
           +  'font-weight:bold;'
           +  '}'
           +  '#espn_zci_videos, #espn_zci_gamelog, '
           +  '#espn_zci_stats, #espn_zci_photos {'
           +  'display:none; margin-top:5px;'
           +  '}'
           +  '</style>';

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = player.displayName + " (ESPN)";
	items[0]['s'] = 'ESPN';
	items[0]['u'] = 'http://espn.com';
	items[0]['force_big_header'] = 1;
	
	nra(items);

    var ids = ["espn_zci_videos_link", "espn_zci_gamelog_link",
               "espn_zci_stats_link", "espn_zci_photos_link", "espn_zci_news_link"];
    YAHOO.util.Event.addListener(ids, "click", function() {
        var section = this.id.replace("_link", "");
        var bgtabs = document.getElementById("zero_click_abstract").getElementsByTagName('div');
        for (var i=0; i<bgtabs.length; i++) { bgtabs[i].style.display = "none"; }
        section = document.getElementById(section);
        section.style.display = "block";
    });
}
