package DDG::Spice::SearchCode;

use DDG::Spice;

triggers query_lc => qr/apache2\s*directive|apache|apache2|apple\s*ios|ios|brainfuck|clojure|cobol|emacs|fossil|ftp\s*code|git|hello\s*world|hresult|http\s*code|java|java\s*script|jquery|linux\s*command|linux\s*kernel\s*error|mercurial|mysql\s*error|mysql\s*function|ntstatus|osx|perl|perl5|perl5\s*var|php|python|smarty|snippet|sql\s*server\s*function|svn|underscore\.js|underscore|vb6|win32\s*error|windows\s*command/;

spice to => 'http://searchco.de/api/jsonp_search_II/$1?callback={{callback}}';

handle query_raw => sub {
    # check if there is anything to search for
    if ($_ =~ qr/apache2\s*directive|apache|apache2|apple\s*ios|ios|brainfuck|clojure|cobol|emacs|fossil|ftp\s*code|git|hello\s*world|hresult|http\s*code|java|javascript|jquery|linux\s*command|linux\s*kernel\s*error|mercurial|mysql\s*error|mysql\s*function|ntstatus|osx|perl|perl5|perl5\s*var|php|python|smarty|snippet|sql\s*server\s*function|svn|underscore\.js|underscore|vb6|win32\s*error|windows\s*command .+/i) {
        return $_;
    }
    return;
};

1;
