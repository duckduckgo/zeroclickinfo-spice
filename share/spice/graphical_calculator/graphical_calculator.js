(function (env) {

  "use strict";

  var functionPlotOptions = {

    options: {
      title: "",
      target: '.graphical-calculator--display',
      tip: { // cross-hairs
        xLine: true,
        yLine: true,
        renderer: function (x, y, index) {
          return "(" + x.toFixed(2) + ", " + y.toFixed(2) + ")";
        }
      },
      data: [{
        fn: ""
                }],
      xDomain: [],
      yDomain: [],
      xLabel: "X axis",
      yLabel: "Y axis",
    },

    getOptions: function () {
      return this.options;
    },

    setOptions: function (queryStr, parseStr) {

      var MAX_TITLE_LEN = 40;

      // clean up the title a little
      var titleStr = parseStr.replace(/\s+\^\s+/g, '^')
        .replace(/x\s+\/\s+([0-9]+)/, 'x/$1');

      // expressions such as "a = 4; x + a" are valid;
      // in these cases we will not enhance the title with 'y = '
      if (!/[=;]/.test(queryStr)) {
        titleStr = 'y = ' + titleStr;
      }

      // trim the title if it is "too long"
      if (titleStr.length > MAX_TITLE_LEN - 4) {
        titleStr = titleStr.substr(0, MAX_TITLE_LEN - 4) + " ...";
      }

      // need to calc the range (yDomain) to center the graph;
      // FunctionPlot defaults are static at:
      //  xDomain: [ -5, 5 ],
      //  yDomain: [-5, 5 ]

      var xDomain = [-5, 5];
      var y0 = math.eval(parseStr.split(";"), { // support compound statements
        x: 0
      });
      y0 = y0[y0.length - 1]; // the last statement value is what will be plotted

      // catch corner cases such as 1/x eval at x=0
      var yDomain = isFinite(y0) ? [y0 - 5, y0 + 5] : [-5, 5];

      this.options.title = titleStr;
      this.options.data[0].fn = parseStr;
      this.options.xDomain = xDomain;
      this.options.yDomain = yDomain;

      return this; // for chaining
    }

  };

  var spiceOptions = {

    getOptions: function () {

      return {

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
        onShow: window.functionPlot
      };
    }

  };

  env.ddg_spice_graphical_calculator = function () {

    try {

      var queryStr, parseStr;

      // strip leading '=', 'y = ', or 'f(x) = ' if present;
      // also, if the words 'graph' or 'plot' appear anywhere, strip
      queryStr = DDG.get_query().toLowerCase()
        .replace(/graph|plot/g, '') // should be first; note, this greedily matches strings, not just tokens
        .replace(/\s+/, ' ')
        .replace(/^ *= */, '')
        .replace(/^ *y *= */, '')
        .replace(/^ *f *\( *x *\) *= */, '');

      // console.log(queryStr);

      // prevent jQuery from appending the query string "?_={timestamp}" on URLs when using .getScript()
      // (source: http://api.jquery.com/jQuery.getScript/; IA airlines.js, etc.)
      $.ajaxSetup({ cache: true });
      
      // first async load just math.min.js so that we fail-fast on queries that
      // passed the initial regex guard into this function but cannot be parsed
      $.getScript(DDG.get_asset_path('graphical_calculator', 'math.min.js'))
        .fail(function (jqxhr, settings, exception) {
          throw exception + ": failed to load math.min.js";
        })
        .done(function (script, textStatus) {

          // parsing will handle cases such as implicit multiplication ("2x" -> "2 * x"),
          // which must be done before the equation string is passed to FunctionPlot
          // math.parse() will throw on failure
          parseStr = math.parse(queryStr).toString().replace(/\s*;\s*/, "; "); // remove possible embedded returns inserted by .parse()

          // success; now asnyc load the rest, but proceed only when both are successfully loaded
          // for idiom, see: http://www.bennadel.com/blog/2124-using-deferred-objects-as-an-asynchronous-script-loader-in-jquery-1-5.htm
          $.when(

            $.getScript(DDG.get_asset_path('graphical_calculator', 'd3.min.js'))
            .fail(function (jqxhr, settings, exception) {
              throw exception + ": failed to load d3.min.js";
            }),

            $.getScript(DDG.get_asset_path('graphical_calculator', 'function-plot.min.js'))
            .fail(function (jqxhr, settings, exception) {
              throw exception + ": failed to load function-plot.min.js";
            }),

            $.Deferred(
              function (deferred) {
                $(deferred.resolve);
              })

          ).done(function () {

            // we're loaded; set Spice
            Spice.add(spiceOptions.getOptions());

            // set and exec the plot
            window.functionPlot(functionPlotOptions.setOptions(queryStr, parseStr).getOptions());

          });
        });
      
    } catch (err) {
      return Spice.failed('graphical_calculator');
    };

  };

}(this));