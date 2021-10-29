import RPi.GPIO as GPIO
import time
import firebase_admin
from datetime import datetime
from firebase_admin import credentials
from firebase_admin import db

# set up GPIO pins
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17,GPIO.OUT)
GPIO.setup(23,GPIO.IN)

# set up Firebase connection
cred = credentials.Certificate("./firebase_auth.json")
firebase_admin.initialize_app(cred)
ref = db.reference(path="Time",url='https://capacity-tracker-80518-default-rtdb.firebaseio.com/')

count = 0; # number of people detected so far

def blink():
    GPIO.output(17,GPIO.HIGH)
    time.sleep(2)
    GPIO.output(17,GPIO.LOW)

def report():
    ref.push({datetime.now().strftime("%H:%M:%S"):count})

while 1:
    if GPIO.input(23) == True:
        print("motion sensed!")
        count += 1
        report()
        blink()
