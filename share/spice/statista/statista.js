(function(env) {
    "use strict";

    function getImage(item, size, blank) {
        if (item.teaserImageUrls[size]) {
            var img = item.teaserImageUrls[size].src;
            if (blank == 1) {
                img = img + '?blank=blank';
            }
            return img;
        } else if (size == 1) {
            return 'http://statistacloudfront.s3.amazonaws.com/Statistic/table/table-355-1.png';
        } else if (size == 2) {
            return 'https://static1.statista.com/Statistic/table/table-100-1.png';
        }
    }

    function getTitle(title) {
        return title.replace(/\ \|\ .+?$/, "");
    }

    function formatDate(date) {
        moment.locale('de');
        var tstamp = moment(date, "DD.MM.YYYY");
        moment.locale('en');
        return moment(tstamp).format('MMM YYYY');
    }

    env.ddg_spice_statista = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('statista');
        }

        // Get original query.
        var script = $('[src*="/js/spice/statista/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/statista\/([^\/]+)/)[1]);

        DDG.require('moment.js', function() {
            Spice.add({
                id: "statista",
                name: "Statistics",
                data: api_result.data,
                meta: {
                    searchTerm: query,
                    sourceName: "Statista",
                    sourceUrl: 'https://www.statista.com/search/?q=' + api_result.q
                },
                normalize: function(item) {
                    return {
                        title: getTitle(item.title),
                        url: item.Link,
                        description: item.subject,
                        image: getImage(item, 1, 1),
                        img_m: getImage(item, 1, 0),
                        heading: item.subject,
                        abstract: item.description,
                        footerdate: formatDate(item.date, moment)
                    }
                },
                templates: {
                    group: 'media',
                    item_detail: 'products_item_detail',
                    wrap_detail: 'base_detail',

                    options: {
                        moreAt: true,
                        rating: false,
                        price: false,
                        brand: false,
                        footer: Spice.statista.footer
                    }
                },
            });
        });
    };
}(this));
