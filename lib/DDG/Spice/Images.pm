package DDG::Spice::Images;

use DDG::Spice;

use String::Trim;

spice to => 'https://127.0.0.1/i.js?q=$1&o=json&cb={{callback}}';

# Order matters for strip_qr.
my @any = (
    'images',
    'image',
    'pics',
    'pic',
    'photos',
    'photo',
    'photographs',
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
    ;

handle query_lc => sub {

    my $query = $_;

    $query =~ s/\s*$strip_qr//;
    $query = trim $query;

    return $query;
    return;
};

1;
