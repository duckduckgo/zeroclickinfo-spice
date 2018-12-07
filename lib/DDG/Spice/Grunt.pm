package DDG::Spice::Grunt;

use DDG::Spice;

spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice to => 'http://gruntjs.com/plugin-list.json';

triggers startend => 'grunt plugin', 'grunt plugins', 'gruntjs', 'gruntjs plugin', 'gruntjs plugins', 'grunt.js plugin', 'grunt.js plugins';

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
