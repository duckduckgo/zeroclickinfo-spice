package DDG::Spice::Symbolab;

use DDG::Spice;

my %legalWordsFunctions = (
	"cos" => 2,
	"sin" => 2,
	"tan" => 2,
	"cot" => 2,
	"sec" => 2,
	"csc" => 2,
	
	"arccos" => 2,
	"arcsin" => 2,
	"arctan" => 2,
	"arccot" => 2,
	"arcsec" => 2,
	"arccsc" => 2,
	
	"cosh" => 2,
	"sinh" => 2,
	"tanh" => 2,
	"coth" => 2,
	"sech" => 2,
	"csch" => 2,
	
	"sqrt" => 2,
	"log" => 2,
	"log10" => 2,
	"ln" => 2,
	
	"calculate" => 1,
	"solve" => 1,
	"compute" => 1,
	"integral" => 1,
	"integrate" => 1,
	"integration" => 1,
	"antiderivative" => 1,
	"derive" => 1,
	"differentiate" => 1,
	"derivation" => 1,
	"derivative" => 1,
	"factor" => 1,
	"factorize" => 1,
	"factorise" => 1,
	"expand" => 1,
    "x" => 1,                # to catch cases like x^2+2x=0
    "2x" => 1, 
    "3x" => 1,
    "4x" => 1,
    "5x" => 1,
    "6x" => 1,
    "7x" => 1,
    "8x" => 1,
    "9x" => 1
);

spice is_cached => 1;

spice to => 'https://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers startend => keys %legalWordsFunctions;

handle query_lc => sub {
    #for cases like c++, j++
	if ($_ =~ /\+\+/){  
	  return;
	}
	
	my $minWeight = 2;
	my @words = split (/[ ()]/);
	for my $word (@words){
		
		# i.e x^sinhx
		if ($word =~ /[^\w](arc)?(cos|tan|sin|cot|sec|csc)(h)?(\d)?[xtu]/){
			$minWeight -= 3;
			next;
		}
		
		# i.e sinhx
		if ($word =~ /^(arc)?(cos|tan|sin|cot|sec|csc)(h)?(\d)?[xtu]/){
			$minWeight -= 3;
			next;
		}
		
		# i.e x^lnx
		if ($word =~ /[^\w](ln|log|log10|sqrt)(\d)?[xtu]/){
			$minWeight -= 3;
			next;
		}
		
		# i.e lnx
		if ($word =~ /(ln|log|log10|sqrt)(\d)?[xtu]/){
			$minWeight -= 3;
			next;
		}
		
		# i.e sqrt(x)
		if ($word =~ /(log10|sqrt|\([xt]\))/){
			$minWeight -= 3;
			next;
		}
		
		if (	$word !~ /\w\w\w\w/ and 
                    ($word =~ /[\^\*\=\+\-\/\\]/ or 
					 $word =~ /^\d*x$/)){
			$minWeight -= 2;
			next;
		}
		
		my $val = $legalWordsFunctions{$word};
		if (defined $val){
			$minWeight -= $val;
			next;
		}
		elsif (length($word) <= 2) {
			next;
		}
		else{
			return;
		}
	}
	
	if ($minWeight <= 0) {
		return $_;
	}
	else{
		return ;
	}
};

1;
