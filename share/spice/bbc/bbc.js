function ddg_spice_bbc(api_result) {
    "use strict";
    
    var broadcasts = api_result.schedule.day.broadcasts;
    var programmes = [];
    var now = Date.now();
    for(var i=0;i<broadcasts.length;i++) {
        var end = Date.parse(broadcasts[i].end);
        if(end > now)
            programmes.push(broadcasts[i]);
    }
    Spice.render({
        data             : api_result.schedule,
        header1          : api_result.schedule.service.title + " (TV Schedule)",
        source_url       : "http://www.bbc.co.uk/"+api_result.schedule.service.key+"/programmes",
        source_name      : 'BBC',
        template_frame   : "carousel",
        template_options: {
            items: programmes, 
            template_item: "bbc",
            type: 'ul'
        },
        force_big_header : true,
        force_no_fold: true,
        spice_name       : "bbc",
    });
}
/*
 * display_title
 * 
 * Find the displayable title of a program and return it
 */
Handlebars.registerHelper("display_title", function() {
    "use strict";
    function toStr(num, digs) {
        var str = new Number(num|0).toString();
        while(str.length < digs) {
            str = "0" + str;
        }
        return str;
    }
    var start = new Date(Date.parse(this.start));
    var end = new Date(Date.parse(this.end));
    return "<code>"+toStr(start.getHours(),2) + ":" + toStr(start.getMinutes(), 2) + " - " + toStr(end.getHours(), 2) + ":" + toStr(end.getMinutes(), 2) + "</code><br>"
    + "<span class=\"bbc_title\">"+this.programme.display_titles.title + "</span>" + (this.programme.display_titles.subtitle ? "<span class=\"bbc_subtitle\">" + this.programme.display_titles.subtitle + "</span>":"");
});
Handlebars.registerHelper("display_url", function() {
    return "http://www.bbc.co.uk/programmes/"+this.programme.pid;
});
Handlebars.registerHelper("display_image", function() {
    "use strict";
    var url = (this.programme.image ? "http://ichef.bbci.co.uk/images/ic/144x81/" + this.programme.image.pid + ".jpg" :  "http://ichef.bbci.co.uk/images/ic/144x81/legacy/episode/"+this.programme.pid+".jpg?nodefault=true");
    return "<img class=\"bbc_img\" src=\""+url+"\"></img>";
});