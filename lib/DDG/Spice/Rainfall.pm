package DDG::Spice::Rainfall;
# ABSTRACT: Returns the annual rainfall (precipitation) of the country searched 

use DDG::Spice;
use Locale::Country;

primary_example_queries "rainfall australia";
secondary_example_queries "australia annual rainfall";
description "Shows annual rainfall";
name "Rainfall";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rainfall.pm";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];
triggers any => "rainfall";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/AG.LND.PRCP.MM?&date=$2&format=json';
spice wrap_jsonp_callback => 1;

# Current date and time
my @localT = localtime;
my $curYear = $localT[5] + 1900;

# Vaild reporting dates for AG.LND.PRCP.MM indicator (every 5 years)
my @reportingDates = (2012,2017,2022,2027,2032);

# List of countries with ISO 3166 alpha-3 code
my %countryList = ("afghanistan" => "AFG", "angola" => "AGO", "albania" => "ALB", "united arab emirates" => "ARE", "argentina" => "ARG", "antigua and barbuda" => "ATG", "australia" => "AUS", "austria" => "AUT", "burundi" => "BDI", "belgium" => "BEL", "benin" => "BEN", "burkina faso" => "BFA", "bangladesh" => "BGD", "bulgaria" => "BGR", "bahrain" => "BHR", "bahamas, the" => "BHS", "belize" => "BLZ", "bolivia" => "BOL", "brazil" => "BRA", "barbados" => "BRB", "brunei darussalam" => "BRN", "bhutan" => "BTN", "botswana" => "BWA", "central african republic" => "CAF", "canada" => "CAN", "switzerland" => "CHE", "chile" => "CHL", "china" => "CHN", "cote d'ivoire" => "CIV", "cameroon" => "CMR", "congo" => "COG", "republic congo" => "COG", "colombia" => "COL", "comoros" => "COM", "cabo verde" => "CPV", "costa rica" => "CRI", "cuba" => "CUB", "cyprus" => "CYP", "germany" => "DEU", "djibouti" => "DJI", "dominica" => "DMA", "denmark" => "DNK", "dominican republic" => "DOM", "algeria" => "DZA", "ecuador" => "ECU", "egypt" => "EGY", "spain" => "ESP", "finland" => "FIN", "fiji" => "FJI", "france" => "FRA", "gabon" => "GAB", "united kingdom" => "GBR", "ghana" => "GHA", "guinea" => "GIN", "gambia, the" => "GMB", "guinea-bissau" => "GNB", "equatorial guinea" => "GNQ", "greece" => "GRC", "grenada" => "GRD", "guatemala" => "GTM", "guyana" => "GUY", "honduras" => "HND", "haiti" => "HTI", "hungary" => "HUN", "indonesia" => "IDN", "india" => "IND", "ireland" => "IRL", "iran" => "IRN", "iraq" => "IRQ", "iceland" => "ISL", "israel" => "ISR", "italy" => "ITA", "jamaica" => "JAM", "jordan" => "JOR", "japan" => "JPN", "kenya" => "KEN", "cambodia" => "KHM", "st. kitts and nevis" => "KNA", "south korea" => "KOR", "republic of korea" => "KOR", "kuwait" => "KWT", "laos" => "LAO", "lao peoples democratic republic" => "LAO", "lebanon" => "LBN", "liberia" => "LBR", "libya" => "LBY", "st. lucia" => "LCA", "sri lanka" => "LKA", "lesotho" => "LSO", "luxembourg" => "LUX", "morocco" => "MAR", "madagascar" => "MDG", "maldives" => "MDV", "mexico" => "MEX", "mali" => "MLI", "malta" => "MLT", "myanmar" => "MMR", "mongolia" => "MNG", "mozambique" => "MOZ", "mauritania" => "MRT", "mauritius" => "MUS", "malawi" => "MWI", "malaysia" => "MYS", "namibia" => "NAM", "niger" => "NER", "nigeria" => "NGA", "nicaragua" => "NIC", "netherlands" => "NLD", "norway" => "NOR", "nepal" => "NPL", "new zealand" => "NZL", "oman" => "OMN", "pakistan" => "PAK", "panama" => "PAN", "peru" => "PER", "philippines" => "PHL", "papua new guinea" => "PNG", "poland" => "POL", "puerto rico" => "PRI", "north korea" => "PRK", "democratic peoples republic of korea" => "PRK", "portugal" => "PRT", "paraguay" => "PRY", "qatar" => "QAT", "romania" => "ROU", "rwanda" => "RWA", "saudi arabia" => "SAU", "sudan" => "SDN", "senegal" => "SEN", "singapore" => "SGP", "solomon islands" => "SLB", "sierra leone" => "SLE", "el salvador" => "SLV", "somalia" => "SOM", "sao tome and principe" => "STP", "suriname" => "SUR", "sweden" => "SWE", "swaziland" => "SWZ", "seychelles" => "SYC", "syria" => "SYR", "chad" => "TCD", "togo" => "TGO", "thailand" => "THA", "timor-leste" => "TLS", "trinidad and tobago" => "TTO", "tunisia" => "TUN", "turkey" => "TUR", "tanzania" => "TZA", "uganda" => "UGA", "uruguay" => "URY", "united states" => "USA", "united states of america" => "USA", "st. vincent and the grenadines" => "VCT", "venezuela, rb" => "VEN", "vietnam" => "VNM", "west bank and gaza" => "PSE", "yemen" => "YEM", "south africa" => "ZAF", "democratic republic congo" => "COD", "zambia" => "ZMB", "zimbabwe" => "ZWE");

handle remainder_lc => sub {
    my ($validDate, $countryName);
   
   return if ($_ eq '');

    $countryName = shift;
    $countryName =~ s/^\s+|\s+$//g;    # Trim outside spaces.
    $countryName =~ s/\s{2,}/ /g;      # Normalize interior spaces.
    
    # Loop to check valid reporting dates against current date
    foreach my $date (@reportingDates){
          if($curYear >= $date) {
          $validDate = join(':', $date,$date);
         }
    }      
    
    # Ensure variables are defined before returning a result
    return unless (defined $countryName and defined $validDate);
    return unless $countryList{$countryName};
    return uc $countryList{$countryName}, $validDate;
    
};
1;