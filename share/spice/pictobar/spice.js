function ddg_spice_pictobar(pbr) {
    "use strict";
    var whole, body, mid, td, x, i;
    //check if name is there
    if ((pbr.fname && pbr.lname)) {
        //generates stars
        //numerical data into array
        var outPuts = [pbr.attra, pbr.friend, pbr.open, pbr.self, pbr.thot];
        //array of attribute names
        var attra = ['<tr><td>Attractiveness:</td>', '<tr><td>Friendliness:</td>', '<tr><td>Openness:</td>', '<tr><td>Selflessness:</td>', '<tr><td>Thoughtfulness:</td>'];
        var outString = '';
        var outputString = '';
        var orgLoop = [];
        //loop to define rows for stars and attributes
        for (x = 0; x < 5; x += 1) {
            orgLoop[x] = [];
            orgLoop[x].push(attra[x]);
            //loop to create 5 stars for attributes based on numerical data array
            for (i = 1; i < 6; i += 1) {
                if (i < outPuts[x] + 1) {
                    orgLoop[x][i] = '<td><img src="http://www.pictobar.com/starfill.png" width="10" height="10" /></td>';
                }
                if (i > outPuts[x]) {
                    orgLoop[x][i] = '<td><img src="http://www.pictobar.com/starunfill.png" width="10" height="10" /></td>';
                }
            }
            //add break beteween rows
            orgLoop[x].push('</tr>');
            //convert row to string in order to remove commas in row
            outString[x] = orgLoop[x].toString();
            outputString[x] = outString[x].replace(/,/g, " ");
        }
        //convert row to string in order to remove leftover commas in row
        outString = orgLoop.toString();
        outputString = outString.replace(/,/g, " ");
        //creates table where data is displayed
        body = d.createElement('table');
        body.setAttribute('class', 'all');
        mid = d.createElement('table');
        mid.setAttribute('class', 'alltable');
        td = d.createElement('td');
        td.innerHTML = '<a href="' + pbr.proflink + '"><p>' + pbr.fname + ' ' + pbr.lname + '</p></a><table class="alltable1"><tr><td><center><a href="' + pbr.proflink + '"><img src="' + pbr.piclink + '"  class="imagecirlce" /></a></center></td><td><center>Described by some as:</br>' + pbr.tags + '</center></td><td><center><table width="150" height="60">' + outputString + '</table></center></td></tr><tr><td><a href="' + pbr.proflink + '">View Full Profile</a></br>Gender:' + pbr.gendr + '</br>Total Votes: ' + pbr.totvot + '</td><td>Percent Introversion: ' + pbr.intro + '%</br>Percent Extroversion: ' + pbr.extro + '%</td></tr></table>';
        mid.appendChild(td);
        //body 
        whole = mid;
        var items = [[]];
        items[0] = {
            a: whole,
            h: '',
            s: 'Pictobar',
            u: '',
            i: 'http://www.pictobar.com/images/pbicon.jpg'
        };
        nra(items);
    }
}