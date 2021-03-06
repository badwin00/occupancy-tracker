import RPi.GPIO as GPIO
import IPython
import time
import firebase_admin
import requests
from datetime import datetime
from firebase_admin import credentials
from firebase_admin import db
RUN_TESTS = 1 # toggle to run tests
occupancy = 0

# set up GPIO pins
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17,GPIO.OUT)
GPIO.setup(23,GPIO.IN)

# set up Firebase connection
cred = credentials.Certificate("./firebase_auth.json")
firebase_admin.initialize_app(cred)
ref = db.reference(path="Time",url='https://capacity-tracker-80518-default-rtdb.firebaseio.com/')

def blink():
    GPIO.output(17,GPIO.HIGH)
    time.sleep(2)
    GPIO.output(17,GPIO.LOW)

def report():
    # get the current occupancy mappings and find the most recent one so we can increment its occupancy and send it back
    if RUN_TESTS:
        global occupancy
        occupancy += 1
    current = ref.get()
    current[datetime.now().strftime("%Y-%m-%d-%H")] = current.get(datetime.now().strftime("%Y-%m-%d-%H"),0)+1
    ref.set(current)

# check if website's occupancy matches the occupancy measured locally on the pi
def test_occupancy():
    ref = db.reference(path="Time",url='https://capacity-tracker-80518-default-rtdb.firebaseio.com/')
    current = ref.get().get(datetime.now().strftime("%Y-%m-%d-%H"),0) 
    assert current == occupancy, "Database and local occupancy out of sync! Expected: " + str(occupancy) + " got: " + str(current)

# check if the website responds to a request properly
def test_up():
    r = requests.get('https://badwin00.github.io/occupancy-tracker/')
    assert r.status_code == 200, "Unacceptable response code: " + r.status_code

while 1:
    if GPIO.input(23) == True:
        print("motion sensed!")
        report()
        blink()
        if RUN_TESTS:
            test_up()
            test_occupancy()
