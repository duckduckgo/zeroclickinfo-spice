#!/usr/bin/env perl
#@xe.com
use open ':std', ':encoding(UTF-8)'; #prevent wide character warns
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [
        'DDG::Spice::Currency'
    ],
    '1 usd to won' => test_spice(
        '/js/spice/currency/1/usd/krw',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '50 pesos to $' => test_spice(
        '/js/spice/currency/50/mxn/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1 peso to usd' => test_spice(
        '/js/spice/currency/1/mxn/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # using k for thousand
    'convert 4.000.000k euro to usd' => test_spice(
        '/js/spice/currency/4000000000/eur/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'euro cny' => test_spice(
        '/js/spice/currency/1/eur/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '400 eur cny' => test_spice(
        '/js/spice/currency/400/eur/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'euro 400 jpy' => test_spice(
        '/js/spice/currency/400/eur/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 us dollar to euro' => test_spice(
        '/js/spice/currency/499/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 nis to euro' => test_spice(
        '/js/spice/currency/499/ils/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 lei to euro' => test_spice(
        '/js/spice/currency/499/ron/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 usd to leu' => test_spice(
        '/js/spice/currency/499/usd/ron',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # using currency keyword
    '2 ruble currency in yen' => test_spice(
        '/js/spice/currency/2/rub/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '20 usd currency in mexican peso currency' => test_spice(
        '/js/spice/currency/20/usd/mxn',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # using value, price keyword
    '2 ruble value in yen' => test_spice(
        '/js/spice/currency/2/rub/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # using cardinals instead of zeros
    '4.5 billion us dollar to euro' => test_spice(
        '/js/spice/currency/4500000000/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 1021 gbp to cny' => test_spice(
        '/js/spice/currency/1021/gbp/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 1,021 hundred gbp to cny' => test_spice(
        '/js/spice/currency/102100/gbp/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1 malaysian rupee to uk pounds' => test_spice(
        '/js/spice/currency/1/myr/gbp',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '100 uk pound in malaysian rupees' => test_spice(
       '/js/spice/currency/100/gbp/myr',
       call_type => 'include',
       caller => 'DDG::Spice::Currency',
       is_cached => 0
    ),
    # Query with everything smushed together.
    '200cadusd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Query with everything smushed together, with k for thousand.
    '2k cadusd' => test_spice(
        '/js/spice/currency/2000/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Query using rubles instead of rub
    '500 rubles in dollars' => test_spice(
        '/js/spice/currency/500/rub/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '200 euros in ruble' => test_spice(
        '/js/spice/currency/200/eur/rub',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '500 roubles in dollars' => test_spice(
        '/js/spice/currency/500/rub/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '200 euros in rouble' => test_spice(
        '/js/spice/currency/200/eur/rub',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Queries that have "convert" in them.
    'convert 200 cad into usd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Queries with "vs" or "versus" in them.
    'usd vs eur' => test_spice(
        '/js/spice/currency/1/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers with commas in them.
    'convert 2,000 cad into usd' => test_spice(
        '/js/spice/currency/2000/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 2 million cad into usd' => test_spice(
        '/js/spice/currency/2000000/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers with commas and decimal points.
    'convert 2,000.19 cad into usd' => test_spice(
        '/js/spice/currency/2000.19/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers using the european formatting.
    'convert 2.000,19 cad into usd' => test_spice(
        '/js/spice/currency/2000.19/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'what is 10 php in usd?' => test_spice(
        '/js/spice/currency/10/php/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Using plural forms of currency
    'what is 19 hk dollars in thai bahts?' => test_spice(
        '/js/spice/currency/19/hkd/thb',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Using plural forms of currency with cardinal
    'what is 19 thousand hk dollars in thai bahts?' => test_spice(
        '/js/spice/currency/19000/hkd/thb',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '66 british pounds to rupees' => test_spice(
        '/js/spice/currency/66/gbp/inr',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    # Using currency symbols
    '$2 to £' => test_spice(
        '/js/spice/currency/2/usd/gbp',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '€ 20 to $' => test_spice(
        '/js/spice/currency/20/eur/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '$ 321 into yen' => test_spice(
        '/js/spice/currency/321/usd/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '321 $ to yen' => test_spice(
        '/js/spice/currency/321/usd/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

   '$45 to ؋' => test_spice(
        '/js/spice/currency/45/usd/afn',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '$100 to aud' => test_spice(
        '/js/spice/currency/100/usd/aud',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '500 usd to ¥' => test_spice(
        '/js/spice/currency/500/usd/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1000000₫ to €' => test_spice(
        '/js/spice/currency/1000000/vnd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 123$ to inr' => test_spice(
        '/js/spice/currency/123/usd/inr',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    # Support slash format e.g AUD/USD
    'aud/usd' => test_spice(
        '/js/spice/currency/1/aud/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert AUD/USD' => test_spice(
        '/js/spice/currency/1/aud/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    'convert 5 USD/AUD' => test_spice(
        '/js/spice/currency/5/usd/aud',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    '5 USD = AUD' => test_spice(
        '/js/spice/currency/5/usd/aud',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '5 USD = ? AUD' => test_spice(
        '/js/spice/currency/5/usd/aud',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    # Requirement for space between unit and currency
    '5m usd to aud' => test_spice(
        '/js/spice/currency/5000000/usd/aud',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1k ars to eur' => test_spice(
        '/js/spice/currency/1000/ars/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1 459 000 RUB to USD' => test_spice(
        '/js/spice/currency/1459000/rub/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Testing addition of shortened version of lev
    '5m usd to lev' => test_spice(
        '/js/spice/currency/5000000/usd/bgn',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '600 levs in rubles' => test_spice(
        '/js/spice/currency/600/bgn/rub',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # testing addition of sterling and pound sterling
    '5 sterling to usd' => test_spice(
        '/js/spice/currency/5/gbp/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '5k usd in pound sterling' => test_spice(
        '/js/spice/currency/5000/usd/gbp',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # testing addition of yuan
    '1 yuan to usd' => test_spice(
        '/js/spice/currency/1/cny/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1k usd in yuan' => test_spice(
        '/js/spice/currency/1000/usd/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '1m usd in yuan' => test_spice(
        '/js/spice/currency/1000000/usd/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # when you don't specify the target Currency
    # check for placing currency type before amount
    'CHF 2.95 in eur' => test_spice(
        '/js/spice/currency/2.95/chf/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'what is rub 400 in us dollars?' => test_spice(
        '/js/spice/currency/400/rub/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    ## lang based triggers
    'currency converter' => test_spice(
        '/js/spice/currency/1/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'currency conversion' => test_spice(
        '/js/spice/currency/1/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # generic lang queries with location detection
    DDG::Request->new(
        query_raw => "currency converter",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/currency/1/eur/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "currency converter",
        location => test_location("my")
    ) => test_spice(
        '/js/spice/currency/1/myr/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # no $to specified, departure from tile view
    DDG::Request->new(
        query_raw => "100cad",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/currency/100/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # default to usd if not usd
    '100,000cad' => test_spice(
        '/js/spice/currency/100000/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # default to eur if usd and no location detected
    '100,000 usd' => test_spice(
        '/js/spice/currency/100000/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),  
    '4k euro' => test_spice(
        '/js/spice/currency/4000/eur/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "bitcoin value",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/currency/1/xbt/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "bitcoin price",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/currency/1/xbt/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "canada dollar",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/currency/1/cad/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "400 euro",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/currency/400/eur/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),

    # Numbers with with ambiguous formatting.
    'convert 2,000.1.9 cad into usd' => undef,
    # Other types of conversion
    'convert 10 f to c' => undef,
    # Ambiguous queries.
    '100cny 40usd' => undef,
    '10 euro to 10 jpy' => undef,
    '1mars' => undef,
    '1baud' => undef,
    'mars' => undef,
    'kaud' => undef,
    'baud' => undef,

    'k aud' => undef,
    'm aud' => undef,
    'b aud' => undef,
    't aud' => undef,

    # standalone symbols
    'Irl' => undef,
    'usd' => undef,
    'gbp' => undef,
    'EUR' => undef,
    'CaD' => undef,

    # Things that should probably work but it doesn't at the moment.
    'cny jpy 400' => undef,

    # We don't want to trigger on date-looking things.
    'euro 2016' => undef,
    # Doesn't trigger with ficticious currencies
    '2 british houses to australian dollars' => undef,
    'what is 1 euro in canadian donuts' => undef,
    # Irellevant queries
    'convert religion' => undef,
    'what is a cow' => undef,
    'usda' => undef,
    'sda loans' => undef,
    
    # edge cases that we don't want to trigger
    'mop tops' => undef,
);

done_testing;
