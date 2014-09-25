(function (env) {
    'use strict';
    
    env.ddg_spice_duck_say = function(api_result) {
        if (api_result) {
            if (api_result.error) {
                return Spice.failed('duck_say');
            }

            // Get a random duck joke from reddit
            var jokes = $.map(api_result.data.children, function(item) {
                return item.data;
            });
            var joke = jokes[Math.floor(Math.random() * jokes.length)];
            
            // Newline wranging for reddit's markdown
            var text = joke.selftext
                .replace(/([^\n])\n([^\n|$])/g, '$1 $2');
            
            // Append the title of the joke.
            // We append it because some of the elements of the joke are in the title.
            text = joke.title + '\n\n' + text;
            
            var moreAt = true;
            var meta = {
                sourceName: 'Reddit /r/jokes',
                sourceUrl: 'http://www.reddit.com' + joke.permalink
            };
        } else {
            var text = DDG.get_query()
                .replace(/^ducksay /, '')
                .replace(/^daxsays /, '');
            var moreAt = false;
            var meta = {};
        }
        
        Spice.add({
            id: 'duck_say',
            name: 'DuckSay',
            data: {
                text: bubble(text, 60),
                text_tablet: bubble(text, 40),
                text_phone: bubble(text, 30)
            },
            meta: meta,
            templates: {
                group: 'base',
                options:{
                    content: Spice.duck_say.content,
                    moreAt: moreAt
                }
            }
        });
    };

    function bubble(text, width) {
        width = Math.min(text.length, width || 40);
        var lines = [];
        var line;
        var match = {
            newlines: RegExp('^(.{0,width})\\n'.replace('width', width)),
            lastword: RegExp('^(.{0,width})(\\s|$)'.replace('width', width))
        };
        
        // Wrap text by width
        while (text) {
            // Split at newlines
            if (line = match.newlines.exec(text)){
                text = text.substring(line[0].length);
                lines.push(line[1]);
            // Split at the last word in line
            } else if (line = match.lastword.exec(text)) {
                text = text.substring(line[0].length);
                lines.push(line[1]);
            // Split at max width
            } else {
                line = text.substring(0, width);
                text = text.substring(width);
                lines.push(line);
            }
        }
                
        // Top of bubble
        var bubble = '.' + Array(width + 3).join('-') + '.\n';
        
        // Pad text & add borders
        $.each(lines, function(i, line) {
            line = line + Array(width - line.length + 1).join(' ');
            bubble += '| ' + line + ' |\n';
        });
        
        // Bottom of bubble
        bubble += '\'' + Array(width + 3).join('-') + '\'\n';
        return bubble;
    }
    
    // Check if there's an argument to ducksay.
    // If there is, just call the function right away.
    if(/^(ducksay|daxsays) .+/.test(DDG.get_query())) {
        ddg_spice_duck_say();
    }
}(this));