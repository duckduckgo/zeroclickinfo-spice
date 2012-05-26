package DDG::Spice::SearchCode;

use DDG::Spice;

triggers query_lc => qr/(?:apache2\s*directive|apache|apache2|apple\s*ios|ios|brainfuck|clojure|cobol|emacs|fossil|ftp\s*code|git|hello\s*world|hresult|http\s*code|java|jquery|linux\s*command|linux\s*kernel\s*error|mercurial|hg|mysql\s*error|mysql\s*function|nt\s*statu\s|osx|perl|perl5|perl5\s*var|perl\s*var|php|python|smarty|snippet|sql\s*server\s*function|svn|underscore\.js|underscore|vb6|win32\s*error|windows\s*command) (.*)/;

spice to => 'http://searchco.de/api/jsonp_search_III/$1?callback={{callback}}';

handle matches => sub {
    my ($match) = @_;
    return $match if $match;
    return;
};

1;
