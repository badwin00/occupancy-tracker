const config = { 
  apiKey: "AIzaSyC6hqAEvbEB_CaPTXlFNjmNngM0z5VW8PQ",
  authDomain: "capacity-tracker-80518.firebaseapp.com",
  databaseURL: "https://capacity-tracker-80518-default-rtdb.firebaseio.com",
  projectId: "capacity-tracker-80518",
  storageBucket: "capacity-tracker-80518.appspot.com",
  messagingSenderId: "189565903605",
  appId: "1:189565903605:web:1623dd2b71212859b6dbbc",
  measurementId: "G-573J8MNV5D"
};

const fb = firebase.initializeApp(config);

const connectedRef = fb.database().ref(".info/connected");
connectedRef.on("value", (snap) => {
  if (snap.val() === true) {
    console.log("Firebase connection is LIVE");
  } else {
    console.log("Firebase not connected...");
  }
});

// Check the map object used for converting military time to standard time
console.assert(map[0] == "12:00 AM");
console.assert(map[1] == "1:00 AM");
console.assert(map[2] == "2:00 AM");
console.assert(map[3] == "3:00 AM");
console.assert(map[4] == "4:00 AM");
console.assert(map[5] == "5:00 AM");
console.assert(map[6] == "6:00 AM");
console.assert(map[7] == "7:00 AM");
console.assert(map[8] == "8:00 AM");
console.assert(map[9] == "9:00 AM");
console.assert(map[10] == "10:00 AM");
console.assert(map[11] == "11:00 AM");
console.assert(map[12] == "12:00 PM");
console.assert(map[13] == "1:00 PM");
console.assert(map[14] == "2:00 PM");
console.assert(map[15] == "3:00 PM");
console.assert(map[16] == "4:00 PM");
console.assert(map[17] == "5:00 PM");
console.assert(map[18] == "6:00 PM");
console.assert(map[19] == "7:00 PM");
console.assert(map[20] == "8:00 PM");
console.assert(map[21] == "9:00 PM");
console.assert(map[22] == "10:00 PM");
console.assert(map[23] == "11:00 PM");

/* 
  Manual checking @ 11/22/2021 - 1:30 P.M.

  Firebase real-time database live count: 24
  Web application live count: 24
*/

/* 
  Manual checking for historical data points @ 11/19/21
  (FORMAT: <Time military time>: <People count>)
  ** DATA FROM FIREBASE **
  14: 4 
  15: 34
  16: 19
  17: 132
  18: 86
  19: 122
  20: 327
  21: 299 
  22: 134
  23: 126

  ** DATA SHOWN IN FRONT END **
  (FORMAT: <Time standard time>: <People count>)
  12:00 AM: 0
  1:00 AM: 0
  2:00 AM: 0
  3:00 AM: 0
  4:00 AM: 0
  5:00 AM: 0
  6:00 AM: 0
  7:00 AM: 0 
  8:00 AM: 0
  9:00 AM: 0 
  10:00 AM: 0 
  11:00 AM: 0
  12:00 PM: 0 
  1:00 PM: 0
  2:00 PM: 4
  3:00 PM: 34
  4:00 PM: 19
  5:00 PM: 132
  6:00 PM: 86
  7:00 PM: 122
  8:00 PM: 327
  9:00 PM: 299
  10:00 PM: 134
  11:00 PM: 126

  ** MATCHES **
*/
