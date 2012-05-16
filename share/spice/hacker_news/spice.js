var result, user_url, item_url;

function ddg_spice_hacker_news(res) {

  var snippet = new Array();

  user_url = '<a href="http://news.ycombinator.com/user?id='
  item_url = '<a href="http://news.ycombinator.com/item?id='

  //At least 1 result
  if (res["hits"] > 0) {  
    
    //Display first result
    result = res["results"][0]["item"];
    snippet[0] = (result["type"] === "comment") ? 'Comment: </br>' +  discussion(res, 0) : 'Discussion: </br>' + submission(res, 0);

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
    
    for (var i = 0; i < 3; i++) {
      if (snippet[i]) {
        items[i] = new Array();
                
        switch(i){
          case 0: 
                items[i]['a'] = snippet[i];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/all&q=' + encodeURIComponent(res["request"]["q"]);
                break;
          case 1:
                items[i]['a'] = '</br>' + snippet[i];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/submissions&q=' + encodeURIComponent(res["request"]["q"]);
                items[i]['t'] = '<i>Other Stories</i>';
                break;
          case 2:
                items[i]['a'] = '</br>' + snippet[i];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/comments&q=' + encodeURIComponent(res["request"]["q"]);
                items[i]['t'] = '<i>Other Comments</i>';
                break;
        }

        items[i]['h'] = 'Hacker News';
        items[i]['s'] = 'HNSearch';
        items[i]['f'] = 1;
      }
    }
        
    nra(items);
  }
}

function discussion (res, i) {
   
  var points = (result["points"] === 1) ? " point" : " points";

  //first line (points, who, link, parent, discussion)
  var out = '<small><i>"' + result["text"] + '"</small></i>'
          + '<br />'
	  //+ result["points"] + points +' by '
          + item_url + result["discussion"]["id"] + '">' + result["discussion"]["title"] + '</a>'
          + ' <small>[' + item_url + result["parent_id"] + '">parent</a>]'
          + ' [comment by ' + user_url + result["username"]  + '">'+ result["username"] + '</a>]</small>'
          + '<br />';
          //+ item_url + result["id"]        + '">link</a> | '
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
 
  var title = shorten(result["title"]);

  //first line (title, domain, points, comments)
  var out = '<a href="' + url + '">' + title + ' </a>'
          + '<small>(' + domain + ', ' + result["points"] + ' points) '
	        + '[' + item_url + result["id"] +'">' + result["num_comments"] +' comments</a>]</small>'
          //+ user_url + result["username"] +'"> ' + result["username"] +'</a> | '
          +'<br />';
  return out;
}

function shorten (string) {
  if (string.length > 50){
    return string.slice(0,50) + '...';
  } else {
    return string;
  }
}