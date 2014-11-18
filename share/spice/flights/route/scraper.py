# scraper.py
#
# This script queries FlightStats and creates CSV files of active airports and active airlines.
#
# This script requires the following environment variables to be set:
#   DDG_SPICE_FLIGHTS_API_ID: valid FlightStats API ID
#   DDG_SPICE_FLIGHTS_API_KEY: valid FlightStats API key

import urllib
import json
import os
import re

# magic number: do not store "small" airports as classified by FlightStats
# (FlightStats ranks airports on a 1 to 5 scale, with 1 representing most international/major airports)
AIRPORT_THRESHOLD = 3

# get API userID and key
API_ID = os.environ.get('DDG_SPICE_FLIGHTS_API_ID')
API_KEY = os.environ.get('DDG_SPICE_FLIGHTS_API_KEY')

# store airlines data from the JSON response in a list
oAirlines = []

try:
    fhActiveAirlines = urllib.urlopen('http://api.flightstats.com/flex/airlines/rest/v1/json/active?appId=%s&appKey=%s' % (API_ID, API_KEY))

    for line in fhActiveAirlines.readlines():
        oAirlines.append(json.loads(line))

    fhActiveAirlines.close()

except IOError as error:
    print("Could not update the list of active airlines: %s", error)

# write JSON airlines data to 'airlines.csv' in the shared folder
# each line represents one airline with the following format: [icao code, airline name]
log = open('airlines.csv', 'w')

for airline in oAirlines[0]['airlines']:

    # insert guards to check data returned from FlightStats because some entries are missing fields
    # and other entries are simply empty
    try:
        if (len(airline['icao']) > 0 and len(airline['name']) > 0):
            log.write('%s,%s\n' % (airline['icao'], re.sub('[^a-zA-Z]', ' ', airline['name'])))

    except KeyError:
        pass

log.close()

# store cities data from the JSON response in a list
oCities = []

try:
    fhActiveAirports = urllib.urlopen('http://api.flightstats.com/flex/airports/rest/v1/json/active?appId=%s&appKey=%s' % (API_ID, API_KEY))

    for line in fhActiveAirports.readlines():
        oCities.append(json.loads(line))

    fhActiveAirports.close()

except IOError as error:
    print("Could not update the list of active airports: %s", error)

# write JSON data to 'cities.csv' in the shared folder
# each line contains one airport with the following format: [fs, iata, icao, classification, city, airport name]
log = open('cities.csv', 'w')

# sort the cities so that "level 1" airports are added first
for airport in sorted(oCities[0]['airports'], key=lambda x: x['classification']):

    # insert guards to check data returned from FlightStats because some entries are missing fields
    # and other entries are simply empty
    try:
        if (airport['classification'] <= AIRPORT_THRESHOLD and
            len(airport['fs']) > 0 and
            len(airport['iata']) > 0 and
            len(airport['icao']) > 0 and
            len(airport['city']) and
            len(airport['name'])):

            log.write('%s,%s,%s,%s,%s,%s\n' % (airport['fs'],
                                               airport['iata'],
                                               airport['icao'],
                                               airport['classification'],
                                               re.sub('[^a-zA-Z]', ' ', airport['city']),
                                               re.sub('[^a-zA-Z]', ' ', airport['name'])))

    except KeyError:
        pass

log.close()

