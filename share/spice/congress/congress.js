function ddg_spice_congress(api_result) {
    console.log(api_result);

    if (api_result.status != "OK" || api_result.results.length == 0) return;

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
    
    var state   = api_result.results[0].state;
    var chamber = api_result.results[0].chamber;

    Spice.render({
        data             : api_result.results[0],
        header1          : 'Members of the ' + state + ' ' + chamber,
        source_url       : "http://topics.nytimes.com/top/reference/timestopics/"
                            + "organizations/c/congress/index.html",
        source_name      : 'The New York Times',
        template_normal  : 'congress',
        force_big_header : true,
    });
}    


/*******************************
  Handlebars helpers
  *******************************/

// Creates a full name for a given representative
Handlebars.registerHelper ('get_name', function() {
    return this.first_name + ' '
            + (this.middle_name ? this.middle_name + ' ' : '')
            + this.last_name;
});

// Returns vote percentage
Handlebars.registerHelper ('votes_pct', function() {
    var pct = parseFloat(this.votes_with_party_pct).toFixed(0);
    return pct + "%";
});
