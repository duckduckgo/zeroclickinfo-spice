#!/usr/bin/env bash

for dir in $(find -type d | tail -n+2);
do
    echo "cp ./espn.js $dir/espn_${dir#./}.js";
    cp ./espn.js "$dir/espn_${dir#./}.js";
done;
