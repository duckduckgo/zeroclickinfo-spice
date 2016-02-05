(function (env) {
    "use strict";

    function setupData (input) {

        var now = moment(),
            limit = moment().subtract(1, 'year'),
            labels = [],
            days = input.slice(),
            data = {
                direct: [],
                api: [],
                bot: []
            };

        var size = 60; // rolling avg for X days
        while (days.length > 0) {
            var group = days.splice(0, size);
            var endDate = moment(group[group.length-1].date).format("MMM DD, YYYY");

            var sum = {
                query: 0,
                api: 0,
                bot: 0
            };

            $.each(group, function(index, day){
                if (day.query > 0) {
                    sum.query += parseInt(day.query);
                    sum.api += parseInt(day.api);
                    sum.bot += parseInt(day.bot);
                }
            });

            var avg = {
                query: Math.round(sum.query / group.length),
                api: Math.round(sum.api / group.length),
                bot: Math.round(sum.bot / group.length),
            };

            labels.push(endDate);
            data.direct.push(avg.query);
            data.api.push(avg.api);
            data.bot.push(avg.bot);
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: "Direct",
                    fillColor: "rgba(227,113,81,0.2)", //red
                    strokeColor: "rgba(227,113,81,1)",
                    pointColor: "rgba(227,113,81,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(227,113,81,1)",
                    data: data.direct
                },
                // {
                //     label: "API",
                //     fillColor: "rgba(96,165,218,0.2)", //blue
                //     strokeColor: "rgba(96,165,218,1)",
                //     pointColor: "rgba(96,165,218,1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(96,165,218,1)",
                //     data: data.api
                // },
                // {
                //     label: "Bot",
                //     fillColor: "rgba(102,102,102,0.2)", //grey
                //     strokeColor: "rgba(102,102,102,1)",
                //     pointColor: "rgba(102,102,102,1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(102,102,102,1)",
                //     data: data.bot
                // }
            ]
        };
    }

    env.ddg_spice_ddg_traffic = function(api_result) {

        if (!api_result) {
            return Spice.failed('ddg_traffic');
        }

        var has_shown = 0;

        DDG.require(['chart.js', 'moment.js'], function() {

            // send a copy because setupData modifies input array
            var data = setupData(api_result.days.slice());

            Spice.add({
                id: "ddg_traffic",
                name: "Answer",
                data: api_result,
                normalize: function() {

                    var biggest = api_result.biggest_day,
                        biggestDate = moment(biggest.date).format("MMM DD, YYYY"),
                        biggestQuery = DDG.commifyNumber(parseInt(biggest.query)),
                        last = api_result.days.pop(),
                        lastDate = moment(last.date).format("MMM DD, YYYY"),
                        lastQuery = DDG.commifyNumber(parseInt(last.query));

                    return {
                        title: "DuckDuckGo Traffic",
                        subtitle: [
                            sprintf("Latest: %s queries on %s", lastQuery, lastDate),
                            sprintf("Biggest Day: %s queries on %s", biggestQuery, biggestDate)
                        ],
                        altSubtitle: "60 Day Rolling Average"
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.ddg_traffic.content
                    }
                },
                onShow: function() {
                    if (has_shown) return;

                    var ctx = $("#ddgTraffic").get(0).getContext("2d"),
                        options = {
                            responsive: true,
                            maintainAspectRatio: true,
                            pointDotRadius : 3,
                            pointHitDetectionRadius : 5,
                            scaleShowVerticalLines: false,
                            tooltipFontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
                        },
                        trafficChart = new Chart(ctx).Line(data, options);
                    has_shown = 1;
                }
            });
        });
    };
}(this));
