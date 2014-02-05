// Description:
// Tells you if it's snowing in your area.
//
// Dependencies:
// None.
//
// Commands:
// is it snowing? - tells you if it's snowing in your current location.

var nrio = function(api_result) {
    // Check for errors.
    if(!api_result || api_result.error || !api_result.location) {
        return;
    }

    // Get only the city.
    var getLocation = function() {
        if(api_result.location.indexOf(",") !== -1) {
            return api_result.location.substring(0, api_result.location.indexOf(","));
        }
        return api_result.location;
    }

    if(DDG.get_query().match(/make|let/i)){
        api_result.answer = 'Snow!';
        api_result.location = 'The North Pole';
        api_result.forecast = 'It may not be snowing outside, but it is in here!';
        api_result.is_snowing = true;
    }

    if(api_result.answer && api_result.answer.match(/yes/i)){
        api_result.is_snowing = true;
    }

    // Display the spice plug-in.
    Spice.render({
        id: 'snow',
        name: 'Is It Snowing?',

        data: api_result,

        meta: {
            sourceName: "isitsnowingyet.org",
            sourceUrl: "http://isitsnowingyet.org/check?q=" + api_result.location,
        },

        templates: {
            summary: "snow"
        }
    });

    // add the snoflakes, if it's snowing
    if(!api_result.is_snowing){ return; }

    var $dom = Spice.getDOM('snow').find('.spice-snow');

    // TODO: Contact this guy and make sure he's cool with us using it:
    // http://www.zachstronaut.com/posts/2009/12/21/happy-xmas-winternet.html
    var ww = 0;
    var wh = 0;
    var maxw = 0;
    var minw = 0;
    var maxh = 0;
    var textShadowSupport = true;
    var xv = 0;
    var snowflakes = ["\u2744", "\u2745", "\u2746"];
    var prevTime;
    var absMax = 200;
    var flakeCount = 0;

    function makeItSnow(){
        var detectSize = function (){
            ww = $dom.width();
            wh = $dom.height();
            maxw = ww + 300;
            minw = -300;
            maxh = wh + 300;
        };

        detectSize();

        $(window).resize(detectSize);

        if (!$dom.css('textShadow')){
            textShadowSupport = false;
        }

        // FF seems to just be able to handle like 50... 25 with rotation
        // Safari seems fine with 150+... 75 with rotation
        var i = 50;
        while (i--){
            addFlake(true);
        }

        prevTime = new Date().getTime();
        setInterval(move, 50);
    }

    function addFlake(initial){
        flakeCount++;
        
        var sizes = [{
                r: 1.0,
                css: {
                    fontSize: 15 + Math.floor(Math.random() * 20) + 'px',
                    textShadow: '9999px 0 0 rgba(238, 238, 238, 0.5)'
                },
                v: 2
            },
            {
                r: 0.6,
                css: {
                    fontSize: 50 + Math.floor(Math.random() * 20) + 'px',
                    textShadow: '9999px 0 2px #eee'
                },
                v: 6
            },
            {
                r: 0.2,
                css: {
                    fontSize: 75 + Math.floor(Math.random() * 30) + 'px',
                    textShadow: '9999px 0 6px #eee'
                },
                v: 12
            },
            {
                r: 0.1,
                css: {
                    fontSize: 110 + Math.floor(Math.random() * 50) + 'px',
                    textShadow: '9999px 0 24px #eee'
                },
                v: 20
            }
        ];
    
        var $nowflake = $('<span class="winternetz">' + snowflakes[Math.floor(Math.random() * snowflakes.length)] + '</span>').css({
            /*fontFamily: 'Wingdings',*/
            color: '#eee',
            display: 'block',
            position: 'absolute',
            background: 'transparent',
            width: 'auto',
            height: 'auto',
            margin: '0',
            padding: '0',
            textAlign: 'left',
            zIndex: 9999
        });
        
        if (textShadowSupport){
            $nowflake.css('textIndent', '-9999px');
        }
        
        var r = Math.random();
        var i = sizes.length;
        var v = 0;
        
        while (i--){
            if (r < sizes[i].r){
                v = sizes[i].v;
                $nowflake.css(sizes[i].css);
                break;
            }
        }
    
        var x = (-300 + Math.floor(Math.random() * (ww + 300)));
        var y = 0;

        if (typeof initial == 'undefined' || !initial){
            y = -300;
        } else {
            y = (-300 + Math.floor(Math.random() * (wh + 300)));
        }
    
        $nowflake.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        $nowflake.data('x', x);
        $nowflake.data('y', y);
        $nowflake.data('v', v);
        $nowflake.data('half_v', Math.round(v * 0.5));
        
        $dom.append($nowflake);
    }
    
    function move(){
        if (Math.random() > 0.8){
            xv += -1 + Math.random() * 2;
            
            if (Math.abs(xv) > 3){
                xv = 3 * (xv / Math.abs(xv));
            }
        }
        
        // Throttle code
        var newTime = new Date().getTime();
        var diffTime = newTime - prevTime;
        prevTime = newTime;
        
        if (diffTime < 55 && flakeCount < absMax){
            addFlake();
        } else if (diffTime > 150) {
            $('span.winternetz:first').remove();
            flakeCount--;
        }
        
        $('span.winternetz').each(function (){
            var x = $(this).data('x');
            var y = $(this).data('y');
            var v = $(this).data('v');
            var half_v = $(this).data('half_v');
            
            y += v;
            
            x += Math.round(xv * v);
            x += -half_v + Math.round(Math.random() * v);
            
            // because flakes are rotating, the origin could be +/- the size of the flake offset
            if (x > maxw){
                x = -300;
            } else if (x < minw) {
                x = ww;
            }
            
            if (y > maxh){
                $(this).remove();
                flakeCount--;
                addFlake();
            } else {
                $(this).data('x', x);
                $(this).data('y', y);

                $(this).css({
                    left: x + 'px',
                    top: y + 'px'
                });
                
                // only spin biggest three flake sizes
                if (v >= 6){
                    $(this).animate({rotate: '+=' + half_v + 'deg'}, 0);
                }
            }
            }
        );
    }


    makeItSnow();
};
