package DDG::Spice::KhanAcademy;

use DDG::Spice;

spice to => join '&',
    'https://gdata.youtube.com/feeds/api/videos?',
    'author=khanacademy',
    'max-results=50',
    'alt=json-in-script',
    'callback={{callback}}',
    'v=2',
    'q=$1';

triggers any => "khan", "khan academy";

attribution web => ['http://thoughtherder.org','Arlo Breault'],
            email => ['arlolra@gmail.com','Arlo Breault'];

handle remainder => sub {
    return $_ if defined $_;
    return;   
};

1;