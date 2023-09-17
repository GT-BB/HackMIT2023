"""
import googlemaps
import json

# Replace 'YOUR_API_KEY' with your actual Google Maps API key
api_key = "AIzaSyCgly59Bpch-KF0q02LGota3Io3nSrFuzE"

# Initialize the Google Maps client
gmaps = googlemaps.Client(key=api_key)

# Load your JSON data
with open('locationData2.json', 'r') as json_file:
    data = json.load(json_file)

# Iterate through the "resources" in your JSON data
for key, resource in data["resources"].items():
    if not resource["position"]:
        # Create the address string using locationName and zipCode
        address = f"{resource['locationName']}, Maui, Hawaii {resource['zipCode']}"

        # Geocode the address to get the coordinates
        geocode_result = gmaps.geocode(address)

        if geocode_result:
            # Extract the latitude and longitude from the geocoding result
            lat = geocode_result[0]["geometry"]["location"]["lat"]
            lng = geocode_result[0]["geometry"]["location"]["lng"]

            # Update the "position" with the coordinates
            resource["position"] = (lat, lng)

# Save the updated JSON data
with open('updated_json_file.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Position data updated and saved.")
"""

import json

# Load your JSON data
with open('locationData2.json', 'r') as json_file:
    data = json.load(json_file)

# Define the array of distances
distances = [
    8441, 8471, 11234, 12802, 7153, 12543, 42934, 32090, 34401, 32477,
    98042, 92786, 11531, 13746, 10132, 18764, 41332, 19968, 40442, 30497,
    32600, 29418, 26807, 30639, 8441, 8471, 11234, 12802, 7153, 12543, 42934,
    32090, 34401, 32477, 98042, 92786, 11531, 13746, 10132, 18764, 41332,
    19968, 40442, 30497, 32600, 29418, 26807, 30639, 7924, 31260, 8398, 11275,
    10647, 44228, 34785, 34359, 34530, 36072, 37259, 94273, 86116, 102149,
    23283, 14055, 9072, 39810, 45061, 41136, 32600, 32600, 29948, 36836, 17221,
    17708, 12802, 7924, 31260, 8398, 11275, 10647, 44228, 34785, 34359, 34530,
    36072, 37259, 94273, 86116, 102149, 23283, 14055, 9072, 39810, 45061, 41136,
    32600, 32600, 29948, 36836, 17221, 17708, 12802,
]

# Loop through each resource in the data
for resource_id, resource_data in data['resources'].items():
    position = tuple(resource_data['position'])
    # Calculate the distance using the index
    distance_index = int(resource_id) % len(distances)
    distance_value = distances[distance_index]
    resource_data['distance'] = distance_value

# Save the updated data
with open('updated_data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Distances added and saved to updated_data.json.")
