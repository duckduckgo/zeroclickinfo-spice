//Global Vars
var HN_Global = {};
HN_Global.result   = '';
HN_Global.user_url = '<a href="http://news.ycombinator.com/user?id=';
HN_Global.item_url = '<a href="http://news.ycombinator.com/item?id=';

function ddg_spice_hacker_news(res) {

  var snippet = [];
  var terms   = res["request"]["q"];
  var limit = (res["request"]["limit"] < res["hits"]) ? res["request"]["limit"] : res["hits"];

  //At least 1 result
  if (res["hits"] > 0) {
        
    //Display first 3 stories results
    //and search for Top Comments and 3 more stories to display
    snippet[0] = '';
    snippet[1] = '';
    snippet[2] = '';
    var c0 = 0;
    var c1 = 0;
    var c2 = 0;
    var i  = 0;


    while (i < limit) {

      HN_Global.result = res["results"][i]["item"];
      
      if (HN_Global.result["type"] === "submission" && (c0 < 3 || c2 < 3)){
        if (c0 < 3) {
          snippet[0] += submission(res, i);
          c0++;
        }

        if (c0 === 3 && c2 < 3 && i > 3) {
          snippet[2] += submission(res, i);
          c2++;
        }

      }

      if (HN_Global.result["type"] === "comment" && c1 < 3) {
        snippet[1] += discussion(res, i); 
        c1++;
      }

      if (c0 === 3 && c1 === 3 && c2 === 3 ) break;
      
      i++;
    }
    
    //Check in case only comments returned
    if (c0 === 0){
      i = 0;

      while (i < limit) {
        HN_Global.result = res["results"][i]["item"];
        snippet[0] = (HN_Global.result["type"] === "submission") ? submission(res, i) : discussion(res, i);
        if (c0 === 3) break;
        c0++;
      }
    }

    //Populate items array
    items = [];
    
    for (var i = 0; i < 3; i++) {
      if (snippet[i]) {
        
        items[i] = [];
                
        switch(i){
          case 0: 
                items[i]['a'] = snippet[0];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/all&q=' + encodeURIComponent(res["request"]["q"]);
                break;
          case 1:
                items[i]['a'] = '</br>' + snippet[1];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/comments&q=' + encodeURIComponent(res["request"]["q"]);
                items[i]['t'] = 'Top Comments';
                break;
          case 2:
                items[i]['a'] = '</br>' + snippet[2];
                items[i]['u'] = 'http://www.hnsearch.com/search#request/submissions&q=' + encodeURIComponent(res["request"]["q"]);
                items[i]['t'] = 'Other Stories';
                break;
        }

        items[i]['h'] = 'Hacker News' + ' (' + terms + ')';
        items[i]['s'] = 'HNSearch'; 
        items[i]['f'] = 1;
      }
    }
    
    nra(items);
  }
}

function discussion (res, i) {
   
  var text = shorten(HN_Global.result["text"], 200);
 
  var div  = d.createElement('div');
  var div2 = d.createElement('div');

  var title = shorten(HN_Global.result["discussion"]["title"]);

  //first line (points, who, link, parent, discussion)
  var out = text
          + ' &nbsp;[by&nbsp;' + HN_Global.user_url + HN_Global.result["username"]  + '">'+ HN_Global.result["username"] + '</a>]'
          + ' &nbsp;[' + HN_Global.item_url + HN_Global.result["parent_id"] + '">parent</a>] &nbsp;'
          + HN_Global.item_url + HN_Global.result["discussion"]["id"] + '">' + title + '</a>'
          + '<br />';

  div2.innerHTML = out;
  YAHOO.util.Dom.setStyle(div2, "padding-bottom", '3px'); //Padding for visual separation
  YAHOO.util.Dom.setStyle(div2, "padding-top", '3px');

  div.appendChild(div2);

  return div.innerHTML;
}

function submission (res, i) {
  
  var domain, url;

  var points = (HN_Global.result["points"] === 1) ? HN_Global.result["points"] + ' point' : HN_Global.result["points"] + ' points'

  var div  = d.createElement('div');
  var div2 = d.createElement('div');

  //Check for no external link (ie. Ask HN:)
  if (HN_Global.result["domain"] === null && HN_Global.result["url"] === null) {
    domain = 'news.ycombinator.com';
    url = 'http://news.ycombinator.com/item?id=' + HN_Global.result["id"];
  } else {
    domain = HN_Global.result["domain"];
    url = HN_Global.result["url"];
  } 
 
  var title = shorten(HN_Global.result["title"]);

  //first line (title, domain, points, comments)
  var out = '<a href="' + url + '">' + title + '</a>  &nbsp;'
          + '[' + HN_Global.item_url + HN_Global.result["id"] +'">' + HN_Global.result["num_comments"] +' comments</a>] &nbsp;'
          + '(' + domain + ', ' + points + ')'
          + '<br />';
  
  div2.innerHTML = out;
  YAHOO.util.Dom.setStyle(div2, "padding-bottom", '3px'); //Padding for visual separation
  YAHOO.util.Dom.setStyle(div2, "padding-top", '3px');

  div.appendChild(div2);

  return div.innerHTML;
  //return out;
}

function shorten (string, length) {
  if (length === undefined){
    length = 40;
  }

  if (string.length > length){
    return string.slice(0,length) + '...';
  } else {
    return string;
  }
}