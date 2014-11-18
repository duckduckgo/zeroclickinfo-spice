(function (env) {
    "use strict";
    env.ddg_spice_travis_status = function(api_result) {
        if (!api_result) {
            return Spice.failed('travis_status');
        }

        Spice.add({
            id: "travis_status",
            name: "Status",
            data: api_result,
            meta: {
                sourceName: api_result.page.name,
                sourceUrl: api_result.page.url,
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.travis_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("TravisStatus_ifCond", function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });

    Spice.registerHelper("TravisStatus_iterateOver", function(list, block) {
      var result = '';
      for(var i=0,max=list.length; i<max; i++) {
        result += block.fn(list[i]);
      }
      return result;
    });
}(this));
