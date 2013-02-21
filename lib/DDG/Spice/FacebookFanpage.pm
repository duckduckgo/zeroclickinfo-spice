package DDG::Spice::FacebookFanpage;

use DDG::Spice;

# This plugin will respond to queries like "facebook cafepress" and display the data of the "cafepress" fanpage
# So any query with facebook in it - it will pick the next word and decipher it as a fan page
# It will get the data of the fanpage

spice to => 'http://graph.facebook.com/$1?callback={{callback}}';

triggers query_lc => qr/facebook[\s]+([^\s]+)/;

handle matches => sub {
    my (@uname) = @_;
    return @uname if @uname;
    return;
};
1;
