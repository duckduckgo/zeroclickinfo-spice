(function (env) {
    "use strict";
    env.ddg_spice_isbn = function(api_result) {

        if (api_result.error) {
            return Spice.failed('ISBN');
        }

        // Get the enveloping property name from the response
        var response_envelope;
       	for (var name in api_result) { 
       		response_envelope = name; // only one property
       	}

        // Format the title to title case (sometimes the received response has inconsistent formatting)
        api_result[response_envelope].title = api_result[response_envelope].title.toTitleCase();
        api_result[response_envelope].publishers[0].name = api_result[response_envelope].publishers[0].name.toTitleCase();

        Spice.add({
            id: "isbn",
            name: "Book",
            data: api_result[response_envelope],
            templates: {
                group: 'base',
                options:{
                    content: Spice.isbn.content,
                    moreAt: false,
                }
            }
        });
    };

    // To Title Case 2.1 – http://individed.com/code/to-title-case/
    // Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
    String.prototype.toTitleCase = function(){
        "use strict";
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
        return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
        if (index > 0 && index + match.length !== title.length &&
            match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
        }
        if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
        }
        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    };

}(this));

