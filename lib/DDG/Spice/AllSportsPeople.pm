package DDG::Spice::AllSportsPeople;

use DDG::Spice;

triggers any => 'allsportspeople';

spice to => 'http://www.allsportspeople.com/api/$1/{{callback}}/';
#spice to => 'http://4acetechnologies.com/projects/devshh/duckduckgo/task.php?name=$1&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
