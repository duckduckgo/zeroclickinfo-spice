package DDG::Spice::Images;

use DDG::Spice;

use String::Trim;

spice to => 'https://duckduckgo.com/i.js?q=$1&o=json&cb={{callback}}';

my %skip = map { $_ => 0 } (
    'google image',
    'google images',
    'images images',
    'image images',
    'image image',
    'image images',
);

# Order matters for strip_qr.
my @any = (
    'images',
    'image',
    'pics',
    'pic',
    'photos',
    'photo',
    'photographs',
    'icons',
    'icon'
    );

triggers any => @any;
my $strip_qr = join('|',@any);
$strip_qr = qr/$strip_qr/;

triggers startend =>
    'photograph',
    'meme',
    'memes',
    'book cover',
    'book covers',
    'gif',
    'jpg',
    'png',
    'logo',
    'logos',
    'wallpaper',
    'wallpapers',
    'wall paper',
    'wall papers',
    'screenshot',
    'screenshots',
    ;

handle query_lc => sub {
    my $query = $_;

    return if exists( $skip{$query} );

    $query =~ s/\s*$strip_qr\b//;
    $query = trim $query;

    #warn $strip_qr;
    #warn $query;

    return $query;
    return;
};

1;
