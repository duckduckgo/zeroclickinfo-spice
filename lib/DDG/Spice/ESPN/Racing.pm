package DDG::Spice::ESPN::Racing;

use DDG::Spice;
use Time::localtime;

description "News and stats for racing players";
name "ESPN Racing";
primary_example_queries "Kyle Busch", "Brad Keselowski";
topics "entertainment", "special_interest";
category "reference";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ESPN/Racing.pm";
attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

my %leagues = (
    nationwide => {
        "justin allgaier" => 731,
        "aj allmendinger" => 805,
        "aric almirola" => 740,
        "marcos ambrose" => 803,
        "john andretti" => 89,
        "tim andrews" => 4352,
        "michael annett" => 4323,
        "dakoda armstrong" => 4492,
        "casey atwood" => 170,
        "stanton barrett" => 617,
        "trevor bayne" => 4343,
        "t.j. bell" => 735,
        "tanner berryhill" => 4532,
        "greg biffle" => 221,
        "ryan blaney" => 4531,
        "mike bliss" => 144,
        "juan carlos blum" => 4558,
        "jason bowles" => 4391,
        "alex bowman" => 4555,
        "chris buescher" => 4480,
        "james buescher" => 4309,
        "jeb burton" => 4527,
        "kurt busch" => 195,
        "kyle busch" => 580,
        "brett butler" => 4346,
        "ken butler" => 891,
        "landon cassill" => 904,
        "jeremy clements" => 4284,
        "jennifer jo cobb" => 693,
        "brad coleman" => 823,
        "chris cook" => 702,
        "derrike cope" => 95,
        "joey coulter" => 4465,
        "tim cowen" => 871,
        "matt crafton" => 486,
        "erin crocker" => 754,
        "alx danielsson" => 4599,
        "matt dibenedetto" => 4379,
        "jamie dick" => 3639,
        "justin diercks" => 815,
        "austin dillon" => 4332,
        "ty dillon" => 4511,
        "tomy drissi" => 4447,
        "maryeve dufault" => 4503,
        "t.j. duke" => 4514,
        "jeffrey earnhardt" => 4356,
        "dale earnhardt jr." => 150,
        "danny efland" => 897,
        "ricky ehrgott" => 4594,
        "ryan ellis" => 4538,
        "ron fellows" => 141,
        "kyle fowler" => 4525,
        "anthony gandon" => 4598,
        "joey gase" => 4498,
        "brendan gaughan" => 235,
        "bobby gerhart" => 162,
        "ryan gifford" => 4592,
        "robby gordon" => 102,
        "david green" => 98,
        "jeff green" => 104,
        "kenny habul" => 4537,
        "chad hackenbracht" => 4582,
        "bobby hamilton jr." => 590,
        "mike harmon" => 174,
        "daryl harr" => 4353,
        "paulie harraka" => 4448,
        "richard harriman" => 4366,
        "kevin harvick" => 225,
        "drew herring" => 4435,
        "sam hornish jr." => 607,
        "shane huffman" => 411,
        "billy johnson" => 4437,
        "jimmie johnson" => 227,
        "kasey kahne" => 429,
        "kyle kelley" => 4422,
        "owen kelly" => 4419,
        "alex kennedy" => 4418,
        "d.j. kennington" => 844,
        "matt kenseth" => 143,
        "brad keselowski" => 626,
        "kraig kinser" => 773,
        "parker kligerman" => 4377,
        "todd kluever" => 698,
        "blake koch" => 4381,
        "kyle krisiloff" => 732,
        "scott lagasse jr." => 718,
        "kyle larson" => 4539,
        "jason leffler" => 229,
        "kevin lepage" => 130,
        "ashton lewis jr." => 287,
        "joey logano" => 4319,
        "carl long" => 161,
        "johanna long" => 4432,
        "hal martin" => 4360,
        "mark martin" => 68,
        "eric mcclure" => 629,
        "michael mcdowell" => 4286,
        "jamie mcmurray" => 223,
        "casey mears" => 248,
        "paul menard" => 575,
        "chase miller" => 840,
        "juan pablo montoya" => 336,
        "joe nemechek" => 97,
        "donnie neuenberger" => 473,
        "johnny o'connell" => 4583,
        "johnny oconnell" => 4583,
        "kevin o'connell" => 4312,
        "kevin oconnell" => 4312,
        "max papis" => 48,
        "travis pastrana" => 4468,
        "danica patrick" => 697,
        "nelson piquet jr." => 867,
        "ryan preece" => 4585,
        "david ragan" => 649,
        "tony raines" => 173,
        "andrew ranger" => 809,
        "ryan reed" => 4559,
        "harrison rhodes" => 4564,
        "robert richardson jr." => 757,
        "scott riggs" => 430,
        "martin roy" => 4602,
        "elliott sadler" => 137,
        "jay sauter" => 163,
        "johnny sauter" => 414,
        "travis sauter" => 4593,
        "tim schendel" => 661,
        "brian scott" => 4281,
        "morgan shepherd" => 100,
        "brent sherman" => 764,
        "ryan sieg" => 4345,
        "bryan silas" => 884,
        "regan smith" => 478,
        "reed sorenson" => 755,
        "dexter stacey" => 4550,
        "david starr" => 272,
        "tony stewart" => 149,
        "brad sweet" => 4388,
        "kevin swindell" => 4423,
        "brad teague" => 186,
        "derek thorn" => 4578,
        "john wes townley" => 4317,
        "martin truex jr." => 416,
        "brian vickers" => 390,
        "jacques villeneuve" => 295,
        "kenny wallace" => 90,
        "mike wallace" => 109,
        "steve wallace" => 761,
        "derek white" => 4385,
        "jason white" => 444,
        "cole whitt" => 4463,
        "scott wimmer" => 230,
        "josh wise" => 885,
        "jon wood" => 463,
        "j.j. yeley" => 669,
        "john young" => 855,
    }
);

# Transform %leagues into player => { league => "league_name", id => id_number }
# to keep %leagues in a friendly/dry form, but keep fast lookups. This only
# executes once.
my %players = map {
    my $league = $_;
    map {
        $_ => {
            league => $league,
            id => $leagues{$league}{$_}
        }
    } keys $leagues{$_}
} keys %leagues;

triggers any => keys %players;

spice to => 'http://api.espn.com/v1/sports/racing/$1/$2/$3/$4'
            . '?enable=stats,competitors,roster,venues&$5='
            . (localtime->year() + 1900)
            . '&apikey={{ENV{DDG_SPICE_ESPN_APIKEY}}}&callback=$6';

spice from => '(.*)/(.*)/(.*)/(.*)/(.*)/(.*)';

handle query_lc => sub {
    return $players{$_}{league}, "athletes", $players{$_}{id}, "foo", "bar", "ddg_spice_espn";
};

1;
