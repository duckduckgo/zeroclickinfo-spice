package DDG::Spice::Symbolab;

use DDG::Spice;

my %legalFunctions = (
	"cos" => 1,
	"sin" => 1,
	"tan" => 1,
	"cot" => 1,
	"sec" => 1,
	"csc" => 1,
	
	"arccos" => 1,
	"arcsin" => 1,
	"arctan" => 1,
	"arccot" => 1,
	"arcsec" => 1,
	"arccsc" => 1,
	
	"cosh" => 1,
	"sinh" => 1,
	"tanh" => 1,
	"coth" => 1,
	"sech" => 1,
	"csch" => 1,
	
	"sqrt" => 1,
	"log" => 1,
	"log10" => 1,
	"ln" => 1,
);

my %legalWords = (
	"points" => 1,
	"maxima" => 1,
	"domain" => 1,
	"range" => 1,
	"vertex" => 1,
	"periodicity" => 1,
	"amplitude" => 1,
	"inverse" => 1,
	"intercepts" => 1,
	"asymptotes" => 1,
	
	"solve" => 1,
	"compute" => 1,
	"calculate" => 1,
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
    "9x" => 1,
    "inf" => 1
);

sub isLegal{
	$_ = shift;
	
	my $legalFunctionsFound = false;
	
	#for cases like c++, j++
	if ($_ =~ /\+\+/){  
	  return;
	}
	
	my $minWeight = 2;
	my @words = split (/[ ()\-]/);
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
		
		# i.e x^2, x^{2}
		if ($word =~ /[xtu]\^(\{)?[xtu\d+](\})?/){
			$minWeight -= 3;
			next;
		}
		
		# i.e 5i
		if ($word =~ /[\d]i/){
			$minWeight -= 3;
			next;
		}
		
		# i.e 'i'
		if ($word eq 'i'){
			$minWeight -= 1;
			next;
		}
		
		if ($word !~ /\w\w\w\w/ and ($word =~ /[\^\*\=\+\/\\\|]/ or $word =~ /^\d+x$/)){
			$minWeight -= 2;
			next;
		}
		
		my $val = $legalWords{$word};
		if (defined $val){
			$minWeight -= $val;
			next;
		}
		
		$val = $legalFunctions{$word};
		if (false == $legalFunctionsFound and defined $val){
			$minWeight -= $val;
			$legalFunctionsFound = true;
			next;
			
		}
		
		if (length($word) <= 2) {
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
}

spice is_cached => 1;
spice to => 'https://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers startend => keys %legalWordsFunctions;
handle query_lc => sub {
    return isLegal($_);
};

1;
