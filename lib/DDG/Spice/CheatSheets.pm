package DDG::Spice::CheatSheets;
# ABSTRACT: Load basic cheat sheets from cheat_sheet_api 

use DDG::Spice;
use DDP;

spice to => 'http://jason.duckduckgo.com:8000/solr/staging/select?version=2.2&defType=edismax&qt=dismax&q=$1 source_match:cheat_sheet_api&fq=&wt=json&start=0&rows=2&json.wrf={{callback}}';

triggers query => qr{^.+$};

handle query_lc => sub {
	return $_;
};

1;
