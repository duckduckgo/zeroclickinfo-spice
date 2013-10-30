function ddg_spice_code_editor() {
    "use strict";
    var language = DDG.get_query().replace("code", "").replace("editor", "").trim();
    var context = {lang: language};
    Spice.render({
        data             : context,
        header1          : language + ' (Code Editor)',
        source_name      : 'Ace',
        source_url       : 'http://ace.c9.io/',
        template_normal  : 'code_editor',
        force_big_header : true
    });
    var el = document.getElementById("ddg_spice_code_editor_editor");
    var s = document.createElement("script");
    s.src = "http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js";
    s.type = "text/javascript";
    s.charset = "utf-8";
    s.onload = ddg_spice_code_editor_load();
    document.body.appendChild(s);
};

function ddg_spice_code_editor_load(e) {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/"+e.target.textContent);
}
ddg_spice_code_editor();