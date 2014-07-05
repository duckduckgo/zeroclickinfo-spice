package DDG::Spice::Coursebuffet;

use DDG::Spice;

spice to => 'http://www.coursebuffet.com/ddg/$1/$2';
spice from => '(.*?)/(.*)';
spice wrap_jsonp_callback => 1;

primary_example_queries "computer science course";
secondary_example_queries "computer science coursera";
description "Course catalog for online learning!";
name "CourseBuffet";
source "CourseBuffet";

# could not find any relevant category, more like 'education'
category "special"; 

# We have all kinds of courses listing few of those categories here
topics "math", "programming", "computing", "science", "web_design";

code_url "https://github.com/rubydubee/ddg_coursebuffet/blob/master/lib/DDG/Spice/Coursebuffet.pm";
attribution web => ["http://www.coursebuffet.com", "Pradyumna Dandwate"],
            twitter => ["coursebuffet"],
            github  => ["rubydubee", "Pradyumna Dandwate"];

my @title_list = share('course_titles.txt')->slurp;
my @course_titles = ();
foreach my $title (@title_list) {
  chomp $title;
  push(@course_titles, $title);
}

triggers query_lc => qr/\s*/;

sub cbtrim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };

handle query_lc => sub {

  # MOOC provider specific search returns courses for the specified provider
  $_ =~ /(coursera|edx|udacity|saylor|novoed|futurelearn|iversity|open2study|openuped)/;
  if ($&) {
    my $q = "$` $'";
    return "provider", $&, cbtrim($q);
  }

  # generic course search
  $_ =~ /course/;
  if ($&) {
    my $q = "$` $'";
    return "standard","courses", cbtrim($q);
  }

  my $query = $_;

  # exact title match returns similar courses(but from different MOOC provider or university) as well
  my @matches = grep { /^$query$/i } @course_titles;
  
  if(@matches) {
    return "title", "courses" ,$matches[0];
  } else {
    return;
  }

};

1;