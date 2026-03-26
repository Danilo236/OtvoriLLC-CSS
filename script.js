// ── SCARCITY SCHEDULE ──────────────────────────────────────────
var TOTAL_SPOTS = 30;

// TEST raspored (menjaj vremena za produkciju)
var SCHEDULE = [
  { h: 19, m: 40, spots: 17 },
  { h: 19, m: 42, spots: 16 },
  { h: 19, m: 44, spots: 15 },
  { h: 19, m: 46, spots: 14 },
  { h: 19, m: 48, spots: 13 },
  { h: 19, m: 50, spots: 12 },
  { h: 19, m: 52, spots: 11 },
  { h: 19, m: 54, spots: 10 },
  { h: 19, m: 56, spots: 9  },
  { h: 19, m: 57, spots: 8  },
  { h: 19, m: 58, spots: 7  },
  { h: 19, m: 59, spots: 6  },
  { h: 20, m: 00, spots: 5  },
  { h: 20, m: 45, spots: 4  },
  { h: 21, m: 30, spots: 3  },
  { h: 22, m: 15, spots: 2  },
  { h: 23, m: 00, spots: 1  },
  { h: 23, m: 59, spots: 0  },
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
