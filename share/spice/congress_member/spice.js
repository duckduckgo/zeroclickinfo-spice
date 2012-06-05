//
// This spice must be updated upon elections :-/
//

state = {
    "AL" : "Alabama",
    "AK" : "Alaska",
    "AZ" : "Arizona",
    "AR" : "Arkansas",
    "CA" : "California",
    "CO" : "Colorado",
    "CT" : "Connecticut",
    "DE" : "Delaware",
    "FL" : "Florida",
    "GA" : "Georgia",
    "HI" : "Hawaii",
    "ID" : "Idaho",
    "IL" : "Illinois",
    "IN" : "Indiana",
    "IA" : "Iowa",
    "KS" : "Kansas",
    "KY" : "Kentucky",
    "LA" : "Louisiana",
    "ME" : "Maine",
    "MD" : "Maryland",
    "MA" : "Massachusetts",
    "MI" : "Michigan",
    "MN" : "Minnesota",
    "MS" : "Mississippi",
    "MO" : "Missouri",
    "MT" : "Montana",
    "NE" : "Nebraska",
    "NV" : "Nevada",
    "NH" : "New Hampshire",
    "NJ" : "New Jersey",
    "NM" : "New Mexico",
    "NY" : "New York",
    "NC" : "North Carolina",
    "ND" : "North Dakota",
    "OH" : "Ohio",
    "OK" : "Oklahoma",
    "OR" : "Oregon",
    "PA" : "Pennsylvania",
    "RI" : "Rhode Island",
    "SC" : "South Carolina",
    "SD" : "South Dakota",
    "TN" : "Tennessee",
    "TX" : "Texas",
    "UT" : "Utah",
    "VT" : "Vermont",
    "VA" : "Virginia",
    "WA" : "Washington",
    "WV" : "West Virginia",
    "WI" : "Wisconsin",
    "WY" : "Wyoming"
}

parties = {
    "D" : "Democrat",
    "R" : "Republican"
}

function getOrdinal(n) {
       var s=["th","st","nd","rd"],
       v=n%100;
       return n+(s[(v-20)%10]||s[v]||s[0]);
}

congressMemberItems = new Array();

function ddg_spice_congress_member(response) {
    var member = response.results[0];
    var pronoun = (member.gender == 'M' ? "he" : "she");
    var pronounPosessive = (member.gender == 'M' ? "his" : "her");
    var content = ''; 
    var header = "Congress member ";
    header += (member.url != "" ?
            "<a href='" + member.url + "'>"
                + member.first_name + " " + member.middle_name
                + " " + member.last_name + "</a>"
            : member.first_name + " " + member.middle_name
                + " " + member.last_name);
    header += (member.twitter_id != "" ?
            " (<a href='https://twitter.com/#!/" + member.twitter_id
                + "'>@" + member.twitter_id + "</a>)"
            : "");    
    content += member.first_name + " " + member.middle_name
                + " " + member.last_name;
    content += " is the U.S. Representative for the "
                + getOrdinal(member.roles[0].district)
                + " congressional district of "
                + state[member.roles[0].state] + ".";
    content += " A " + parties[member.roles[0].party] + ", ";
    content += pronoun + " has voted with " + pronounPosessive + " party ";
    content += member.roles[0].votes_with_party_pct + "% of the time.";
    content += "<br>";
    content += "<i>Term</i>: " + member.roles[0].start_date + " - " + member.roles[0].end_date;
    content += "<br>";

    cannonicalDDGURL = '/' + member.first_name + '_' + member.last_name;
    cannonicalDDGURL += '&o=json&callback=ddg_spice_congress_member_picture';
    nrj(cannonicalDDGURL);

	congressMemberItems[0] = new Array();
    congressMemberItems[0]['a'] = content;
	congressMemberItems[0]['h'] = header;
	congressMemberItems[0]['s'] = 'the New York Times';
	congressMemberItems[0]['u'] = 'http://politics.nytimes.com/congress/';
}


function ddg_spice_congress_member_picture(response) {
    if (response.Image != "") {
        congressMemberItems[0]['i'] = response.Image;
    }
    nra(congressMemberItems);
}
