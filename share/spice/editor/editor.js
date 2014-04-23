function ddg_spice_editor() {    

    var script = $('[src*="/js/spice/editor/"]')[0];
    var source = $(script).attr("src");
    var language = source.match(/editor\/([^\/]+)/)[1];

    nrj("share/spice/editor/ace.js");

    window.aceScriptLoaded = function() {

        var editor_id = "ace-editor";

        var editor = ace.edit(editor_id);    
        editor.setTheme("ace/theme/eclipse");
        editor.getSession().setMode("ace/mode/" + language);

        $("#" + editor_id).height("400px");

        // Adjust the box margins--can't do this in css
        var style = "padding-left: 0px !important; margin-left: 0px !important;" +
                    "padding-top: 0px !important; margin-top: 0px !important;";
        $("#zero_click_wrapper2 #zero_click_abstract").attr("style", style);

        // Stop DDG keybindings, when editor has focus
        $("#" + editor_id).keydown(function(e) {            
            e.stopPropagation();
        });
    }    

    function formatLanguageName(language) {

        var languageNames = {
            "javascript": "JavaScript",
            "python": "Python"
        };

        return languageNames[language.toLowerCase()];
    }
    
    Spice.add({
        header1          :  formatLanguageName(language) + " Editor",
        sourceName      : "Ace",
        sourceUrl       : "http://ace.c9.io/",
        templates: {
            item: Spice.editor.editor,
            detail: Spice.editor.editor
        },
        
        
    });
}