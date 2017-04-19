(function (env) {
    "use strict";

    env.ddg_spice_swift_docs = function(api_result) {
        if (!api_result || !api_result.length) {
            return Spice.failed('swift_docs');
        }
        Spice.add({
            id: 'swift_docs',
            name: 'Software',
            data: api_result,
            meta: {
                sourceName: 'Swift Doc',
                sourceUrl: 'http://swiftdoc.org/',
                total: api_result.length,
                sourceIconUrl: 'http://swiftdoc.org/favicon.ico',
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    description: item.comment,
		            url: item.site_url
                };
            },
            templates: {
                group: 'base',
                detail: false,
                options: {
		            content: Spice.swift_docs.content,
                    moreAt: false
                },
            }
        });
    };
    // helper from coderwall spice https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/coderwall/coderwall.js
    Spice.registerHelper("swiftdocs_parse_md", function(value){
        var result = [];
        if (!value) {
            return;
        } else {
            // no cross site scripting
            value = Handlebars.Utils.escapeExpression(value);
            value.split(/\n+/).forEach(function(line) {
                // exclude lines that are only whitespace characters
                if (/[a-z0-9]/.test(line)) { // Github flavored MD
                    line = line.replace(/(__(.+?)__|\*\*(.+?)\*\*)/g, '<strong>$2$3</strong>') // bold
                        .replace(/(_(.+?)_|\*(.+?)\*)/g, '<em>$2$3</em>') // italicize
                        .replace(/&#x60;(.+?)&#x60;/g, '<code>$1</code>') // monospace (unicode for ` grave accent)
                        .replace(/~~(.+?)~~/g, '<del>$1</del>') // strikethrough
                        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="tx-clr--dk2">$1</a>'); // create links
                    result.push(line);
                }
            });
            result = result.join('<br>'); //add linebreaks
            return new Handlebars.SafeString(result);
        }
    });
    
    Spice.registerHelper('swiftdocs_substr_html', function() {
        var limit, string, html,
            result = '',
            context = arguments[0],
            options = arguments[arguments.length - 1];

        // use default limit if not provided
        if (arguments.length === 2) {
            limit = 300;
        } else {
            limit = arguments[1];
        }
        // render the string
        string = options.fn(context);
        html = $.parseHTML(string.trim());
        // Takes an HTML node, and modifies its inner text
        // Returns a string of the markup with modified text
        // (unless nothing was returned)
        function changeHtmlText(node, callback) {
            var inner = '',
                res = '';

            if (node.nodeName === '#text') {
                // change text content
                res = callback(node.textContent);
            } else if (node.nodeName === 'BR') {
                // return break tags
                res = node.outerHTML;
            } else {
                // walk through child html elements to get textNodes
                $.each(node.childNodes, function( i, child) {
                    inner += changeHtmlText(child, callback);
                });
            }
            // replace html tags (if looped cb returned anything)
            if (inner.length && node.nodeType === 1) {
                node.innerHTML = inner;
                res = node.outerHTML;
            }
            return res;
        }
        // trims text to specified limit,
        // cutting the string at the last word
        function trimToLimit(str) {
            if (limit === 0) {
                return '';
            } else if (str.length <= limit) {
                limit -= str.length;
            } else {
                // trim to closest word
                // http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
                str = str.substr(0, limit);
                str = str.substr(0, Math.min(str.length, str.lastIndexOf(' ')));
                limit = 0;
            }
            return str;
        }
        // Put it all together:
        // trim text for each node that was parsed from handlebars context
        if (html) {
            $.each( html, function(i,el) {
                if ( limit > 0 ) {
                    result  += changeHtmlText( el, trimToLimit );
                }
            });
            // trim punctuation marks and add ellipsis
            if (limit === 0) {
                if (result.match(/[\.,:;\-—_!?\(\[\{]$/)) {
                    result = result.substr(0, result.length-1);
                }
                result.trim();
                result += '...';
            }
            return new Handlebars.SafeString(result);
        }
    });

}(this));
