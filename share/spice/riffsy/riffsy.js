(function (env) {
    "use strict";
    var ianame = 'riffsy';
    env.ddg_spice_riffsy = function(api_result){
        if (!api_result || api_result.error || !api_result.results || !api_result.results.length) {
            return Spice.failed(ianame);
        }

        var _shown = false,
            _gifs = {};

        Spice.add({
            id: ianame,
            name: 'GIFs',
            data: api_result.results,
            view: 'Images',
            meta: {
                sourceName: 'Tenor',
                sourceUrl: api_result.weburl,
            },
            normalize: function(item) {
                if (item.media && item.media.length && item.media[0].tinygif && item.media[0].gif) {
                    var media = item.media[0];
                    _gifs[DDG.getImageProxyURL(media.tinygif.preview)] = DDG.getImageProxyURL(media.tinygif.url); // cache proxied url pair for hover callback
                    return {
                        thumbnail: media.tinygif.preview,
                        thumbnail_gif: media.tinygif.url,
                        tileWidth: media.tinygif.dims[0],
                        highResImage: media.gif.url,
                        image: media.gif.url,
                        url: item.url,
                        height: media.gif.dims[1],
                        width: media.gif.dims[0],
                        title: item.title,
                    };
                }
                return {};
            },
            templates: {
                group: 'images'
            },
            onShow: function() {
                if (_shown) return;

                var $dom = $(".zci--"+ianame);

                // hide info overlay for gifs
                $dom.find(".tile--img__details").hide();

                var loadingImg = DDG.get_asset_path("riffsy", "loading.png");

                // create loading gif image
                var $loading = $("<div />")
                    .css("background-image", "url("+loadingImg+")")
                    .css("background-position", "left center")
                    .addClass("tile__img--loader");

                // inject our loading gif
                $loading.insertBefore(".tile--img__media__i").hide();

                $dom.find(".tile--img").each(function(){
                    var $img = $(this).find("img.tile--img__img"),
                        _src = $img.data("src"),
                        _gif = _gifs[_src],
                        $loading = $(this).find(".tile__img--loader");

                    $img.load(function() {
                        // Make sure we only apply `loaded` class after image loads
                        // when src is set to gif
                        // This prevents adding `loaded` when static image initially loads in tile
                        if (!$img.hasClass("loaded") && $img.attr("src") === _gif){
                            $loading.hide();
                            $img.addClass("loaded");
                            $img.removeClass("loading");
                        }
                    });

                    // add callback to tile because
                    // existing hover callback (for image details) was causing problems
                    $(this).hover(
                        function(){
                            if (!$img.hasClass("loaded")){
                                $loading.show();
                                $img.addClass("loading");
                            }
                            $img.attr("src", _gif);
                        }, function(){
                            if (!$img.hasClass("loaded")){
                                $img.removeClass("loading");
                                $loading.hide();
                            }
                            $img.attr("src", _src);
                        }
                    );
                });
                _shown = true;
            }
        });
    };
}(this));
