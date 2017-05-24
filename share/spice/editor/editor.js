(function(env){
    "use strict";

    if (DDG.device.isMobile) {
        return Spice.failed('editor');
    }

    // Get the language from the query.
    var language = DDG.get_query().match(/javascript|python/i)[0].toLowerCase();

    function formatLanguageName(language) {
        var languageNames = {
            "javascript": "JavaScript",
            "python": "Python"
        };

        return languageNames[language.toLowerCase()];
    }

    env.ddg_spice_editor = function() {

        DDG.require("/js/ace/ace.js", function() {
            Spice.add({
                id: 'editor',
                name: 'Editor',
                data: {
                    title: formatLanguageName(language) + " Editor"
                },
                meta: {
                    sourceName: "Ace",
                    sourceUrl: "http://ace.c9.io/"
                },
                templates: {
                    // group: 'base',
                    detail: Spice.editor.editor,
                    options: {
                        // content: Spice.editor.editor
                    }
                },
                // The `ace` object looks for an element that has ID of `ace-editor`.
                // The `onShow` function triggers when the element is already on the page.
                onShow: function() {

                    var editor_id = "ace-editor";
                    var editor = ace.edit(editor_id);

                    // Remove margin.
                    editor.setShowPrintMargin(false);

                    // Tell Ace where the themes and modes are.
                    ace.config.set("basePath", "/js/ace/");

                    // Set theme based on DDG theme
                    if ($(".dark-header").length) {
                        editor.setTheme("ace/theme/monokai");
                    } else {
                        editor.setTheme("ace/theme/eclipse");
                    }

                    // Listen for clicks on the default theme button and change editor theme accordingly
                    $(".nav-menu__theme--default").click(function(e) {
                        editor.setTheme("ace/theme/eclipse");
                        e.stopPropagation();
                    });

                    // Listen for clicks on the dark theme button and change editor theme accordingly
                    $(".nav-menu__theme--d").click(function(e) {
                        editor.setTheme("ace/theme/monokai");
                        e.stopPropagation();
                    });

                    editor.getSession().setMode("ace/mode/" + language);

                    // Stop DDG keybindings, when editor has focus
                    $("#" + editor_id).keydown(function(e) {
                        e.stopPropagation();
                    });
                }
            });
        });
    };

    // manually fire the callback
    ddg_spice_editor();
}(this));