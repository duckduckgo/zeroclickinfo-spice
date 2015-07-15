(function (env) {

  "use strict";

  /*
    $.getScript("http://localhost:5000/share/spice/graphical_calculator/js/d3/3.5.6/d3.js")
      .done(function (script, textStatus) {
        console.log("loaded d3.js: " + textStatus);
      })
      .fail(function (jqxhr, settings, exception) {
        console.log("Failed to load d3.js");
      });

    $.getScript("http://localhost:5000/share/spice/graphical_calculator/js/mathjs/1.7.0/math.min.js")
      .done(function (script, textStatus) {
        console.log("loaded math.min.js: " + textStatus);
      })
      .fail(function (jqxhr, settings, exception) {
        console.log("Failed to load math.min.js");
      });
      
      $.getScript("http://localhost:5000/share/spice/graphical_calculator/js/function-plot.min.js")
      .done(function (script, textStatus) {
        console.log("loaded bundle.js: " + textStatus);
      })
      .fail(function (jqxhr, settings, exception) {
        console.log("Failed to load bundle.js");
      });
  */

  env.ddg_spice_graphical_calculator = function () {

    var functionPlot;

    // attempt to evaluate the input so that we fail early if it is invalid
    // (input can be complex, so it is not as simple as using regex filter);
    // validation is done here so that we may return a Spice.failed() before
    // .onShow: would be attempted. This should give the user a clean UI experience.
    
    // one could fail-fast on math.min.js:math.parse(rawQuery) prior to async dynamic
    // loading of d3.js and functional-plot.min.js depending on how one prioritizes
    // bandwidth pressure on false positives (e.g., foo(x)) vs. response time on true positives.
    
    try {

      var rawQuery, parseStr, titleStr, xDomain, yDomain, MAX_TITLE_LEN = 40;

      // strip leading '=', 'y = ', or 'f(x) = ' if present;
      // also, if the words 'graph' or 'plot' appear anywhere, strip
      rawQuery = DDG.get_query().toLowerCase()
        .replace(/graph|plot/gi,'') // should be first; note, this greedily matches strings, not just tokens
        .replace(/^\s*=/, '')
        .replace(/^\s*y\s*=/, '')
        .replace(/^\s*f\(x\)\s*=/,'');

      // console.log(rawQuery);

      // parsing will handle cases such as implicit multiplication ("2x" -> "2 * x"),
      // which must be done before the equation string is passed to FunctionPlot
      parseStr = math.parse(rawQuery).toString().replace(/\s*;\s*/,"; "); // remove possible embedded returns

      // clean up the title a little
      titleStr = parseStr.replace(/\s+\^\s+/g,'^')
                .replace(/x\s+\/\s+([0-9]+)/,'x/$1');
      
      // expressions such as "a = 4; x + a" are valid;
      // in these cases we will not enhance the title with 'y = '
      if (!/[=;]/.test(rawQuery)) {
        titleStr = 'y = ' + titleStr;
      }

      // trim the title if it is "too long"
      if (titleStr.length > MAX_TITLE_LEN - 4) {
        titleStr = titleStr.substr(0, MAX_TITLE_LEN-4) + " ...";
      }

      // need to calc the domain to center the graph;
      // FunctionPlot defaults are static at:
      //  xDomain: [ -5, 5 ],
      //  yDomain: [-5, 5 ]

      xDomain = [-5, 5];
      var y0 = math.eval(parseStr.split(";"), {
        x: 0
      });
      y0 = y0[y0.length-1]; // take the last statement value
      
      // catch corner cases such as 1/x eval at x=0
      yDomain = isFinite(y0) ? [y0 - 5, y0 + 5] : [-5,5];
      
      // attempt to plot the function;
      // save the instance for .onShow:
      functionPlot = function () {

        // the Function Plot JS library uses the global var functionPlot
        window.functionPlot({
          title: titleStr,
          target: '#zci-graphical-calculator',
          tip: {  // cross-hairs
            xLine: true,
            yLine: true,
            renderer: function (x, y, index) {
              return "(" + x.toFixed(2) + ", " + y.toFixed(2) + ")";
            }
          },
          data: [{
            fn: parseStr
                }],
          xDomain: xDomain,
          yDomain: yDomain,
          xLabel: "X axis",
          yLabel: "Y axis",
        });

      };
      
    } catch (err) {
      return Spice.failed('graphical_calculator');
    };
    
    // Render the response
    Spice.add({

      id: "graphical_calculator",
      name: "Graphical Calculator",
      data: {
        input: "not used"
      },
      meta: {
        sourceName: "Function Plot",
        sourceUrl: 'http://maurizzzio.github.io/function-plot/'
      },
      templates: {
        group: 'base',
        options: {
          content: Spice.graphical_calculator.graphical_calculator,
          moreAt: true
        }
      },
      onShow: functionPlot

    });
  };
}(this));