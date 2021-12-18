# occupancy-tracker
A pipeline for collecting and visualizing physical occupancy of a space. Intended for use in the dining halls at George Mason University. Created as a semester-long class project for CS321: Software Engineering.

Watch the live count at: https://badwin00.github.io/occupancy-tracker/

A motion sensor is hooked up to Raspberry Pi, when motion is detected the LED blinks and sends a message to our database to update the occupancy.
![When the sensor detects motion, the blue LED turns on](https://badwin00.github.io/occupancy-tracker/motion_sensor5.gif)

When the database receives the message, it updates the current occupancy on an hourly basis.
![Google Firebase updates with the new current occupancy](https://badwin00.github.io/occupancy-tracker/db-update.gif)

When a user accesses the website, it queries the database for the latest information and presents it in a nice graph format.
![The latest information is pulled from the db and presented as a graph](https://badwin00.github.io/occupancy-tracker/web_update.gif)

The data from different days can be compared in order to search for trends in occupancy times.
![Comparison data is presented as a dual line graph](https://badwin00.github.io/occupancy-tracker/compare.png)
