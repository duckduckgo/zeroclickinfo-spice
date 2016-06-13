package DDG::Spice::FrequencyAllocation;

# ABSTRACT: Return informations about a given electromagnetic wave frequency. Version 1.

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice from => '(\w+)/(\w+)';
spice to => 'https://data.fcc.gov/api/spectrum-view/services/advancedSearch/getSpectrumBands?frequencyFrom=$1&frequencyTo=$2&format=jsonp&callback={{callback}}';
triggers startend => 'mhz';

handle remainder => sub {
    if (($_ >= 225) && ($_ < 3700)){
        return $_,$_+1;
    }
    return;
};

1;
