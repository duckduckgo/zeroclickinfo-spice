#!/bin/bash

# this is a utility script to sanitize holiday names, it can be run whenever new holidays are introduced

for country in `find ./countries -iname '*.txt' | xargs`; do

    # sanitize holidays and move any alt names onto seperate lines
    cp $country $country.tmp
    cat $country.tmp | \
	tr '(' '\n' | \
	tr -d ')' | \
	tr '/' '\n' | \
	tr -d "'" | \
	tr -d '.' | \
	tr '-' ' ' | \
	tr -d '´' \
	> $country
    rm $country.tmp

    # remove duplicate entries that have a suffix of 2-9, eg: "eid al fitr holiday 2" 
    sed -i '/day [2-9]/d' $country

    # sanitize any holiday names that have a suffix of 1
    sed -i 's/\(.*day\) 1$/\1/' $country

    # remove stray entries which result from "(day 1)" appearing in brackets after a holiday name
    sed -i '/^day$/d' $country

    # remove leading/trailing whitespace
    sed -i 's/^[[:space:]]*//' $country   
    sed -i 's/[[:space:]]*$//' $country

    # remove trailing suffix of "day", eg: "thanksgiving day"
    sed -i 's/[[:space:]]day$//' $country

    # sort and remove duplicate entries
    sort -u -o $country $country

done
