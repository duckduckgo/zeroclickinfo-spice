function ddg_spice_hacker_news (res)
{
    var out = '';

    if (res["hits"] !== 0){
        for (var i = 0; i < 3; i++){
            if (res["results"][i]["item"]["type"] === "comment"){              
                  out += '<div>' + discussion (res, i) + '</div>';
            } else  {
                  out += '<div>' + submission (res, i); + '</div>';   
            }
            out += '<br />'; 
        }
    }
      
    items = new Array();
	  items[0] = new Array();
	  items[0]['a'] = out;
	  items[0]['h'] = '';
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
              res["results"][i]["item"]["discussion"]["title"] + '</a><br />';

    //second line (text)
    out += '<i><small>' + res["results"][i]["item"]["text"] + '</small></i><br />';

    return out;
}

function submission (res, i)
{
    var out = "";

    //first line (title, domain)
    out += '<a href="' + res["results"][i]["item"]["url"] + '">' + 
              res["results"][i]["item"]["title"] + '</a>' + 
              ' <small>(' + res["results"][i]["item"]["domain"] +  ')</small><br />';

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
