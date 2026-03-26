// ── SCARCITY SCHEDULE ──────────────────────────────────────────
var TOTAL_SPOTS = 30;

// TEST raspored (menjaj vremena za produkciju)
var SCHEDULE = [
  { h: 17, m: 25, spots: 17 },
  { h: 17, m: 26, spots: 16 },
  { h: 17, m: 27, spots: 15 },
  { h: 17, m: 28, spots: 14 },
  { h: 17, m: 29, spots: 13 },
  { h: 17, m: 30, spots: 12 },
  { h: 17, m: 31, spots: 11 },
  { h: 17, m: 32, spots: 10 },
  { h: 17, m: 33, spots: 9  },
  { h: 17, m: 34, spots: 8  },
  { h: 17, m: 35, spots: 7  },
  { h: 17, m: 36, spots: 6  },
  { h: 17, m: 37, spots: 5  },
  { h: 17, m: 38, spots: 4  },
  { h: 17, m: 39, spots: 3  },
  { h: 17, m: 40, spots: 2  },
  { h: 17, m: 41, spots: 1  },
  { h: 17, m: 42, spots: 0  },
];

function getCurrentSpots() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var currentMins = h * 60 + m;

  var result = SCHEDULE[0].spots; // default pre prvog vremena
  for (var i = 0; i < SCHEDULE.length; i++) {
    var scheduleMins = SCHEDULE[i].h * 60 + SCHEDULE[i].m;
    if (currentMins >= scheduleMins) {
      result = SCHEDULE[i].spots;
    }
  }
  return result;
}

function updateScarcity() {
  var spots = getCurrentSpots();
  var reserved = TOTAL_SPOTS - spots;
  var pct = (reserved / TOTAL_SPOTS) * 100;

  var countEl = document.getElementById('scarcity-count');
  var fillEl = document.getElementById('scarcity-fill');
  var textEl = document.getElementById('scarcity-text');

  if (countEl) countEl.textContent = spots + ' / ' + TOTAL_SPOTS;
  if (fillEl) fillEl.style.width = pct + '%';
  if (textEl) textEl.textContent = reserved + ' od ' + TOTAL_SPOTS + ' mesta rezervisano';
}

updateScarcity();
setInterval(updateScarcity, 10000); // proverava svakih 10 sekundi
