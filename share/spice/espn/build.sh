#!/usr/bin/env bash

for dir in $(find -type d | tail -n+2);
do
    echo "echo '' > $dir/espn_${dir#./}.js";
    echo '' > "$dir/espn_${dir#./}.js";

    echo "cp ./espn.css $dir/espn_${dir#./}.css";
    cp ./espn.css "$dir/espn_${dir#./}.css";

done;
