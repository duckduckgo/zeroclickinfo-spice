function ddg_spice_congress(response) {

    if (response.status != "OK" || response.results.length == 0) return;

    var stateCodes = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };
    
    var result  = response.results[0];
    var state   = result.state;
    var chamber = result.chamber;

    var members = result.members.map(function(member) {
        member['name'] = member.first_name + ' ' + member.last_name;
                       + (member.middle_name ? member.middle_name : '')
                       + member.last_name;
        member['twitter'] = member.twitter_account;
        member['votes_with_party_pct'] = parseFloat(member.votes_with_party_pct).toFixed(0);
        return member;
    });

    Spice.render({
        data             : { 'member' : members },
        header1          : 'Members of the ' + state + ' ' + chamber,
        source_url       : "http://topics.nytimes.com/top/reference/timestopics/"
                            + "organizations/c/congress/index.html",
        source_name      : 'The New York Times',
        template_normal  : 'congress',
        force_big_header : true,
    });
}    

