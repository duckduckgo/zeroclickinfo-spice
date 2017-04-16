(function (env) {
    "use strict";

    var keycodeLookup = [
        { key: 'backspace', code: 8 },      { key: 'tab', code: 9 },        { key: 'enter', code: 13 },
        { key: 'shift', code: 16 },         { key: 'ctrl', code: 17 },      { key: 'alt', code: 18 },
        { key: 'pause', code: 19 },         { key: 'break', code: 19 },     { key: 'caps lock', code: 20 },
        { key: 'escape', code: 27 },        { key: 'space', code: 32 },     { key: 'page up', code: 33 },
        { key: 'page down', code: 34 },     { key: 'end', code: 35 },       { key: 'home', code: 36 },
        { key: 'left arrow', code: 37 },    { key: 'up arrow', code: 38 },  { key: 'right arrow', code: 39 },
        { key: 'down arrow', code: 40 },    { key: 'insert', code: 45 },    { key: 'delete', code: 46 },

        { key: '0', code: 48 },         { key: '1', code: 49 },         { key: '2', code: 50 },
        { key: '3', code: 51 },         { key: '4', code: 52 },         { key: '5', code: 53 },
        { key: '6', code: 54 },         { key: '7', code: 55 },         { key: '8', code: 56 },
        { key: '9', code: 57 },

        { key: 'a', code: 65 },         { key: 'b', code: 66 },         { key: 'c', code: 67 },
        { key: 'd', code: 68 },         { key: 'e', code: 69 },         { key: 'f', code: 70 },
        { key: 'g', code: 71 },         { key: 'h', code: 72 },         { key: 'i', code: 73 },
        { key: 'j', code: 74 },         { key: 'k', code: 75 },         { key: 'l', code: 76 },
        { key: 'm', code: 77 },         { key: 'n', code: 78 },         { key: 'o', code: 79 },
        { key: 'p', code: 80 },         { key: 'q', code: 81 },         { key: 'r', code: 82 },
        { key: 's', code: 83 },         { key: 't', code: 84 },         { key: 'u', code: 85 },
        { key: 'v', code: 86 },         { key: 'w', code: 87 },         { key: 'x', code: 88 },
        { key: 'y', code: 89 },         { key: 'z', code: 90 },
        
        { key: 'numpad 0', code: 96 },  { key: 'numpad 1', code: 97 },  { key: 'numpad 3', code: 98 },
        { key: 'numpad 4', code: 100 }, { key: 'numpad 5', code: 101 }, { key: 'numpad 6', code: 102 },
        { key: 'numpad 7', code: 103 }, { key: 'numpad 8', code: 104 }, { key: 'numpad 9', code: 105 },

        { key: 'f1', code: 112 },   { key: 'f2', code: 113 },   { key: 'f3', code: 114 },
        { key: 'f4', code: 115 },   { key: 'f5', code: 116 },   { key: 'f6', code: 117 },
        { key: 'f7', code: 118 },   { key: 'f8', code: 119 },   { key: 'f9', code: 120 },
        { key: 'f10', code: 121 },  { key: 'f11', code: 122 },  { key: 'f12', code: 123 },

        { key: 'num lock', code: 144 }, { key: 'scroll lock', code: 145 },  { key: ';', code: 186 },
        { key: '*', code: 106 },        { key: '-', code: 189 },            { key: '.', code: 190 },
        { key: "=", code: 187 },        { key: ',', code: 188 },            { key: '/', code: 191 },
        { key: '\\', code: 220 },       { key: '(', code: 219 },            { key: ')', code: 221 },
        { key: 'quote', code: 222 }
    ];

    function getKeycodeByKey(key) {
        return $.grep(keycodeLookup, function (keycodeItem) {
            return keycodeItem.key === key;
        })[0];
    }

    function getKeycodeByCode(code) {
        return $.grep(keycodeLookup, function (keycodeItem) {
            return keycodeItem.code === code;
        })[0];
    }

    env.ddg_spice_js_keycodes = function(api_result){
        var query = DDG.get_query(),
            key = query.replace(/js|javascript|key\s?(code)?s?/g, "").trim().toLowerCase(),
            data = {};

        // if the query was something like "keycode tab"
        // display the result for that
        // otherwise we render the keycode tester
        if (key) {
            data.result = getKeycodeByKey(key);
        }

        // grab all the codes for the keycodes table
        // manually add the index as this version of handlebars
        // doesn't support @index inside #each
        data.codes = $.map(keycodeLookup, function (keycode, index) {
            return {
                key: keycode.key,
                code: keycode.code,
                index: index
            };
        });

        Spice.registerHelper({
            // output three keycodes per row
            tr: function (options) {
                var markup = "";
                if (this.index % 3 === 0) {
                    markup += "<tr>";
                }

                markup += options.fn(this);

                if (this.index % 3 === 2) {
                    markup += "</tr>";
                }

                return markup;
            },
            // add separator between keycodes
            separator: function () {
                if (this.index % 3 !== 2) {
                    return "class='with-separator'";
                }
            }
        });

        Spice.add({
            id: "js_keycodes",
            name: "Keycodes",
            data: data,
            meta: {
                sourceName: "MDN",
                sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.js_keycodes.content,
                    moreAt: true
                }
            },
            onShow: onShow
        });

        function onShow() {
            var $spice = Spice.getDOM("js_keycodes"),
                $table = $spice.find("table.all-keycodes"),
                $input = $spice.find("input.keycode-input"),
                $result = $spice.find("p.keycode-result");

            // hide / show keycodes table
            $(".zci--js_keycodes .show-keycodes").click(function (e) {
                e.preventDefault();

                $table.toggleClass("is-hidden");
            });

            // handle tester input
            $input.keydown(function (e) {
                var code = e.keyCode || e.which,
                    keyCode = getKeycodeByCode(code),
                    keyName;

                e.preventDefault();

                // in case keycode is unknown
                if (!keyCode) {
                    return;
                }

                keyName = keyCode.key;

                $input.val(keyName);
                $result.html("The keycode for <code>" + keyName + "</code> is: " + code);
            });
        }

    };
}(this));
