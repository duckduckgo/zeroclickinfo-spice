package DDG::Spice::CheatSheets;
# ABSTRACT: Load basic cheat sheets from cheat_sheet_api 

use DDG::Spice;
use DDP;

spice to => 'http://zach2.duckduckgo.com:8000/solr/staging/select?version=2.2&defType=edismax&qt=dismax&q=$1 source_match:cheat_sheet_api&fq=&wt=json&start=0&rows=2&json.wrf={{callback}}';

#triggers query => qr{^.+$};

triggers startend => (
    'char', 'chars',
    'character', 'characters',
    'cheat sheet', 'cheatsheet',
    'command', 'commands',
    'example', 'examples',
    'guide', 'help',
    'quick reference', 'reference',
    'shortcut', 'shortcuts',
    'symbol', 'symbols',
    'key bindings', 'keys', 'default keys'
);

#handle query_lc => sub {
handle remainder => sub {
	return qq{"$_"~3};
};

1;
