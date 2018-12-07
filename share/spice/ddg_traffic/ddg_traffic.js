(function (env) {
    'use strict';
    function setupData(input) {
        var now = moment(),
            limit = moment().subtract(1, 'year'),
            labels = [],
            days = input.slice(),
            data = {
                direct: [],
                api: [],
                bot: []
            };

        var distance = 30,
            start = 0,
            size = 365; // rolling avg for X days

        // calculate 365 day rolling average, for every 30 days
        while (start < days.length) {
            var group = days.slice(start, start + 365);
            var startDate = moment(group[0].date).format('MMM DD, YYYY');

            var sum = {
                query: 0,
                api: 0,
                bot: 0
            };

            $.each(group, function (index, day) {
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

            labels.push(startDate);
            data.direct.push(avg.query);
            data.api.push(avg.api);
            data.bot.push(avg.bot);

            start += distance;
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Direct',
                    backgroundColor: 'rgba(227,113,81,0.2)', //red
                    borderColor: 'rgb(227,113,81)',
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgb(227,113,81)',
                    pointHoverBorderColor: 'rgb(227,113,81)',
                    data: data.direct
                },
                {
                    label: 'API',
                    hidden: true,
                    backgroundColor: 'rgba(96,165,218,0.2)', //blue
                    borderColor: 'rgb(96,165,218)',
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgb(96,165,218)',
                    pointHoverBorderColor: 'rgb(96,165,218)',
                    data: data.api
                },
                {
                    label: 'Bot',
                    hidden: true,
                    backgroundColor: 'rgba(102,102,102,0.2)', //grey
                    borderColor: 'rgb(102,102,102)',
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgb(102,102,102)',
                    pointHoverBorderColor: 'rgb(102,102,102)',
                    data: data.bot
                }
            ]
        };
    }

    env.ddg_spice_ddg_traffic = function (api_result) {

        if (!api_result) {
            return Spice.failed('ddg_traffic');
        }

        var has_shown = 0;

        DDG.require(['moment.js', 'chart.js'], function () {

            // send a copy because setupData modifies input array
            var data = setupData(api_result.days.slice());

            Spice.add({
                id: 'ddg_traffic',
                name: 'Answer',
                meta: {
                    sourceName: 'DuckDuckGo Traffic',
                    sourceUrl: 'https://duckduckgo.com/traffic'
                },
                data: api_result,
                normalize: function () {

                    var biggest = api_result.biggest_day,
                        biggestDate = moment(biggest.date).format('MMM DD, YYYY'),
                        biggestQuery = DDG.commifyNumber(parseInt(biggest.query)),
                        last = api_result.days.pop(),
                        lastDate = moment(last.date).format('MMM DD, YYYY'),
                        lastQuery = DDG.commifyNumber(parseInt(last.query, 10));

                    return {
                        title: 'DuckDuckGo Traffic',
                        subtitle: [
                            sprintf('Latest: %s queries on %s', lastQuery, lastDate),
                            sprintf('Biggest Day: %s queries on %s', biggestQuery, biggestDate)
                        ]
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.ddg_traffic.content
                    }
                },
                onShow: function () {
                    if (has_shown) return;

                    Chart.defaults.global.defaultFontFamily = "DDG_ProximaNova, 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                    var ctx = $('#ddgTraffic').get(0).getContext('2d'),
                        options = {
                            animation: {
                                duration: 0
                            },
                            hover: {
                                animationDuration: 0
                            },
                            responsiveAnimationDuration: 0,
                            title: {
                                display: true,
                                text: '365 Day Rolling Average'
                            },
                            legend: {
                                position: 'bottom'
                            },
                            hover: {
                                mode: 'index',
                                intersect: false
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                                // position: 'average',
                                callbacks: {
                                    label: function (tooltipItem) {
                                        var name = data.datasets[tooltipItem.datasetIndex].label;
                                        return name + ': ' + DDG.commifyNumber(parseInt(tooltipItem.yLabel, 10));
                                    }
                                }
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        unit: 'year',
                                        displayFormats: {
                                            year: 'MMM YYYY'
                                        }
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        callback: function (value) {
                                            return DDG.abbrevNumber(value)
                                        }
                                    }
                                }]
                            }
                        },
                        trafficChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: options
                        });
                    has_shown = 1;
                }
            });
        });
    };
}(this));
