function ddg_spice_editor() {    

    var query = DDG.get_query();
    var params = query.split(/\s+/g);

    var supportedLanguages = ["javascript", "python"];

    var languaje = null;
    for (var i=0; i < params.length; i++) {

        var possibleLanguaje = $.trim(params[i].toLowerCase());
        if ($.inArray(possibleLanguaje, supportedLanguages) !== -1) {
            languaje = possibleLanguaje;
            break;
        }
    }

    if (!languaje) return;

    nrj("share/spice/editor/ace.js");

    window.aceScriptLoaded = function() {

        var editor = ace.edit("ace-editor");    
        editor.setTheme("ace/theme/eclipse");
        editor.getSession().setMode("ace/mode/" + languaje);
    }    

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    Spice.render({
        header1          :  capitaliseFirstLetter(languaje) + " Editor",
        source_name      : "Ace",
        source_url       : "http://ace.c9.io/",
        template_normal  : "editor",        
        force_big_header :  true,
        force_no_fold    : true,
    });
}