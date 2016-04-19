(function (env) {
    "use strict";
    env.ddg_spice_vrc_teams = function(team_data) {
        if (!team_data || team_data.status !== 1 || team_data.size === 0) {
            return Spice.failed('vrc_teams');
        }

        //infobox data for statistics
        function infobox(ranking, skills){
            var l = []
            if (ranking.status === 1 && ranking.size > 0){
                l.push({heading: 'Qualifying Matches'});
                var total_wins = 0,
                    total_losses = 0,
                    total_ties = 0,
                    total_ccwm = 0.0,
                    max_score = 0,
                    latest = ranking.result[0];

                $.each(ranking.result, function(ind, i){
                    total_wins += parseInt(i.wins);
                    total_losses += parseInt(i.losses);
                    total_ties += parseInt(i.ties);
                    total_ccwm += parseFloat(i.ccwm);
                    max_score = Math.max(max_score, parseInt(i.max_score));
                });

                var total_wlt = total_wins + '-' + total_losses + '-' + total_ties;
                var latest_wlt = latest.wins + '-' + latest.losses + '-' + latest.ties;
                l.push({label: 'Total W-L-T', value: total_wlt});
                l.push({label: 'Latest W-L-T', value: latest_wlt});
                l.push({label: 'Greatest Match Score', value: max_score});

                var average_ccwm = total_ccwm / ranking.size;
                l.push({label: 'Average CCWM', value: average_ccwm.toFixed(2)});
                l.push({label: 'Latest CCWM', value: parseFloat(latest.ccwm).toFixed(2)});
            }
            if (skills.status === 1 && skills.size > 0){
                l.push({heading: 'Best Skills'});
                var best_robot = 0,
                    best_programming = 0;

                $.each(skills.result, function(ind, i){
                    if (i.type === "0" && parseInt(i.score) > best_robot){
                        best_robot = parseInt(i.score);
                    }
                    if (i.type === "1" && parseInt(i.score) > best_programming){
                        best_programming = parseInt(i.score);
                    }
                });

                l.push({label: 'Robot', value: best_robot});
                l.push({label: 'Programming', value: best_programming});
            }

            return l.length ? l : undefined;
        }

        //description data for team location and grade
        function description(team){
            return team.grade + ' team from ' + team.city + ', ' + team.region + ', ' + team.country;
        }

        var team = team_data.result[0], ranking_data, skills_data;

        //the api splits the data up into multiple endpoints, fire them simultaneously
        $.when(
            $.getJSON('/js/spice/vrc/rankings/' + team.number, function(res){
                ranking_data = res;
            }),
            $.getJSON('/js/spice/vrc/skills/' + team.number, function(res){
                skills_data = res;
            })
        ).then(function(){
            Spice.add({
                id: "vrc_teams",
                name: "VRC Team",
                data: team,
                meta: {
                    sourceName: "VexDB.io",
                    sourceUrl: 'http://vexdb.io/teams/view/' + team.number
                },
                normalize: function(item) {
                    return {
                        title: item.team_name,
                        subtitle: item.program + ' Team ' + item.number + ' — ' + item.organisation,
                        description: description(item),
                        infoboxData: infobox(ranking_data, skills_data)
                    };
                },
                templates: {
                    group: 'info',
                    options: {
                        moreAt: true
                    }
                }
            });
        }, function(){
            //one of these requests failed
            Spice.failed('vrc_teams');
        });
    };
}(this));
