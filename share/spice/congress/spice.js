function ddg_spice_congress(data) {

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
    
    if (data.status == "OK" && data.results.length > 0) {
        var result = data.results[0];
        var members = result.members;
        var snippet = "<ul>";
        for (var i = 0; i < members.length; i++) {
            var member = members[i];
            var name = "";
            var normalized_name = "";
            if (member.middle_name) {
                name = member.first_name + " " + member.middle_name + " "
                    + member.last_name;
            } else {
                name = member.first_name + " " + member.last_name;
            }
            var twitter = null;
            if (member.twitter_account) {
                twitter = "@" + member.twitter_account;
            }
            snippet += "<li><a href=\""
                + "/?q=" + escape(name) + "\">"
                + "(" + member.party + ") "
                + name
                + "</a> &mdash; ";
            if (twitter) {
                snippet += "<a href=\"http://www.twitter.com/"
                    + member.twitter_account + "\">" + twitter + "</a><br>" 
            }
            snippet += "votes with party on "
                + parseFloat(member.votes_with_party_pct).toFixed(0)
                + "% of issues"
                + ', next election in ' + member.next_election;
            if (member.district) {
                snippet += ' (district ' + member.district + ')';
            }
            snippet += "</li>";
        }
        snippet += "</ul>";

        var title = "Members of the " + stateCodes[result.state] + " " + result.chamber;
        var source = "The New York Times";
        var url = "http://topics.nytimes.com/top/reference/timestopics/"
            + "organizations/c/congress/index.html";

        // Required by DuckDuckGo
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = title;
        items[0]['s'] = source;
        items[0]['u'] = url;
        items[0]['force_big_header'] = true;
        nra(items);
    }
}    

