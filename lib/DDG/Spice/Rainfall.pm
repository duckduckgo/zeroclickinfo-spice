package DDG::Spice::Rainfall;
# ABSTRACT: Returns the annual rainfall (precipitation) of the country searched 

use DDG::Spice;

primary_example_queries "rainfall australia";
secondary_example_queries "australia annual rainfall";
description "Shows annual rainfall";
name "Rainfall";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rainfall.pm";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];
triggers start => "rainfall";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/AG.LND.PRCP.MM?&date=$2&format=json';
spice wrap_jsonp_callback => 1;

#current date and time
my @localT = localtime;
my $curYear = $localT[5] + 1900;

#vaild reporting dates for AG.LND.PRCP.MM indicator (every 5 years)
my @reportingDates = (2012,2017,2022,2027,2032);

# list of countries with ISO 3166 alpha-3 code
my %countries = ("afghanistan" => "afg", "Åland islands" => "ala", "albania" => "alb", "algeria" => "dza", "american samoa" => "asm", "andorra" => "and", "angola" => "ago", "anguilla" => "aia", "antarctica" => "ata", "antigua and barbuda" => "atg", "argentina" => "arg", "armenia" => "arm", "aruba" => "abw", "australia" => "aus", "austria" => "aut", "azerbaijan" => "aze", "bahamas" => "bhs", "bahrain" => "bhr", "bangladesh" => "bgd", "barbados" => "brb", "belarus" => "blr", "belgium" => "bel", "belize" => "blz", "benin" => "ben", "bermuda" => "bmu", "bhutan" => "btn", "bolivia, plurinational state of" => "bol", "bosnia and herzegovina" => "bih", "botswana" => "bwa", "bouvet island" => "bvt", "brazil" => "bra", "british indian ocean territory" => "iot", "brunei darussalam" => "brn", "bulgaria" => "bgr", "burkina faso" => "bfa", "burundi" => "bdi", "cambodia" => "khm", "cameroon" => "cmr", "canada" => "can", "cape verde" => "cpv", "cayman islands" => "cym", "central african republic" => "caf", "chad" => "tcd", "chile" => "chl", "china" => "chn", "christmas island" => "cxr", "cocos (keeling) islands" => "cck", "colombia" => "col", "comoros" => "com", "congo" => "cog", "congo, the democratic republic of the" => "cod", "cook islands" => "cok", "costa rica" => "cri", "Côte d'ivoire" => "civ", "croatia" => "hrv", "cuba" => "cub", "cyprus" => "cyp", "czech republic" => "cze", "denmark" => "dnk", "djibouti" => "dji", "dominica" => "dma", "dominican republic" => "dom", "ecuador" => "ecu", "egypt" => "egy", "el salvador" => "slv", "equatorial guinea" => "gnq", "eritrea" => "eri", "estonia" => "est", "ethiopia" => "eth", "falkland islands (malvinas)" => "flk", "faroe islands" => "fro", "fiji" => "fji", "finland" => "fin", "france" => "fra", "french guiana" => "guf", "french polynesia" => "pyf", "french southern territories" => "atf", "gabon" => "gab", "gambia" => "gmb", "georgia" => "geo", "germany" => "deu", "ghana" => "gha", "gibraltar" => "gib", "greece" => "grc", "greenland" => "grl", "grenada" => "grd", "guadeloupe" => "glp", "guam" => "gum", "guatemala" => "gtm", "guernsey" => "ggy", "guinea" => "gin", "guinea-bissau" => "gnb", "guyana" => "guy", "haiti" => "hti", "heard island and mcdonald islands" => "hmd", "holy see (vatican city state)" => "vat", "honduras" => "hnd", "hong kong" => "hkg", "hungary" => "hun", "iceland" => "isl", "india" => "ind", "indonesia" => "idn", "iran, islamic republic of" => "irn", "iraq" => "irq", "ireland" => "irl", "isle of man" => "imn", "israel" => "isr", "italy" => "ita", "jamaica" => "jam", "japan" => "jpn", "jersey" => "jey", "jordan" => "jor", "kazakhstan" => "kaz", "kenya" => "ken", "kiribati" => "kir", "korea, democratic people's republic of" => "prk", "korea, republic of" => "kor", "kuwait" => "kwt", "kyrgyzstan" => "kgz", "lao people's democratic republic" => "lao", "latvia" => "lva", "lebanon" => "lbn", "lesotho" => "lso", "liberia" => "lbr", "libyan arab jamahiriya" => "lby", "liechtenstein" => "lie", "lithuania" => "ltu", "luxembourg" => "lux", "macao" => "mac", "macedonia, the former yugoslav republic of" => "mkd", "madagascar" => "mdg", "malawi" => "mwi", "malaysia" => "mys", "maldives" => "mdv", "mali" => "mli", "malta" => "mlt", "marshall islands" => "mhl", "martinique" => "mtq", "mauritania" => "mrt", "mauritius" => "mus", "mayotte" => "myt", "mexico" => "mex", "micronesia, federated states of" => "fsm", "moldova, republic of" => "mda", "monaco" => "mco", "mongolia" => "mng", "montenegro" => "mne", "montserrat" => "msr", "morocco" => "mar", "mozambique" => "moz", "myanmar" => "mmr", "namibia" => "nam", "nauru" => "nru", "nepal" => "npl", "netherlands" => "nld", "netherlands antilles" => "ant", "new caledonia" => "ncl", "new zealand" => "nzl", "nicaragua" => "nic", "niger" => "ner", "nigeria" => "nga", "niue" => "niu", "norfolk island" => "nfk", "northern mariana islands" => "mnp", "norway" => "nor", "oman" => "omn", "pakistan" => "pak", "palau" => "plw", "palestinian territory, occupied" => "pse", "panama" => "pan", "papua new guinea" => "png", "paraguay" => "pry", "peru" => "per", "philippines" => "phl", "pitcairn" => "pcn", "poland" => "pol", "portugal" => "prt", "puerto rico" => "pri", "qatar" => "qat", "Réunion" => "reu", "romania" => "rou", "russian federation" => "rus", "rwanda" => "rwa", "saint barthélemy" => "blm", "saint helena, ascension and tristan da cunha" => "shn", "saint kitts and nevis" => "kna", "saint lucia" => "lca", "saint martin (french part)" => "maf", "saint pierre and miquelon" => "spm", "saint vincent and the grenadines" => "vct", "samoa" => "wsm", "san marino" => "smr", "sao tome and principe" => "stp", "saudi arabia" => "sau", "senegal" => "sen", "serbia" => "srb", "seychelles" => "syc", "sierra leone" => "sle", "singapore" => "sgp", "slovakia" => "svk", "slovenia" => "svn", "solomon islands" => "slb", "somalia" => "som", "south africa" => "zaf", "south georgia and the south sandwich islands" => "sgs", "spain" => "esp", "sri lanka" => "lka", "sudan" => "sdn", "suriname" => "sur", "svalbard and jan mayen" => "sjm", "swaziland" => "swz", "sweden" => "swe", "switzerland" => "che", "syrian arab republic" => "syr", "taiwan, province of china" => "twn", "tajikistan" => "tjk", "tanzania, united republic of" => "tza", "thailand" => "tha", "timor-leste" => "tls", "togo" => "tgo", "tokelau" => "tkl", "tonga" => "ton", "trinidad and tobago" => "tto", "tunisia" => "tun", "turkey" => "tur", "turkmenistan" => "tkm", "turks and caicos islands" => "tca", "tuvalu" => "tuv", "uganda" => "uga", "ukraine" => "ukr", "united arab emirates" => "are", "united kingdom" => "gbr", "united states" => "usa", "united states minor outlying islands" => "umi", "uruguay" => "ury", "uzbekistan" => "uzb", "vanuatu" => "vut", "venezuela, bolivarian republic of" => "ven", "viet nam" => "vnm", "virgin islands, british" => "vgb", "virgin islands, U.S." => "vir", "wallis and futuna" => "wlf", "western sahara" => "esh", "yemen" => "yem", "zambia" => "zmb", "zimbabwe" => "zwe");
my @names = reverse keys %countries;

handle remainder => sub {
    my ($country, $validDate);
    return if ($_ eq '');
    
    # Check for country name in query - in a case-insensitive way
     foreach my $name (@names){
        if (m/\b$name\b/i){
          $country = $name;
          s/\s*$name\s*//g;
          last;
        }
      }
    
    #loop to check valid reporting dates against current date
    foreach my $date (@reportingDates){
          if($curYear >= $date) {
          $validDate = join(':', $date,$date);
         }
    }      

    if (defined $country and defined $validDate) {
        return uc $countries{$country}, $validDate;
    }
    return;
};
1;