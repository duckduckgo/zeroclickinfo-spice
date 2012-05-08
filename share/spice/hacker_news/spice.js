function ddg_spice_hacker_news (res)
{
    var out = '<div id="hackernews" style="font-size: 83.3%;">';
    var hidden = "";
    var count_hidden = 0;

    if (res["hits"] !== 0){
        for (var i in res["results"]){
            if (res["results"][i]["item"]["type"] === "comment"){
                if (i < 3){                
                    out += discussion (res, i);
                    out += '<br />';
                } else {
                    hidden += discussion (res, i);
                    hidden += '<br />';
                    count_hidden++;
                }
            } else  {
                if (i < 3){
                    out += submission (res, i);
                    out += '<br />';      
                } else {
                    hidden += submission (res, i);
                    hidden += '<br />';
                    count_hidden++;
                }            
            }
        }
    }
    if (count_hidden !== 0)
        out += '<div id="more"> ' + 
                '<a href="javascript:;" onclick="' +
                        "this.parentElement.style.display='none';" +
                        "this.parentElement.nextElementSibling.style.display='block'" +
                        '">More (' + count_hidden + ')</div>' +
                        '<div style="display:none">' +
                              hidden +
                        '</div></div>';
    else 
        out += '</div>';
      
    items = new Array();
	  items[0] = new Array();
	  items[0]['a'] = out;
	  items[0]['h'] = 'Hacker news';
	  items[0]['s'] = 'HackerNews';
	  items[0]['u'] = 'http://news.ycombinator.com/';
	  nra(items);
}

function discussion (res, i)
{
    var out = "";
    if (res["results"][i]["item"]["points"] == 1)
        var points = " point";
    else 
        var points = " points";

    //first line (point, who, link, parent, discussion)
    out += res["results"][i]["item"]["points"] + points + ' by ' +
           '<a href="http://news.ycombinator.com/user?id=' + 
           res["results"][i]["item"]["username"] + '">' + 
           res["results"][i]["item"]["username"] + '</a> | ' +
           '<a href="http://news.ycombinator.com/item?id=' + 
           res["results"][i]["item"]["id"] + '">link</a> | ' +
           '<a href="http://news.ycombinator.com/item?id=' + 
           res["results"][i]["item"]["parent_id"] + '">parent</a> | ' +
           '<a href="http://news.ycombinator.com/item?id=' + 
           res["results"][i]["item"]["discussion"]["id"] + '">on: ' + 
           res["results"][i]["item"]["discussion"]["title"] + '</a> <br />';

    //second line (text)
    out += res["results"][i]["item"]["text"] + '<br />';

    return out;
}

function submission (res, i)
{
    var out = "";

    //first line (title, domain)
    out += '<a href="' + res["results"][i]["item"]["url"] + '">' + 
           res["results"][i]["item"]["title"] + '</a>' + 
           ' ( ' + res["results"][i]["item"]["domain"] + ' ) <br />';

    //second line (points, who, time, comments)
    out += res["results"][i]["item"]["points"] + ' points by ' +
           '<a href="http://news.ycombinator.com/user?id=' + 
           res["results"][i]["item"]["username"] + '"> ' + 
           res["results"][i]["item"]["username"]+ '</a> | ' +
           '<a href="http://news.ycombinator.com/item?id=' +
              res["results"][i]["item"]["id"] + '">' +
              res["results"][i]["item"]["num_comments"] + ' comments </a><br />';

    return out;
}
