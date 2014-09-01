(function(env) {
    "use strict";

    env.ddg_spice_editor = function(api_result) {

        var script = $('[src*="/js/spice/editor/"]')[0];
        var source = $(script).attr("src");
        var language = source.match(/editor\/([^\/]+)/)[1];

        nrj("share/spice/editor/ace.js");

        window.aceScriptLoaded = function() {

            var editor_id = "ace-editor";

            var editor = ace.edit(editor_id);

            if ($(".dark-header").length) {
                editor.setTheme("ace/theme/monokai");
            } else {
                editor.setTheme("ace/theme/eclipse");
            }

            editor.getSession().setMode("ace/mode/" + language);

            $("#" + editor_id).height("400px");

            // Stop DDG keybindings, when editor has focus
            $("#" + editor_id).keydown(function(e) {
                e.stopPropagation();
            });
        }

        Spice.add({
            id: 'editor',
            name: 'Editor',
            data: api_result,
            meta: {
                sourceName: "Ace",
                sourceUrl: "http://ace.c9.io/"
            },
            normalize: function(item) {

                function formatLanguageName(language) {
                    var languageNames = {
                        "javascript": "JavaScript",
                        "python": "Python"
                    };

                    return languageNames[language.toLowerCase()];
                }

                return {
                    title: formatLanguageName(language) + " Editor"
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.editor.editor
                }
            },
        });
    };
}(this));