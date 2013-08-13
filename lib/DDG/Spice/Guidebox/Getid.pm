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
triggers start => "watch", "full episodes of", "full free episodes of", "free episodes of", "episodes of";
triggers any => "full episodes", "watch free", "full free episodes", "free episodes", "episodes", "recent episodes";

spice to => 'http://api-public.guidebox.com/v1.3/json/{{ENV{DDG_SPICE_GUIDEBOX_APIKEY}}}/search/title/$1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    if ($loc->country_name eq "United States" || $loc->country_name eq Canada){
        
        my $show = '';
        
        if ($_ =~ qr/^([\w\s]+) (?:episodes?)? online$/ ){
            $show = $1; 
        } elsif ($_ =~ qr/^episodes? of ([\w\s]+)(?:\s*online)?$/){
            $show = $1;
        } elsif ($_ =~ qr/^([\w\s]+) episodes?$/){
            $show = $1;
        } elsif ($_ =~ qr/^([\w\s]+) series$/){
            $show = $1;
        } elsif ($_ =~ qr/^([\w\s]+) tv series$/){
            $show = $1;
        } else {
            $show = $_;
        }
        return $show if $show;
    }
    return;
};

1;