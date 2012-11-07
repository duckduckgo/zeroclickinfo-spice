package DDG::Spice::SearchCode;

use DDG::Spice;

name "SearchCode";
description "search through APIs and open source repositories";
source "Search[code]";
attribution twitter => ["https://twitter.com/boyter", "boyter"],
	    github => ["https://github.com/boyter", "Ben Boyter"];
primary_example_queries "underscore.js bind";
secondary_example_queries "php print_r";
category "reference";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SearchCode.pm";
icon_url "/i/searchco.de.ico";
status "enabled";


triggers startend => "apache2","apache","apple ios","ios","brainfuck","clojure","cobol","emacs","fossil","ftp code","git","hello world","hresult","http code","java","jquery","linux command","linux kernel error","kernel error","mercurial","hg","mysql error","mysql function","nt status","osx","perl","perl5","perl5 var","perl var","php","python","smarty","sql server function","sql server","svn","underscore.js","underscore","vb6","win32 error","windows command";

spice to => 'http://searchco.de/api/jsonp_search_IV/?q=$1&callback={{callback}}';

handle query_raw => sub {
    # check if there is anything to search for
    my $words = 'apache2\s*directive|apache|apache2|apple\s*ios|ios|brainfuck|clojure|cobol|emacs|fossil|ftp\s*code|git|hello\s*world|hresult|http\s*code|java|jquery|linux\s*command|linux\s*kernel\s*error|mercurial|hg|mysql\s*error|mysql\s*function|nt\s*status|osx|perl|perl5|perl5\s*var|perl\s*var|php|python|smarty|snippet|sql\s*server\s*function|sql\*server|svn|underscore\.js|underscore|vb6|win32\s*error|windows\s*command';
    if ($_ =~ qr/(\w+\s*$words|$words\s*\w+)(?!\s+jobs?)/i){
        return $_ unless $_ =~ qr/\b(example|code)\b/i;
    }
    return;
};

1;
