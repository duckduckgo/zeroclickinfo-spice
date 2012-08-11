function ddg_spice_vimeo_video(res)
{
    var out = '';

    out += 'By <a href="' + res["author_url"] +'">' 
        +           res["author_name"]
        +      '</a><br />'
        +  '<i>' + res["description"] + '</i><br />';

    //embed video in iframe

    out += res["html"];


    items = [[]];
    items[0]['a'] = out;
    items[0]['h'] = 'Vimeo (' + res["title"] + ')';
    
    nra(items);
}
