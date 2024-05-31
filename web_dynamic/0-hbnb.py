#!/usr/bin/python3
""" Starts a Flash Web Application """

# Import necessary modules
import sys
sys.path.append('/home/emmanuel/holbertonschool-AirBnB_clone_v4')
import os
import sys
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template
import uuid

# Create Flask app instance
app = Flask(__name__)

# Define teardown_appcontext handler
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

# Define route for /0-hbnb
@app.route('/0-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('0-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())

# Main function
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
