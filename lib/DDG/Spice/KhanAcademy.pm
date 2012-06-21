package DDG::Spice::KhanAcademy;

use DDG::Spice;

spice to => join '&',
    'https://gdata.youtube.com/feeds/api/videos?',
    'author=khanacademy',
    'max-results=48',
    'alt=json-in-script',
    'callback={{callback}}',
    'v=2',
    'q=$1';

triggers query_lc => qr/^khan(\s+academy)?\s+(.*)/;

handle matches => sub {
    return $2 if $2 and $2 ne 'academy';
    return;   
};

1;