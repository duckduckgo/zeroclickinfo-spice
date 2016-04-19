(function (env) {
    
    "use strict";
    
    env.ddg_spice_first_robotics_team_info = function(api_result) {

        if (!api_result || api_result.error || api_result.length === 0 || !api_result.name) {
            return Spice.failed('first_robotics_teams');
        }
        
        // Remove the space for a website if one isn't provided
        var template_options = {
            content: 'record',
            moreAt: true
        };

        if (api_result.website && api_result.website != null) {
            template_options.moreText = {
                text: 'Team website',
                href: api_result.website
            };
        }
        
        // Get the last year the team competed from a different API call
        $.getJSON('/js/spice/first_robotics/years_competed/' + api_result.team_number, 
                  
            // Only call Spice.add() once the second API call is returned
            function(data) {

                Spice.add({
                    id: 'first_robotics',
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
                            'Rookie year': item.rookie_year
                        };
                        
                        // Only show the last year competed if there is an array of years
                        if (data && data.length != 0 && !data.error) {
                            team_data['Last competed'] = data[data.length - 1];
                        }

                        // Ditto for motto
                        if (item.motto && item.motto != null) {
                            team_data['Motto'] = item.motto;
                        }

                        return {
                            title: 'FIRST Robotics Competition Team ' + item.team_number,
                            subtitle: item.nickname,
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
