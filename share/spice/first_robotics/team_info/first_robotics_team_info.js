(function (env) {
    
    "use strict";
    
    // For testing purposes: teams with
    // no motto: 900
    // everything: 885
    // no rookie year, website or motto: 10
    // no nickname or motto: 800
    
    env.ddg_spice_first_robotics_team_info = function(api_result) {

        if (!api_result || api_result.error || api_result.length === 0 || !api_result.name) {
            return Spice.failed('first_robotics_competition_info');
        }
        
        // Remove the space for a website if one isn't provided
        var template_options = {
            content: 'record',
            moreAt: true
        };
        
        // Get the last year the team competed from a different API call
        $.getJSON('/js/spice/first_robotics/years_competed/' + api_result.team_number, 
                  
            // Only call Spice.add() once the second API call is returned
            function(data) {

                Spice.add({
                    id: 'first_robotics_competition_info',
                    name: 'Reference',
                    data: api_result,
                    meta: {
                        sourceName: 'The Blue Alliance',
                        sourceUrl: 'https://www.thebluealliance.com/team/' + api_result.team_number
                    },
                    normalize: function(item) {
                        var team_data = {
                            'Full name': item.name,
                            'Location': item.location,
                        };
                        
                        // Only show rookie year if it exists
                        if (item.rookie_year && item.rookie_year != null) {
                            team_data['Rookie year'] = item.rookie_year;
                        }
                        
                        // Ditto for last year competed
                        if (data && data.length != 0 && !data.error) {
                            team_data['Last competed'] = data[data.length - 1];
                        }

                        // And motto
                        if (item.motto && item.motto != null) {
                            team_data['Motto'] = item.motto;
                        }
                        
                        // And website
                        var subt = item.nickname;
                        
                        if (item.website && item.website != null) {
                            subt = [item.nickname, {text: 'Team Website', href: item.website}];
                        }

                        return {
                            title: 'FIRST Robotics Competition Team ' + item.team_number,
                            subtitle: subt,
                            record_data: team_data
                        };
                    },
                    templates: {
                        group: 'list',
                        options: template_options
                    }
                });
            });
        
        
        
    };
}(this));
