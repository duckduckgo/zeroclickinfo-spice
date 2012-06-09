items = [[]];

function ddg_spice_facebook (res)
{
    var out = "";
    
    if (res['id'] && (res['first_name'] || res['likes'])){    
        if (res['first_name'])
            out += fb_user(res);
        else if(res['likes'])
            out += fb_page(res);

        items[0]['a'] = out;
        items[0]['s'] = 'Facebook';
        items[0]['u'] = 'http://facebook.com/' + res['id'];
        //items[0]['i'] = 'http://graph.facebook.com/' + res['id'] + '/picture'; //this redirects and image isn't showed
        items[0]['f'] = 1;
        nra(items);
    }
}

function fb_user(res)
{
    var out = '';
    var locale = res['locale'] ? '<i>Locale:</i> ' + res['locale'] + '<br>'         : '';
    var gender = res['gender'] ? '<i>Gender:</i> ' + res['gender'] + '<br>'         : '';
    var username = res['username'] ? '<i>Username:</i> ' + res['username'] + '<br>' : '';
         
    out += '<b>' + res['name'] + '</b><br>'
        +  username
        +  locale
        +  gender;
    
    return out;
}

function fb_page(res)
{
    var out = '';
    items[0]['i'] = res['picture'];    

    //initialize informations
    var desc = res['description']       ? '<i>Description: </i>' + shorten(res['description'], 60) + '<br>' : '';
    var about = res['about']            ? '<i>About: </i>' + shorten(res['about'], 60) + '<br>'             : '';
    var gen_info = res['general_info']  ? '<i>General info: </i>' + res['general_info'] + '<br>'            : '';
    var mission = res['mission']        ? '<i>Mission: </i>' + shorten(res['mission'], 60) + '<br>'         : '';
    var products = res['products']      ? '<i>Products: </i>' + res['products'] + '<br>'                    : '';
    
    var web = res['website'] ? '<i>Website: </i>' + '<a href="' + res['website'] + '">' + res['website'] +'</a><br>' : '';

    var likes = res['likes'] + ' <i>likes</i> <br>';
    var categ = '<i>Category: </i>' + res['category'] + '<br>';
    var talking = res['talking_about_count'] + ' <i>people talking about this</i><br>';

    //put it together
    out += '<b>' + res['name'] + '</b><br>'
        +  categ
        +  desc
        +  about
        +  gen_info
        +  products
        +  mission
        +  web
        +  likes
        +  talking;

    return out;
}

function shorten(string, length)
{
    if (length === undefined)
        length = 70;

    if (string.length > length)
        return string.slice(0, length) + '...';
    else
        return string
}


