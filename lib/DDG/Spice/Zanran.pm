package DDG::Spice::Zanran;

use DDG::Spice;

attribution github => ["https://github.com/taw", "taw"],
	    twitter => ["https://twitter.com/t_a_w", "Tomasz Wegrzanowski"];
primary_search_queries "oil production in saudi arabia", "global mobile data usage";
secondary_search_queries "construction injuries australia", "agriculture contribution to gdp";
category "facts";
topics "economy_and_finance", "special_interest", "trivia";
name "Zanran";
description "Data and Statistics";
icon_url "/i/www.zanran.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zanran.pm";
source "Zanran";
status "enabled";

spice to => 'http://www.zanran.com/search/simple_json?callback={{callback}}&q=$1';

# Quantitative words that usually have good results on zanran
triggers query_lc => qr/\b(accidents?|adjusted|age\s+distributions?|age\s+structure|alcoholism|amounts?|average|Balance\s+of\s+payment(s)?|Balance\s+of\s+trade|bank\s+assets?|bank\s+deposits?|banking\s+assets|birth|births?|budget\s+deficit|burns?|capacit(y|ies)|Capital\s+gains\s+Tax(es)?|car\s+ownerships?|cases|causes\s+of\s+death|comparisons?|composition\s+of|consum(ed|ptions?)|Consumer\s+Expenditures?|Consumer\s+price\s+index|Consumption\s+expenditures?|contributions?|costs?|CPI|crash(es)?|credit\s+market\s+debt|crude\s+births?|crude\s+deaths?|cumulat(ive|ed)|cure\s+rates?|current\s+account\s+deficits?|deaths?(\s+rates?)?|debt\s+service|debt\s+to\s+income|deciles?|decreases|demand|disposable\s+household\s+income|disposable\s+income|distribution|divorces?|drowning|Economic\s+growth|education\s+expenditures?|Educational\s+Attainment|emigration|emissions?|employment|estimate(d|s)?|expenditures?|export(ed|s?)|External\s+debt|family\s+debt|family\s+expenditures?|family\s+financial\s+assets?|family\s+incomes?|fatalit(y|ies)|FDI|fdi\s+flows?|FDI\s+stock(s)?|fertility|final\s+consumption\s+expenditures?|financial\s+assets?|forecast(s|ed)?|Foreign\s+direct\s+investments?|foreign\s+investments?|Foreign-exchange\s+reserves?|frequency|gas\s+reserves?|GDP|generation|Gini\s+coefficient|GNI|GNP|government\s+debt|Government\s+expenditures?|Government\s+final\s+consumption\s+expenditures?|government\s+spending|gross\s+debt|Gross\s+domestic\s+product|Gross\s+investment|Gross\s+national\s+product|growths?|health(care)?\s+expenditures?|home\s+ownership|Household\s+consumption|Household\s+debt|Household\s+expenditures?|Household\s+final\s+consumption\s+expenditures?|Household\s+financial\s+assets?|household\s+incomes?|household\s+spending|immigration|import(ed|s?)|incidence|incidents?|income\s+distribution|income\s+tax(es)?|incomes?|increases|industrial\s+production|inflation|inflows?|injur(y|ies)|labo(r|ur)\s+costs?|labo(r|ur)\s+productivity|labo(u)r\s+force\s+participations?|levels?|life\s+expectanc(y|ies)|literacy|live\s+births?|LTIs?|maltreatments?|manufactur(ed?|ing)|markets?\s+for|markets?\s+shares?|markets?\s+sizes?|marriages?|mean|median|morbidit(y|ies)|mortalit(y|ies)|national\s+debts?|National\s+Incomes?|net\s+asset(s)?|net\s+borrowing(s)?|net\s+debt|net\s+exports?|Net\s+foreign\s+assets|net\s+worth|Nonfarm\s+payrolls?|numbers?\s+of|obesity|oil\s+reserves|outflows?|outlooks?|outputs?|ownerships?|participation|penetration?|pension\s+funds?|percent(age)?s?(\s+of)?|Personal\s+consumption\s+expenditures?|Physical\s+balance\s+of\s+trade|population|poverty|PPI|pregnanc(y|ies)|prevalence|prices?|private\s+consumption|produc(ed|tion)|producer\s+price\s+index|productivit(y|ies)|project(ed|ions?)|proportions?|public\s+debt|quartiles?|quintiles?|R&D\s+expenditures?|ranges?|rankings?|rate\s+of\s+return|rates?|ratios?|relationship\s+(with|between)|reserves?|Retail\s+price\s+index|scalds?|seaborne\s+trade|sex\s+ratio|shares?\s+(in|of|by)|ship(ped|ments?)|size|spending|standardi(s|z)ed|stat(istic)?s?|State\s+Domestic\s+Product|suicides?|suppl(y|ies)|supply\s+curve(s)|surplus(es)?|survival\s+rates?|tariffs?|tax\s+revenues?|teen(age)?\s+birth\s+rates?|totals?|trade\s+balances?|trade\s+intensity\s+(index)?|Trade\s+weighted\s+index|trends?|unemployment|us(e|ages?)|volumes?|wealth\s+distribution|Wholesale\s+Price\s+Index|WPI|yields?)\b/i;

handle query_lc => sub {
  return $_;
};

1;
