package DDG::Spice::Torrent;

use DDG::Spice;

attribution twitter => 'mithrandiragain',
            web => ['http://www.atomitware.tk/mith','MithrandirAgain'];

triggers query_lc => qr/\burn:btih:([A-F\d]{40})\b|dht:\/\/([A-F\d]{40})(?:\.dht)*|(?:bittorrents?|torrents?|bt|magnet)\s+(.*)/i;

spice wrap_jsonp_callback => 1;
spice to => 'http://isohunt.com/js/json.php?ihq=$1&rows=4&sort=seeds';

handle matches => sub {
    return @_ if @_;
};

1;
