(function (env) {
    "use strict";

    var normalize = function(item) {
        var m = {
            title: item.beer.beer_name,
            subtitle: item.brewery.brewery_name,
            url: "https://untappd.com/b/" +
                    encodeURI(item.beer.beer_slug) + "/" +
                    encodeURI(item.beer.bid),
            icon: item.beer.beer_label,
            style: item.beer.beer_style,
            abv: item.beer.beer_abv,
            ibu: item.beer.beer_ibu,
            ratings: DDG.abbrevNumber(item.checkin_count),
            created_at: item.beer.created_at,
            content: item.beer.beer_description
        };

        if (!m.ibu) {
            m.ibu = "No";
        }

        if (m.icon.substring(m.icon.lastIndexOf("/")+1) == "badge-beer-default.png") {
            delete m.icon;
        } else {
            m.image = m.icon;
        }

        m.location =
            [ item.brewery.location.brewery_city,
              item.brewery.location.brewery_state,
              item.brewery.country_name ]
            .filter(function(x) { return x; })
            .join(", ");

        return m;
    };

    env.ddg_spice_untappd = function(api_result) {
        if (!api_result || api_result.error_type || api_result.response.beers.count < 1) {
            return Spice.failed("untappd");
        }

        Spice.add({
            id: "untappd",

            name: "Food & drink",
            data: api_result.response.beers.items,
            meta: {
                sourceName: "Untappd",
                sourceUrl: "https://untappd.com/search?q=" + encodeURI(api_result.response.term)
            },
            normalize: normalize,
            templates: {
                item: "text_item",
                detail: "basic_info_detail",
                options: {
                    footer: Spice.untappd.footer,
                    content: Spice.untappd.content
                }
            }
        });
    };
}(this));
