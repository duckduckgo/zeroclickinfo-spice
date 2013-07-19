package DDG::Spice::Guidebox::Getid;

use DDG::Spice;

primary_example_queries "guidebox Castle";
description "Search for full free episodes of all your favorite TV shows (USA only)";
name "Guidebox";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Guidebox/Getid.pm";
icon_url "/i/www.guidebox.com.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

triggers startend => "guidebox";
triggers start => "watch","full episodes of", "full free episodes of", "free episodes of", "episodes of";
triggers any => "full episodes", "watch free", "full free episodes", "free episodes", "episodes", "recent episodes";

spice to => 'http://api-public.guidebox.com/v1.3/json/rKu5Jv4vtj0T0qOQAhSYr8sUQWcBNmpS/search/all/title/$1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    if ($loc->country_name eq "United States"){
        my $tmp = '';
        if ($_ ~= qr/^watch ([\w\s])+ online$/ ){
            $tmp = $1;
        } elsif ($_ ~= qr/^watch episodes of ([\w\s])+ online$/){
            $tmp = $1;
        } elsif ($_ ~= qr/^watch ([\w\s])+ series$/){
            $tmp = $1;
        } elsif ($_ ~= qr/^watch ([\w\s])+ tv series$/){
            $tmp = $1;
        } else {
            $tmp = $_;
        }
        return $tmp if $tmp;
    }
    return;
};

1;
