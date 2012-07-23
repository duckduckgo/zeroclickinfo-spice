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

               + '<table id="espn_zci_stats">'
               + '<tr><td>Status:</td><td>' + player.athleteStatus + '</td></tr>'
               + '<tr><td>Position:</td><td>' + player.positions[0].name.toLowerCase() + '</td></tr>'
               + '<tr><td>Height:</td><td>' + player.height + '</td></tr>'
               + '<tr><td>Weight:</td><td>' + player.weight + '</td></tr>'
               + '<tr><td>Born:</td><td>' + player.birthPlace.city + ', ' + player.birthPlace.state + '</td></tr>'
               + '<tr><td></td><td>' + player.dateOfBirth + '</td></tr>'
               + '<tr><td>Weight:</td><td>' + player.weight + '</td></tr>'
               + '<tr><td>Assists:</td><td>' + stats.assists + '</td></tr>'
               + '<tr><td>Blocks:</td><td>' + stats.blocks + '</td></tr>'
               + '<tr><td>Defensive rebounds:</td><td>' + stats.defensiveRebounds + '</td></tr>'
               + '<tr><td>Double double:</td><td>' + stats.doubleDouble + '</td></tr>'
               + '<tr><td>Ejections:</td><td>' + stats.ejections + '</td></tr>'
               + '<tr><td>Field goal percentage:</td><td>' + stats.fieldGoalPercentage + '</td></tr>'
               + '<tr><td>Field goals attempted:</td><td>' + stats.fieldGoalsAttempted + '</td></tr>'
               + '<tr><td>Field goals made:</td><td>' + stats.fieldGoalsMade + '</td></tr>'
               + '<tr><td>Fouls:</td><td>' + stats.fouls + '</td></tr>'
               + '<tr><td>Free throw percentage:</td><td>' + stats.freeThrowPercentage + '</td></tr>'
               + '<tr><td>Free throws attempted:</td><td>' + stats.freeThrowsAttempted + '</td></tr>'
               + '<tr><td>Free throws made:</td><td>' + stats.freeThrowsMade + '</td></tr>'
               + '<tr><td>Games started:</td><td>' + stats.gamesStarted + '</td></tr>'
               + '<tr><td>Minutes:</td><td>' + stats.minutes + '</td></tr>'
               + '<tr><td>Offensive rebounds:</td><td>' + stats.offensiveRebounds + '</td></tr>'
               + '<tr><td>Points:</td><td>' + stats.points + '</td></tr>'
               + '<tr><td>Rebounds:</td><td>' + stats.rebounds + '</td></tr>'
               + '<tr><td>Steals:</td><td>' + stats.steals + '</td></tr>'
               + '<tr><td>Three point percentage:</td><td>' + stats.threePointPercentage + '</td></tr>'
               + '<tr><td>Three pointers attempted:</td><td>' + stats.threePointersAttempted + '</td></tr>'
               + '<tr><td>Three pointers made:</td><td>' + stats.threePointersMade + '</td></tr>'
               + '<tr><td>Triple double:</td><td>' + stats.tripleDouble + '</td></tr>'
               + '<tr><td>Turnovers:</td><td>' + stats.turnovers + '</td></tr>'
               + '</table>'

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
           +  '.tr_odd {'
           +  'background-color:lightgrey;'
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
    YAHOO.util.Event.addListener(ids, "click", function() {
        var current_tab = this.id.replace("_link", "");
        bgtabs.map(function(i){i.style.display="none";});
        console.log(current_tab);
        current_tab = document.getElementById(current_tab);
        current_tab.style.display = "block";
    });
}
