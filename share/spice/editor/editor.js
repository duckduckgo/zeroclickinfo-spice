function ddg_spice_editor() {    

    var script = $('[src*="/js/spice/editor/"]')[0];
    var source = $(script).attr("src");
    var language = source.match(/editor\/([^\/]+)/)[1];

    nrj("share/spice/editor/ace.js");

    window.aceScriptLoaded = function() {

        var editor = ace.edit("ace-editor");    
        editor.setTheme("ace/theme/eclipse");
        editor.getSession().setMode("ace/mode/" + language);
    }    

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    Spice.render({
        header1          :  capitaliseFirstLetter(language) + " Editor",
        source_name      : "Ace",
        source_url       : "http://ace.c9.io/",
        template_normal  : "editor",
        force_big_header :  true,
        force_no_fold    :  true
    });
}