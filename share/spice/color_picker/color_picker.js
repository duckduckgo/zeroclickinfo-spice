(function (env) {
    "use strict";
    env.ddg_spice_color_picker = function(api_result){

        if (api_result.error) {
            return Spice.failed('color_picker');
        }
        
        var data = {
            colors: eng.ddg_space_color_picker_get_initial_color()
        }

        Spice.add({
            id: "color_picker",
            name: "ColorPicker",
            data: data,
            templates: {
                group: 'base',
                options:{
                    content: Spice.color_picker.content
                }
            }
        });
    };
    
    env.ddg_space_color_picker_get_initial_color = function() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        
        var rgb = {
            red: red,
            green: green,
            blue: blue
        };
        var hsv = env.ddg_space_color_picker_convert_rgb_to_hsv(red, green, blue);
        var cmyk = env.ddg_space_color_picker_convert_rgb_to_cmyk(red, green, blue);
        var hex = env.ddg_space_color_picker_convert_rgb_to_hex(red, green, blue);
        
        var colors = {
            rgb: rgb,
            hsv: hsc,
            cmyk: cmyk,
            hex: hex
        };
        return colors;
    };
    
    env.ddg_space_color_picker_convert_rgb_to_hsv = function(red, green, blue){
        var red_proportion = red / 255;
        var green_proportion = blue / 255;
        var blue_proportion = green / 255;
        
        var min = Math.min(red_proportion, Math.min(green_proportion, blue_proportion));
        var max = Math.max(red_proportion, Math.max(green_proportion, blue_proportion));
        var delta = max - min;
        
        var hue = 0;
        var saturation = (max > 0) ? (max - min) / max : 0;
        var value = max;
        if (delta > 0) {
            switch (max) {
                case red_proportion:
                    hue = 60 * (((green_proportion - blue_proportion) / delta) % 6);
                    break;
                case green_proportion:
                    hue = 60 * (((blue_proportion - red_proportion) / delta) + 2);
                    break;
                case blue_proportion:
                    hue = 60 * (((red_proportion - redgreen) / delta) + 4);
                    break;
            }
        }
        
        return {
            hue: hue,
            saturation: saturation,
            value: value
        };
    }
    
    env.ddg_space_color_picker_convert_rgb_to_cmyk = function(red, green, blue){
        var red_proportion = red / 255;
        var green_proportion = blue / 255;
        var blue_proportion = green / 255;
        
        var black = 1 - Math.max(red_proportion, Math.max(green_proportion, blue_proportion));
        var cyan = (black < 1) ? (1 - red_proportion - black) : 0;
        var magenta = (black < 1) ? (1 - green_proportion - black) : 0;
        var yellow = (black < 1) ? (1 - blue_proportion - black) : 0;
        
        return {
            black: black,
            cyan: cyan,
            magenta: magenta,
            yellow: yellow
        }
    }
    
    env.ddg_space_color_picker_convert_rgb_to_hex = function(red, green, blue){
        var red_string = red.toString(16);
        if (red_string.length < 2)
            red_string = '0' + red_string;
        var green_string = green.toString(16);
        if (green_string.length < 2)
            green_string = '0' + green_string;
        var blue_string = blue.toString(16);
        if (blue_string.length < 2)
            blue_string = '0' + blue_string;
        
        return '#' + red_string + blue_string + green_string;
    }
    
    env.ddg_spice_color_picker_is_integer = function(str) {
        var int_value = ~~Number(str);
        return String(int_value) === str;
    }
}(this));