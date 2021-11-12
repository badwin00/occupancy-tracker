const firebaseConfig = {
  apiKey: "AIzaSyC6hqAEvbEB_CaPTXlFNjmNngM0z5VW8PQ",
  authDomain: "capacity-tracker-80518.firebaseapp.com",
  databaseURL: "https://capacity-tracker-80518-default-rtdb.firebaseio.com",
  projectId: "capacity-tracker-80518",
  storageBucket: "capacity-tracker-80518.appspot.com",
  messagingSenderId: "189565903605",
  appId: "1:189565903605:web:1623dd2b71212859b6dbbc",
  measurementId: "G-573J8MNV5D"
};
const app = firebase.initializeApp(firebaseConfig);

const populate = () => {
  const obj = {}
  const arr = ['2021-11-06','2021-11-07', '2021-11-08', '2021-11-12'];
  arr.forEach((time) => {
    for (let i = 0; i < 24; i++) {
      if (i == 18 && time == '2021-11-12') {
        break;
      }
      const key = time + '-'+`${i}`.padStart(2, "0");
      obj[key] = Math.floor(Math.random() * (50+1));
    }
  });
  app.database().ref('Time').set(obj);
  app.database().ref('Date').set(arr);
};

var ltx = document.getElementById('liveChart').getContext('2d');

const map = {
  0: '12:00 AM',
  1: '1:00 AM',
  2: '2:00 AM',
  3: '3:00 AM',
  4: '4:00 AM',
  5: '5:00 AM',
  6: '6:00 AM',
  7: '7:00 AM',
  8: '8:00 AM',
  9: '9:00 AM',
  10: '10:00 AM',
  11: '11:00 AM',
  12: '12:00 PM',
  13: '1:00 PM',
  14: '2:00 PM',
  15: '3:00 PM',
  16: '4:00 PM',
  17: '5:00 PM',
  18: '6:00 PM',
  19: '7:00 PM',
  20: '8:00 PM',
  21: '9:00 PM',
  22: '10:00 PM',
  23: '11:00 PM'
};

const loadBar = () => {
  const labels = [];
  const data = [];
  app.database().ref('Time').get().then((snapshot) => {
    const obj = snapshot.val();
    const time = new Date(Date.now());

    const month = time.getMonth()+1;
    const day = time.getDate();
    const year = time.getFullYear();
    const hour = time.getHours();

    for (let i = 0; i < 24; i++) {
      const key = `${year}-${month}-${day}` + '-'+`${i}`.padStart(2, "0");
      if (key in obj) {
        labels.push(map[i]);
        data.push(obj[key]);
      }
    }

    const currentKey = `${year}-${month}-${day}-` + `${hour}`.padStart(2, "0");
    console.log(currentKey);
    const currentCount = !(currentKey in obj) ? 0 : obj[currentKey];
   
    var liveCount = document.getElementById('live-count').innerHTML = `<span class="dot blink"></span>LIVE COUNT: ${currentCount}`;

    var liveChart = new Chart(ltx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `# of People entering Southside (${month}/${day}/${year})`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
    });
  });
};

loadBar();

const createDropdown = () => {
  app.database().ref('Date').get().then((snapshot) => {
    const dates = snapshot.val();
    // Dynamically creating dropdown
    const s1 = document.getElementById('select-1');
    const s2 = document.getElementById('select-2');

    dates.forEach((date) => {
      let o1 = new Option(date, date);
      let o2 = new Option(date, date);
      s1.options[s1.options.length] = o1;
      s2.options[s2.options.length] = o2;
    });
  });
}
createDropdown();

let lineChart;
const loadLine = () => {
    const s1 = document.getElementById('select-1');
    const s2 = document.getElementById('select-2');
    app.database().ref('Time').get().then((snapshot) => {
      const time = snapshot.val();
      const labels = [];
      const data1 = [];
      const data2 = [];
      for (let i = 0; i < 24; i++) {
        labels.push(map[i]);
        const key = s1.value + '-'+`${i}`.padStart(2, "0");
        if (key in time) {
          data1.push(time[key]);
        } else {
          data1.push(0);
        }
      }

      for (let i = 0; i < 24; i++) {
        const key = s2.value + '-'+`${i}`.padStart(2, "0");
        if (key in time) {
          data2.push(time[key]);
        } else {
          data2.push(0);
        }
      }

      const data = {
        labels: labels,
        datasets: [
          {
            label: s1.value,
            data: data1,
            borderColor: "rgb(75, 192, 192)",
          },
          {
            label: s2.value,
            data: data2,
            borderColor: "rgb(244, 12, 139)",
          },
        ]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Occupancy Tracker'
            }
          }
        },
      };

      var ctx = document.getElementById('compareChart').getContext('2d');
      if (lineChart) lineChart.destroy();
      lineChart = new Chart(ctx, config);
    });
};

function runCompare() {
  loadLine();
}

