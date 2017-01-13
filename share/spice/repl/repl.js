(function (env) {
    "use strict";

    Spice.registerHelper('is_selected', function(option, value){
        if (option === value) {
            return ' selected';
        } else {
            return '';
        }
    });

    var langs = [
        { val: "apl", text: "Apl" },
        { val: "bloop", text: "Bloop" },
        { val: "babel", text: "Babel" },
        { val: "brainf", text: "Brainf" },
        { val: "c", text: "C" },
        { val: "csharp", text: "C#" },
        { val: "cpp", text: "C++" },
        { val: "cpp11", text: "C++11" },
        { val: "coffeescript", text: "CoffeeScript" },
        { val: "emoticon", text: "Emoticon" },
        { val: "fsharp", text: "F#" },
        { val: "forth", text: "Forth" },
        { val: "go", text: "Go" },
        { val: "java", text: "Java" },
        { val: "javascript", text: "JavaScript" },
        { val: "jest", text: "Jest" },
        { val: "lolcode", text: "Lolcode" },
        { val: "lua", text: "Lua" },
        { val: "nodejs", text: "Node.js" },
        { val: "php", text: "Php" },
        { val: "python", text: "Python" },
        { val: "python_turtle", text: "Python (Turtle)" },
        { val: "python3", text: "Python 3" },
        { val: "qbasic", text: "Qbasic" },
        { val: "roy", text: "Roy" },
        { val: "ruby", text: "Ruby" },
        { val: "rust", text: "Rust" },
        { val: "scheme", text: "Scheme" },
        { val: "swift", text: "Swift" },
        { val: "unlambda", text: "Unlambda" },
        { val: "web_project", text: "HTML, CSS" }
    ];

    // Remap languages to appropriate editing mode name
    // use "text" mode for unsupported languages
    var modes = {
        apl: "text",
        bloop: "text",
        brainf: "text",
        c: "c_cpp",
        cpp: "c_cpp",
        cpp11: "c_cpp",
        coffeescript: "coffee",
        emoticon: "text",
        fsharp: "text",
        go: "golang",
        jest: "text",
        lolcode: "text",
        nodejs: "javascript",
        python_turtle: "python",
        python3: "python",
        qbasic: "text",
        roy: "text",
        unlambda: "text"
    };

    function getMode(lang) {
        return modes[lang] || lang;
    }

    var editorOptions = {
        showPrintMargin: false,
        showInvisibles: true,
    };

    var hasShown = false,
        editor_id = "repl__editor",
        endpoint  = "/js/spice/repl_eval/";

    env.ddg_spice_repl = function(api_result) {

        var query = DDG.get_query(),
            codeLang = query.replace("repl", "").toLowerCase().trim();

        DDG.require("/js/ace/ace.js", function() {
            Spice.add({
                id: 'repl',
                name: 'REPL',
                data: api_result,
                meta: {
                    sourceName: 'repl.it',
                    sourceUrl: 'https://repl.it/languages/'
                },
                normalize: function() {
                    return {
                        langs: langs,
                        selected: codeLang
                    };
                },
                onShow: function () {
                    if (hasShown) {
                        console.log("ALREADY SHOWN");
                        return;
                    } else {
                        hasShown = true;
                    }

                    // Ace editor setup
                    ace.config.set("basePath", "/js/ace/");
                    var editor = ace.edit(editor_id);
                    var mode =  getMode(codeLang);
                    editor.setOptions(editorOptions);
                    editor.getSession().setMode("ace/mode/" + mode);

                    // Check for DDG dark theme
                    var theme = (DDG.settings.get('kae') === 'd') ? "tomorrow_night" : "tomorrow";
                    editor.setTheme("ace/theme/" + theme);

                    // Cache selectors
                    var $result = $("#repl__result"),
                        $submit = $("#repl__submit"),
                        $select = $("#repl__language"),
                        $editor = $("#" + editor_id);

                    // "Execute" button handler
                    $submit.click(function(){
                        var code = editor.getValue();
                        code = encodeURIComponent(code);
                        console.log("CODE: ", code);
                        var url = [endpoint, codeLang, code].join("/");
                        $.getJSON( url , function(data){
                            var output;
                            if (data && data[0]) {
                                output = data[0].error || data[0].data;
                            } else {
                                output = "Error: Unable to evaluate result";
                            }
                            $result.val(output);
                        });
                    });

                    // Select element handler
                    $select.change(function(){
                        codeLang = $select.find("option:selected").text().toLowerCase();
                        console.log("CODE LANGE: ", codeLang);
                        var mode = getMode(codeLang);
                        console.log("MODE: ", mode);
                        editor.getSession().setMode("ace/mode/" + mode);
                    });

                    // Stop DDG keybindings, when editor has focus
                    $editor.keydown(function(e) {
                        e.stopPropagation();
                    });
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.repl.content,
                        moreAt: true
                    }
                }
            });
        });
    };

}(this));
