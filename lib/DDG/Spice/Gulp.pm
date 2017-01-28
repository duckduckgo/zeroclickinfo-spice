package DDG::Spice::Gulp;

use DDG::Spice;

spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice to => 'http://npmsearch.com/query?fields=name,keywords,rating,description,author,modified,homepage,version,license&q=$1%20AND%20keywords:gulpplugin&sort=rating:desc';

triggers any => 'gulp', 'gulp plugin', 'gulp plugins', 'gulpjs', 'gulpjs plugin', 'gulpjs plugins', 'gulp.js', 'gulp.js plugin', 'gulp.js plugins';

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
