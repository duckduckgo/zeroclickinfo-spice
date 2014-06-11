function nrio(api_result) {
    "use strict";
    // Check for errors.
    if (!api_result || api_result.error || !api_result.location) {
        return;
    }
    // Get only the city.
    var getLocation = function() {
        if (-1 !== api_result.location.indexOf(",")) {
            return api_result.location.substring(0, api_result.location.indexOf(","));
        }
        return api_result.location;
    };
    if (DDG.get_query().match(/make|let/i)) {
        api_result.answer = "Snow!", api_result.location = "The North Pole", api_result.forecast = "It may not be snowing outside, but it is in here!", 
        api_result.is_snowing = !0;
    }
    if (api_result.answer && api_result.answer.match(/yes/i)) {
        api_result.is_snowing = !0;
    }
    // add the snoflakes, if it's snowing
    if (// Display the spice plug-in.
    Spice.add({
        id: "snow",
        name: "Answer",
        data: api_result,
        meta: {
            sourceName: "isitsnowingyet.org",
            sourceUrl: "http://isitsnowingyet.org/check?q=" + api_result.location
        },
        templates: {
            detail: Spice.snow.snow
        }
    }), !api_result.is_snowing) {
        return;
    }
    var $dom = Spice.getDOM("snow").find(".spice-snow");
    // TODO: Contact this guy and make sure he's cool with us using it:
    // http://www.zachstronaut.com/posts/2009/12/21/happy-xmas-winternet.html
    var ww = 0;
    var wh = 0;
    var maxw = 0;
    var minw = 0;
    var maxh = 0;
    var textShadowSupport = !0;
    var xv = 0;
    var snowflakes = [ "❄", "❅", "❆" ];
    var prevTime;
    var absMax = 200;
    var flakeCount = 0;
    function makeItSnow() {
        var detectSize = function() {
            ww = $dom.width(), wh = $dom.height(), maxw = ww + 300, minw = -300, maxh = wh + 300;
        };
        if (detectSize(), $(window).resize(detectSize), !$dom.css("textShadow")) {
            textShadowSupport = !1;
        }
        // FF seems to just be able to handle like 50... 25 with rotation
        // Safari seems fine with 150+... 75 with rotation
        var i = 50;
        while (i--) {
            addFlake(!0);
        }
        prevTime = new Date().getTime(), setInterval(move, 50);
    }
    function addFlake(initial) {
        flakeCount++;
        var sizes = [ {
            r: 1,
            css: {
                fontSize: 15 + Math.floor(20 * Math.random()) + "px",
                textShadow: "9999px 0 0 rgba(238, 238, 238, 0.5)"
            },
            v: 2
        }, {
            r: .6,
            css: {
                fontSize: 50 + Math.floor(20 * Math.random()) + "px",
                textShadow: "9999px 0 2px #eee"
            },
            v: 6
        }, {
            r: .2,
            css: {
                fontSize: 75 + Math.floor(30 * Math.random()) + "px",
                textShadow: "9999px 0 6px #eee"
            },
            v: 12
        }, {
            r: .1,
            css: {
                fontSize: 110 + Math.floor(50 * Math.random()) + "px",
                textShadow: "9999px 0 24px #eee"
            },
            v: 20
        } ];
        var $nowflake = $('<span class="winternetz">' + snowflakes[Math.floor(Math.random() * snowflakes.length)] + "</span>").css({
            /*fontFamily: 'Wingdings',*/
            color: "#eee",
            display: "block",
            position: "absolute",
            background: "transparent",
            width: "auto",
            height: "auto",
            margin: "0",
            padding: "0",
            textAlign: "left",
            zIndex: 9999
        });
        if (textShadowSupport) {
            $nowflake.css("textIndent", "-9999px");
        }
        var r = Math.random();
        var i = sizes.length;
        var v = 0;
        while (i--) {
            if (r < sizes[i].r) {
                v = sizes[i].v, $nowflake.css(sizes[i].css);
                break;
            }
        }
        var x = -300 + Math.floor(Math.random() * (ww + 300));
        var y = 0;
        if ("undefined" == typeof initial || !initial) {
            y = -300;
        } else {
            y = -300 + Math.floor(Math.random() * (wh + 300));
        }
        $nowflake.css({
            left: x + "px",
            top: y + "px"
        }), $nowflake.data("x", x), $nowflake.data("y", y), $nowflake.data("v", v), $nowflake.data("half_v", Math.round(.5 * v)), 
        $dom.append($nowflake);
    }
    function move() {
        if (Math.random() > .8) {
            if (xv += -1 + 2 * Math.random(), Math.abs(xv) > 3) {
                xv = 3 * (xv / Math.abs(xv));
            }
        }
        // Throttle code
        var newTime = new Date().getTime();
        var diffTime = newTime - prevTime;
        if (prevTime = newTime, 55 > diffTime && absMax > flakeCount) {
            addFlake();
        } else {
            if (diffTime > 150) {
                $("span.winternetz:first").remove(), flakeCount--;
            }
        }
        $("span.winternetz").each(function() {
            var x = $(this).data("x");
            var y = $(this).data("y");
            var v = $(this).data("v");
            var half_v = $(this).data("half_v");
            // because flakes are rotating, the origin could be +/- the size of the flake offset
            if (y += v, x += Math.round(xv * v), x += -half_v + Math.round(Math.random() * v), 
            x > maxw) {
                x = -300;
            } else {
                if (minw > x) {
                    x = ww;
                }
            }
            if (y > maxh) {
                $(this).remove(), flakeCount--, addFlake();
            } else {
                // only spin biggest three flake sizes
                if ($(this).data("x", x), $(this).data("y", y), $(this).css({
                    left: x + "px",
                    top: y + "px"
                }), v >= 6) {
                    $(this).animate({
                        rotate: "+=" + half_v + "deg"
                    }, 0);
                }
            }
        });
    }
    makeItSnow();
}