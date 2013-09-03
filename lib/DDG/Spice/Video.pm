package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://duckduckgo.com/v.js?q=$1&n=20&callback={{callback}}';
triggers startend => 'video', 'videos', 'vimeo', 'youtube';
spice is_cached => 0;

handle remainder => sub {
    # We have to skip queries that are of the form "khan <trigger word>" and "khan academy <trigger word>".
    # We're going to skip these forms because we want the Khan Academy plugin to trigger instead of this one.
    my @skip_array = ("khan", "khan academy");
    my $skip_qr = join("|", @skip_array);

    if($_ =~ /^($skip_qr)$/) {
	return;
    }

    return $_ if $_;
    return;
};

1;
