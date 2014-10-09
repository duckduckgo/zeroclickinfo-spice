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

    if ('icao' in airline and 'name' in airline):
        log.write('%s,%s\n' % (airline['icao'], airline['name']))

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

# write JSON airlines data to 'cities.csv' in the shared folder
# each line represents one city with the following format: [city code, full city name]
log = open('cities.csv', 'w')
for airport in oCities[0]['airports']:

    if ('city' in airport and 'cityCode' in airport):
        log.write('%s,%s\n' % (airport['cityCode'], airport['city']))

log.close()