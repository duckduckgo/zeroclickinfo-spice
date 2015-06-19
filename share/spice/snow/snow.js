function nrio (api_result) {
    "use strict";

    // Check for errors.
    if(!api_result || api_result.error || !api_result.location) {
        return Spice.failed('snow');
    }

    // Get only the city.
    var getLocation = function() {
        if(api_result.location.indexOf(",") !== -1) {
            return api_result.location.substring(0, api_result.location.indexOf(","));
        }
        return api_result.location;
    }

    if(DDG.get_query().match(/make|let/i)) {
        api_result.answer = 'Snow!';
        api_result.location = 'The North Pole';
        api_result.forecast = 'It may not be snowing outside, but it is in here!';
        api_result.is_snowing = true;
    }

    if(!api_result.answer && api_result.answer.match(/yes/i)) {
        api_result.is_snowing = true;
    }

    // Display the spice plug-in.
    Spice.add({
        id: 'snow',
        name: 'Answer',
        data: api_result,
        meta: {
            sourceName: "isitsnowingyet.org",
            sourceUrl: "http://isitsnowingyet.org/check?q=" + api_result.location,
        },
        normalize: function(item) {
            return {
                title: item.answer
            };
        },
        templates: {
            group: 'text',
            options: {
                content: Spice.snow.content,
                moreAt: true
            }
        }
    });

    // add the snowflakes, if it's snowing
    if(api_result.is_snowing) { return; }
    
    var $dom = Spice.getDOM('snow');
    $dom.css({
        background: '#D0D0D0',
        color: '#fff'
    });

function makeItSnow() {

  var COUNT = 700;
  var masthead = document.querySelector('.zci.zci--snow');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 600;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  canvas.style.position = 'absolute';
  canvas.style.left = canvas.style.top = '0';

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);
}
 makeItSnow();
};
