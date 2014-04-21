function ddg_spice_ddg_traffic_stats() {
  "use strict";

  Spice.render({
    data             : {},
    header1          : 'DuckDuckGo Search Traffic',
    source_url       : encodeURI('https://duckduckgo.com/traffic.html'),
    source_name      : 'DuckDuckGo',
    template_normal  : 'ddg_traffic_stats',
    force_big_header : true,
    force_no_fold    : true
  });

  ddg_spice_ddg_traffic_stats.fetch_graph_data();
}

ddg_spice_ddg_traffic_stats.fetch_graph_data = function() {
  "use strict";

  $.ajax({
    dataType: 'jsonp',
    url: 'http://whateverorigin.org/get?url=' + encodeURIComponent('https://duckduckgo.com/traffic_data/direct.csv'),
    success: function(data) {
      var graph_data = data.contents;
      ddg_spice_ddg_traffic_stats.render_graph(graph_data);
    }
  });
};

ddg_spice_ddg_traffic_stats.render_graph = function(graph_data) {
  "use strict";

  $.getScript(
    'https://duckduckgo.com/traffic_data/dygraph-combined.js',
    function() {
      var g_annotations = [
        {
          series: "Queries",
          x: "20110103",
          shortText: "A",
          text: "DontTrack.us",
          tickHeight: 10
        },
        {
          series: "Queries",
          x: "20110120",
          shortText: "B",
          text: "SF Billboard",
          tickHeight: 30
        },
        {
          series: "Queries",
          x: "20110620",
          shortText: "C",
          text: "DontBubble.us",
          tickHeight: 23
        },
        {
          series: "Queries",
          x: "20110816",
          shortText: "D",
          text: "TIME's Top 50 Websites",
          tickHeight: 20
        },
        {
          series: "Queries",
          x: "20111006",
          shortText: "E",
          text: "USV investment",
          tickHeight: 20
        },
        {
          series: "Queries",
          x: "20120113",
          shortText: "F",
          text: "Visual Refresh",
          tickHeight: 30
        },
        {
          series: "Queries",
          x: "20120124",
          shortText: "G",
          text: "Data Privacy Day",
          tickHeight: 50
        },
        {
          series: "Queries",
          x: "20121109",
          shortText: "H",
          text: "Washington Post profile",
          tickHeight: -30
        },
        {
          series: "Queries",
          x: "20130606",
          shortText: "I",
          text: "Surveillance revelations",
          tickHeight: -40
        }
      ];
      var roll_period = 28;
      var g = new Dygraph(
        document.getElementById('ddg_traffic_stats_graph'),
        graph_data,
        {
          rollPeriod     : roll_period,
          showRoller     : true,
          title          : 'DuckDuckGo Direct queries per day (' + roll_period + 'd avg)',
          maxNumberWidth : 8,
          xRangePad      : 30,
          strokeWidth    : 2,
          drawCallback   : function(g, is_initial) {
            if (!is_initial) {
              return;
            }
            setTimeout(function() {
              g.setAnnotations(g_annotations)
            }, 250);
          }
        }
      );
    }
  );
};

ddg_spice_ddg_traffic_stats();

$('body').on('click', '#ddg_traffic_stats_graph_annotations p', function() {
  $(this).closest('div').find('.inner').slideToggle(200);
});
