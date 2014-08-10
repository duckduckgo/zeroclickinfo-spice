package DDG::Spice::GithubStatus;
# ABSTRACT: Returns the current github status

use DDG::Spice;

triggers start => 'github status';

spice to => 'https://status.github.com/api/status.json?callback={{callback}}';

handle remainder => sub {
  return if $_;
  return "";
};

1;
