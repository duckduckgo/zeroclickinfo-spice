(function (env) {
    "use strict";
    env.ddg_spice_color_picker = function(){

        var initial_color = get_initial_color();
        var saturation_value_path = DDG.get_asset_path('color_picker', 'assets/saturation_value_gradient.png');
        var hue_path = DDG.get_asset_path('color_picker', 'assets/hue_gradient.png');
        var markers = get_marker_positions(initial_color.hsv);
        
        var data = {
            colors: initial_color,
            saturation_value_path: 'http://chrisharrill.com/images/saturation_value_gradient.png',
            hue_path: 'http://chrisharrill.com/images/hue_gradient.png',
            markers: markers
        }

        var templateObj = {
            detail: Spice.color_picker.content,
            item: Spice.color_picker.content,
            item_detail: false
        };

        var currentColor = initial_color;
        var saturation_value_mousedown = false;
        var hue_mousedown = false;

        function saturation_value_clicked(event) {
            var offset = $('#color_picker_container #saturation_value_picker').offset();
            var x = event.pageX - offset.left;
            var y = event.pageY - offset.top;

            var saturation = Math.floor((x / 256) * 100);
            var value = Math.floor(((256 - y) / 256) * 100);
            var hue = currentColor.hsv.hue;

            update_all_from_hsv(hue, saturation, value);
        }

        function hue_clicked(event) {
            var offset = $('#color_picker_container #hue_picker').offset();
            var y = event.pageY - offset.top;

            var hue = Math.floor((y / 256) * 360);
            var saturation = currentColor.hsv.saturation;
            var value = currentColor.hsv.value;

            update_all_from_hsv(hue, saturation, value);
        }

        function get_marker_positions(hsv) {
            var markers = {
                hue: {
                    y: Math.round((hsv.hue / 360) * 256) + 7
                },
                saturation_value: {
                    x: Math.round((hsv.saturation / 100) * 256) + 3,
                    y: 256 - Math.round((hsv.value / 100) * 256) + 7
                }
            }

            return markers;
        }

        function update_all_from_hsv(hue, saturation, value) {
            currentColor = get_all_colors_from_hsv(hue, saturation, value);
            markers = get_marker_positions(currentColor.hsv);
            update_all();
        }

        function get_all_colors_from_hsv(hue, saturation, value) {
            var hsv = {
                hue: hue,
                saturation: saturation,
                value: value
            };
            var rgb = convert_hsv_to_rgb(hue, saturation, value);
            var cmyk = convert_rgb_to_cmyk(rgb.red, rgb.green, rgb.blue);
            var hex = convert_rgb_to_hex(rgb.red, rgb.green, rgb.blue);
            var hex_hue = convert_hsv_to_hex(hue, 100, 100);

            var colors = {
                rgb: rgb,
                hsv: hsv,
                cmyk: cmyk,
                hex: hex,
                hex_hue: hex_hue
            };

            return colors;
        }

        function update_all() {
            $('#red_input').val(currentColor.rgb.red);
            $('#green_input').val(currentColor.rgb.green);
            $('#blue_input').val(currentColor.rgb.blue);
            $('#hue_input').val(currentColor.hsv.hue);
            $('#saturation_input').val(currentColor.hsv.saturation);
            $('#value_input').val(currentColor.hsv.value);
            $('#cyan_input').val(currentColor.cmyk.cyan);
            $('#magenta_input').val(currentColor.cmyk.magenta);
            $('#yellow_input').val(currentColor.cmyk.yellow);
            $('#black_input').val(currentColor.cmyk.black);
            $('#hex_input').val(currentColor.hex);

            $('#saturation_value_picker').css('background-color', currentColor.hex_hue);
            $('#sample').css('background-color', currentColor.hex);

            $('#saturation_value_marker').css('top', markers.saturation_value.y);
            $('#saturation_value_marker').css('left', markers.saturation_value.x);
            $('#hue_marker').css('top', markers.hue.y);
        }

        function convert_hsv_to_rgb(hue, saturation, value) {
            var c = (value / 100) * (saturation / 100);
            var x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
            var m = (value / 100) - c;

            var red = 0, green = 0, blue = 0;
            switch (true) {
                case 0 <= hue && hue < 60:
                    red = c; green = x; blue = 0;
                    break;
                case 60 <= hue && hue < 120:
                    red = x; green = c; blue = 0;
                    break;
                case 120 <= hue && hue < 180:
                    red = 0; green = c; blue = x;
                    break;
                case 180 <= hue && hue < 240:
                    red = 0; green = x; blue = c;
                    break;
                case 240 <= hue && hue < 300:
                    red = x; green = 0; blue = c;
                    break;
                case 300 <= hue && hue < 360:
                    red = c; green = 0; blue = x;
                    break;
            }
            red = Math.floor(255 * (red + m));
            green = Math.floor(255 * (green + m));
            blue = Math.floor(255 * (blue + m));

            var rgb = {
                red: red,
                green: green,
                blue: blue
            }
            return rgb;
        }

        function convert_rgb_to_hsv(red, green, blue){
            var red_proportion = red / 255;
            var green_proportion = blue / 255;
            var blue_proportion = green / 255;
            
            var min = Math.min(red_proportion, Math.min(green_proportion, blue_proportion));
            var max = Math.max(red_proportion, Math.max(green_proportion, blue_proportion));
            var delta = max - min;
            
            var hue = 0;
            var saturation = (max > 0) ? Math.round(((max - min) * 100) / max) : 0;
            var value = Math.round(max * 100);
            if (delta > 0) {
                switch (max) {
                    case red_proportion:
                        hue = Math.round(60 * (((green_proportion - blue_proportion) / delta)));
                        break;
                    case green_proportion:
                        hue = Math.round(60 * (((blue_proportion - red_proportion) / delta) + 2));
                        break;
                    case blue_proportion:
                        hue = Math.round(60 * (((red_proportion - green_proportion) / delta) + 4));
                        break;
                }
            }
            if (hue < 0) hue += 360;
            
            var hsv = {
                hue: hue,
                saturation: saturation,
                value: value
            };

            return hsv;
        }

        function convert_rgb_to_cmyk(red, green, blue){
            var red_proportion = red / 255;
            var green_proportion = blue / 255;
            var blue_proportion = green / 255;
            
            var black = 1 - Math.max(red_proportion, Math.max(green_proportion, blue_proportion));
            var cyan = (black < 1) ? (1 - red_proportion - black) : 0;
            var magenta = (black < 1) ? (1 - green_proportion - black) : 0;
            var yellow = (black < 1) ? (1 - blue_proportion - black) : 0;
            
            return {
                black: (100 * black).toFixed(1),
                cyan: (100 * cyan).toFixed(1),
                magenta: (100 * magenta).toFixed(1),
                yellow: (100 * yellow).toFixed(1)
            }
        }
    
        function convert_rgb_to_hex(red, green, blue){
            var red_string = red.toString(16);
            if (red_string.length < 2)
                red_string = '0' + red_string;
            var green_string = green.toString(16);
            if (green_string.length < 2)
                green_string = '0' + green_string;
            var blue_string = blue.toString(16);
            if (blue_string.length < 2)
                blue_string = '0' + blue_string;
            
            return '#' + red_string + green_string + blue_string;
        }

        function convert_hsv_to_hex(hue, saturation, value) {
            var rgb = convert_hsv_to_rgb(hue, saturation, value);
            var hex = convert_rgb_to_hex(rgb.red, rgb.green, rgb.blue);
            return hex;
        }
    
        function get_initial_color() {
            var hue = Math.floor(Math.random() * 100);
            var saturation = Math.floor(Math.random() * 100);
            var value = Math.floor(Math.random() * 100);

            var colors = get_all_colors_from_hsv(hue, saturation, value);

            return colors;
        };
    
        function is_integer(str) {
            var int_value = ~~Number(str);
            return String(int_value) === str;
        }

        Spice.add({
            id: "color_picker",
            name: "ColorPicker",
            data: data,
            meta: {},
            templates: templateObj,
            onShow: function() {
                $('#color_picker_container #saturation_value_picker').click(saturation_value_clicked);
                $('#color_picker_container #saturation_value_picker').on('dragstart', function(event) { event.preventDefault();});
                $('#color_picker_container #saturation_value_picker').mousedown(function(event) { saturation_value_mousedown = true; });
                $('#color_picker_container #saturation_value_picker').mousemove(function(event) { if (saturation_value_mousedown) saturation_value_clicked(event); });
                $('#color_picker_container #hue_picker').click(hue_clicked);
                $('#color_picker_container #hue_picker').on('dragstart', function(event) { event.preventDefault();});
                $('#color_picker_container #hue_picker').mousedown(function(event) { hue_mousedown = true; });
                $('#color_picker_container #hue_picker').mousemove(function(event) { if (hue_mousedown) hue_clicked(event); });
                $('#color_picker_container').mouseup(function(event) { saturation_value_mousedown = false; hue_mousedown = false; });
                $('#color_picker_container').focusout(function(event) { saturation_value_mousedown = false; hue_mousedown = false; });
                update_all();
            }
        });
    };
}(this));