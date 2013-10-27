function ddg_spice_itv(api_result) {
    "use strict";
    var channel = api_result.Parameters.ChannelName;
    var now = new Date(Date.now());
    var time = "Today";
    var programmes = api_result.filter(function(r) {
        var currtime = new Date(+r.TXStart.substring(6, r.TXStart.length - 2));
        return r.Channel.Name == channel && r.TimePeriod == time && +currtime + 1000 * 60 * 60 * 2 > +now;
    });
    Spice.render({
        data             : api_result,
        header1          : channel + " (TV Schedule)",
        source_url       : "https://www.itv.com/itvplayer/categories/"+(channel == "ITV1" ? "itv" : channel.toLowerCase())+"/latest",
        source_name      : 'ITV',
        template_frame   : "carousel",
        template_options: {
            items: programmes, 
            template_item: "itv",
            type: 'ul'
        },
        force_big_header : true,
        force_no_fold: true,
        spice_name       : "itv",
    });
}

Handlebars.registerHelper("display_time", function() {
    "use strict";
    function toStr(num, digs) {
        var str = new Number(num|0).toString();
        while(str.length < digs) {
            str = "0" + str;
        }
        return str;
    }
    var start = new Date(+this.TXStart.substring(6, this.TXStart.length - 2));
    return toStr(start.getHours(),2) + ":" + toStr(start.getMinutes(), 2);
});