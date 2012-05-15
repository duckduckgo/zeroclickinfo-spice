var result,user_url,item_url;

function ddg_spice_hacker_news(res) {

  var snippet = new Array();
  user_url = '<a href="http://news.ycombinator.com/user?id='
  item_url = '<a href="http://news.ycombinator.com/item?id='

  //At least 1 result
  if (res["hits"] > 0) {  
    
    //Display first result
    result = res["results"][0]["item"];
    snippet[0] = (result["type"] === "comment") ? discussion(res, 0) : submission(res, 0);

    //Search for 1 Comment and 1 Story to display
    if (res["hits"] > 1) {
      for (var i = 1; i < 10; i++) {       
	result = res["results"][i]["item"];
        
        if (!snippet[1] && result["type"] === "submission") {
          snippet[1] = submission(res, i);
        }

        if (!snippet[2] && result["type"] === "comment") {
          snippet[2] = discussion(res,i); 
        }
           
        if (snippet[1] && snippet[2]) break;
      }
    }

    items = new Array();
    
    items[0] = new Array();
    items[0]['a'] = snippet[0];
    items[0]['h'] = 'Hacker News';
    items[0]['s'] = 'HNSearch';
    items[0]['u'] = 'http://www.hnsearch.com/search#request/all&q=' + res["request"]['q'];
    items[0]['f'] = 1;
    
    var t = 1;
    
    //Check if any extra stories were found
    if (snippet[1]) {
      items[t] = new Array();
      items[t]['a'] = '</br>' + snippet[1];
      items[t]['t'] = 'Related Hacker News Stories';
      items[t]['s'] = 'HNSearch';
      items[t]['u'] = 'http://www.hnsearch.com/search#request/submissions&q=' + res["request"]['q'];
      items[t]['f'] = 1;
      t += 1;
    }
    
    //Check if any extra comments were found
    if (snippet[2]) {
      items[t] = new Array();
      items[t]['a'] = '</br>' + snippet[2];
      items[t]['t'] = 'Related Hacker News Comments';
      items[t]['s'] = 'HNSearch';
      items[t]['u'] = 'http://www.hnsearch.com/search#request/comments&q=' + res["request"]['q'];
      items[t]['f'] = 1;
    }
    
    nra(items);
  }
}

function discussion (res, i) {
   
  var points = (result["points"] === 1) ? " point" : " points";

  //first line (points, who, link, parent, discussion)
  var out = result["points"] + points +' by '
          + user_url + result["username"]  + '">'+ result["username"] +'</a> | '
          + item_url + result["id"]        + '">link</a> | '
          + item_url + result["parent_id"] + '">parent</a> | '
          + item_url + result["discussion"]["id"] + '">on: '+ result["discussion"]["title"] +'</a>'
          + '<br />'
  //second line (text)
          +'<i><small>' + result["text"] + '</small></i>'
          + '<br />';
  return out;
}

function submission (res, i) {
  
  var domain, url;
  var points = (result["points"] === 1) ? " point" : " points"

  //Check for no external link (ie. Ask HN:)
  if (result["domain"] === null && result["url"] === null) {
    domain = 'news.ycombinator.com';
    url = 'http://news.ycombinator.com/item?id=' + result["id"];
  } else {
    domain = result["domain"];
    url = result["url"];
  } 
 
  //first line (title, domain)
  var out = '<a href="' + url + '">' + result["title"] +' </a>'
          +'<small>(' + domain + ')</small>'
          +'<br />'
  //second line (points, who, time, comments)
          + result["points"] +' points by '
          + user_url + result["username"] +'"> ' + result["username"] +'</a> | '
          + item_url + result["id"]       +'"> ' + result["num_comments"] +' comments </a>'
          +'<br />';
  return out;
}
