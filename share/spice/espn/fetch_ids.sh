#!/bin/bash

rm espn.players.* trigger.hash

for offset in 0 50 100 150 200 250 300 350 400 450; do
  curl "http://api.espn.com/v1/sports/basketball/nba/athletes?offset=$offset&apikey=$DDG_SPICE_ESPN_APIKEY" \
    > "espn.players.$offset" &&
      perl build_triggers.pl "espn.players.$offset" >> trigger.hash
done;
