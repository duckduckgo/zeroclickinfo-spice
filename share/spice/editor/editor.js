function ddg_spice_editor() {

    // Get the language from the query.
    var language = DDG.get_query().match(/javascript|python/i)[0].toLowerCase();

    function formatLanguageName(language) {
        var languageNames = {
            "javascript": "JavaScript",
            "python": "Python"
        };
        
        return languageNames[language.toLowerCase()];
    }
       
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
            group: 'base',
            options: {
                content: Spice.editor.editor
            }
        },
        // The `ace` object looks for an element that has ID of `ace-editor`.
        // The `onShow` function triggers when the element is already on the page.
        onShow: function() {
            var editor_id = "ace-editor";
            var editor = ace.edit(editor_id);

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

            $("#" + editor_id).height("400px");

            // Stop DDG keybindings, when editor has focus
            $("#" + editor_id).keydown(function(e) {
                e.stopPropagation();
            });
        }
    });
};

// Load ace.js
// Ace is a bit buggy on mobile at the moment, so we don't want to display it there.
if(!is_mobile) {
    // Make sure to call ddg_spice_editor when ace.js loads.
    $.getScript("/js/ace/ace.js", function() {
        ddg_spice_editor(); 
    });
}