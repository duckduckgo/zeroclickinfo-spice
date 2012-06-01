// How can we still use the Wiki picture & official site for em?
//
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

function getOrdinal(n) {
       var s=["th","st","nd","rd"],
       v=n%100;
       return n+(s[(v-20)%10]||s[v]||s[0]);
}


function ddg_spice_congress_member(response) {
    var member = response.results[0];
    var content = ''; 
    content += member.first_name + " " + member.middle_name + " " + member.last_name;
    content += " is the U.S. Representative for the " + getOrdinal(member.roles[0].district) + " congressional district of " + state[member.roles[0].state] + ".";
    content += "<br>";

    console.log(member);

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = content;
	items[0]['h'] = "Congress";
	items[0]['s'] = 'the New York Times';
	items[0]['u'] = 'http://politics.nytimes.com/congress/';
	
	nra(items);
}
