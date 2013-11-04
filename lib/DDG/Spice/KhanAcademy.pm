package DDG::Spice::KhanAcademy;

use DDG::Spice;

primary_example_queries "khan academy videos";
secondary_example_queries "khan trigonometry";
description "Shows Khan Academy videos";
name "Khan Academy";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/KhanAcademy.pm";
icon_url "/i/khanacademy.org.ico";
topics "math";
category "reference";
attribution web => ['http://thoughtherder.org','Arlo Breault'],
            email => ['arlolra@gmail.com','Arlo Breault'],
						github => ['https://github.com/arlolra','arlolra'];

spice to => 'http://gdata.youtube.com/feeds/api/videos?&author=khanacademy&max-results=50&alt=json-in-script&callback={{callback}}&v=2&q=$1';

triggers any => "khan", "khan academy";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
