(function (env) {
    "use strict";

    env.ddg_spice_speedtest = function(api_result) {
        var $spice;
        var state = {
            speed: 0
        };

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.url) {
            return Spice.failed('speedtest');
        }

        /**
         * Render function
         *
         * @return void
         */
        function render(data) {
            var html = '<div class="zci__main  zci__main--detail  c-base">'
                            +   '<div class="zci__body">'
                                + data
                                + '<div class="c-base__links"></div>'
                            + '</div>'
                        + '</div>';

            $spice.html(html);
        }

        var imageAddr = api_result.url;
        var downloadSize = 4995374; //bytes

        var startTime, endTime;
        var download = new Image();

        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function (err, msg) {
            alert("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?" + startTime;
        //download.src = imageAddr + cacheBuster;
        download.src = imageAddr;

        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;

            /**
             * convertion
             */
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);

            /**
             * Stop loader to display results
             */
            stopLoader();

            // Display
            render("Result: <b>" + speedMbps + "</b> mbps");
        }

        /**
         * Loader animation
         */
        var interval;
        var animationI = 0;

        /**
         * Start loading animation
         *
         * @return void
         */
        function startLoader() {

            interval = setInterval(function () {
                animationI++;

                render("<b>Loading " + getloader() + "</b>");
            }, 600);
        }

        /**
         * Return `animationI` times a dot to create the loader animation #yeah
         *
         * @return string
         */
        function getloader() {
            var string = "";
            var i = 0;

            while (i < animationI) {
                string += ".";

                i++;
            }

            if(animationI > 2)
                animationI = 0;

            return string;
        }

        /**
         * Stop loading animation
         *
         * @return void
         */
        function stopLoader() {
            clearInterval(interval);
        }

        /**
         * Render
         */
        Spice.add({
            id: "speedtest",

            // Customize these properties
            name: "Result",
            data: state,
            templates: {
                group: 'base',
                options: {
                    content: Spice.speedtest.content,
                    moreAt: false
                }
            },
            onShow: startLoader // Start loading animation on Spice show
        });

        /**
         * Directly get the Jquery dom element
         */
        var $spice = Spice.getDOM('speedtest');

    };
}(this));
