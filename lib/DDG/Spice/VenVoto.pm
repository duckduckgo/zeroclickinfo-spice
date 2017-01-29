package DDG::Spice::VenVoto;

use DDG::Spice;

my $url = 'http://www.cne.gob.ve/web/registro_electoral/ce.php';

triggers any => 'venvoto';

spice wrap_string_callback => 1;

spice from => '(.)/(.+)';
spice to   => $url . '?nacionalidad=$1&cedula=$2';

handle remainder => sub {
  ( my $n, my $c ) = $_ =~ /^(V|E|F)(\d+)$/i;
  return unless ( $n and $c );
  return ($n, $c);
};

1;