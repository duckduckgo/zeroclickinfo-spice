function ddg_spice_editor() {    

    var query = DDG.get_query();
    var params = query.split(/\s+/g);

    var supportedLanguajes = ["abap", "actionscript", "ada", "asciidoc", "assembly_x86", "autohotkey", "batchfile", "c9search", "c_cpp", "clojure", "cobol", "coffee", "coldfusion", "csharp", "css", "curly", "dart", "diff", "django", "d", "dot", "ejs", "erlang", "forth", "ftl", "glsl", "golang", "groovy", "haml", "handlebars", "haskell", "haxe", "html_completions", "html", "html_ruby", "ini", "jack", "jade", "java", "javascript", "jsoniq", "json", "jsp", "jsx", "julia", "latex", "less", "liquid", "lisp", "livescript", "logiql", "lsl", "lua", "luapage", "lucene", "makefile", "markdown", "matlab", "mushcode_high_rules", "mushcode", "mysql", "nix", "objectivec", "ocaml", "pascal", "perl", "pgsql", "php", "plain_text", "powershell", "prolog", "properties", "protobuf", "python", "rdoc", "rhtml", "r", "ruby", "rust", "sass", "scad", "scala", "scheme", "scss", "sh", "sjs", "snippets", "soy_template", "space", "sql", "stylus", "svg", "tcl", "tex", "textile", "text", "tmsnippet", "toml", "twig", "typescript", "vbscript", "velocity", "verilog", "vhdl", "xml", "xquery", "yaml"];

    var languaje = null;
    for (var i=0; i < params.length; i++) {

        var possibleLanguaje = $.trim(params[i].toLowerCase());
        if ($.inArray(possibleLanguaje, supportedLanguajes) !== -1) {
            languaje = possibleLanguaje;
            break;
        }
    }

    if (!languaje) return;

    nrj("share/spice/editor/ace.js");

    window.aceScriptLoaded = function() {

        var editor = ace.edit("ace-editor");    
        editor.setTheme("ace/theme/twilight");
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