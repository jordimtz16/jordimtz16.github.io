// script.js
document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateTab(tabName) {
    const targetContent = document.getElementById(tabName);
    const targetLink = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
    if (!targetContent || !targetLink) return false;

    tabLinks.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    targetContent.classList.add("active");
    targetLink.classList.add("active");
    return true;
  }

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabName = link.getAttribute("data-tab");
      activateTab(tabName);
      history.pushState(null, "", "#" + tabName);
    });
  });

  // Open directly to the tab named in the URL, e.g. yoursite.io/#teaching
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash) {
    activateTab(initialHash);
  }

  // Support the browser's back/forward buttons
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.replace("#", "");
    activateTab(hash || "about");
  });
});


// CODE TO SHOW THE DROPDOWN LISTS OF COURSES

function toggleDropdown(event, listId) {
  event.stopPropagation(); // prevent immediate close when clicking button
  const list = document.getElementById(listId);
  const btn = event.currentTarget;
  const isOpen = list.classList.contains("open");

  // Close all dropdowns first
  document.querySelectorAll(".dropdown-list").forEach(l => l.classList.remove("open"));
  document.querySelectorAll(".dropdown-btn").forEach(b => b.classList.remove("open"));

  // Toggle this dropdown
  if (!isOpen) {
    list.classList.add("open");
    btn.classList.add("open");
  }
}

// Close dropdowns when clicking outside
document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-list").forEach(list => {
    list.classList.remove("open");
  });
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.classList.remove("open");
  });
});

// Interactive bandit demo on the Research tab
(function () {
  const knownBtn = document.getElementById("bandit-known");
  const uncertainBtn = document.getElementById("bandit-uncertain");
  if (!knownBtn || !uncertainBtn) return;

  const roundEl = document.getElementById("bandit-round");
  const totalEl = document.getElementById("bandit-total");
  const messageEl = document.getElementById("bandit-message");
  const priorA = document.getElementById("bandit-prior-a");
  const problemEl = document.getElementById("bandit-problem-banner");
  const ballA = document.getElementById("ball-a");
  const ballB = document.getElementById("ball-b");

  const REWARD = 50;
  const THETA_B = 0.1;
  const THETA_A_GOOD = 0.2;
  const MAX_ROUNDS = 10;
  const DEFAULT_PRIOR_A =
    "Reminder: Jar A was randomly chosen from a group with <b>50%</b> good jars. <br><br>A <i>good arm A</i> returns a reward with probability <b>20%</b>. <br><br><i>You don't know yet whether Jar A is good or bad.</i>";

  let isGood, thetaA, round, total, revealed, busy;
  let problemNumber = 0;

  function resetSession() {
    problemNumber++;
    problemEl.textContent = "Problem " + problemNumber;
    isGood = Math.random() < 0.5;
    thetaA = isGood ? THETA_A_GOOD : 0;
    round = 1;
    total = 0;
    revealed = false;
    busy = false;
    roundEl.textContent = round;
    totalEl.textContent = total;
    messageEl.innerHTML = "<i>Click the jar you want to draw from this round.</i>";
    priorA.innerHTML = DEFAULT_PRIOR_A;
    knownBtn.disabled = false;
    uncertainBtn.disabled = false;
  }

  function play(isKnown, ball) {
    if (busy) return;
    busy = true;
    knownBtn.disabled = true;
    uncertainBtn.disabled = true;

    const jarLabel = isKnown ? "B" : "A";
    const theta = isKnown ? THETA_B : thetaA;
    const hit = Math.random() < theta;

    messageEl.innerHTML = "<i>You chose jar <b>" + jarLabel + "</b>.</i>";

    ball.style.backgroundColor = hit ? "#000" : "#fff";
    ball.classList.remove("animate");
    void ball.offsetWidth;
    ball.classList.add("animate");

    setTimeout(() => {
      const payoff = hit ? REWARD : 0;
      total += payoff;
      totalEl.textContent = total;

      if (!isKnown && hit && !revealed) {
        revealed = true;
        priorA.innerHTML =
          "Update: You now know that Jar A is <b><i>good</i></b>. <br><br>It returns a reward with probability <b>20%</b>.";
        messageEl.innerHTML = "<b>A reward was drawn! Jar A is good!</b>";
      } else {
        messageEl.innerHTML =
          "<i>You chose jar <b>" + jarLabel + "</b>. The ball drawn is <b>" +
          (hit ? "black" : "white") + "</b>. A " + (hit ? "black" : "white") +
          " ball pays <b>" + payoff + "</b> points.</i>";
      }
    }, 450);

    setTimeout(() => {
      ball.classList.remove("animate");
      ball.style.removeProperty("display");

      if (round >= MAX_ROUNDS) {
        const summary = revealed
          ? "Session complete! Jar A was confirmed good. Starting a new session&hellip;"
          : "Session complete! Jar A was actually <b>" +
            (isGood ? "Good" : "Bad") +
            "</b>. Starting a new session&hellip;";
        messageEl.innerHTML = "<i>" + summary + "</i>";
        setTimeout(resetSession, 2200);
      } else {
        round++;
        roundEl.textContent = round;
        knownBtn.disabled = false;
        uncertainBtn.disabled = false;
        busy = false;
      }
    }, 1400);
  }

  knownBtn.addEventListener("click", () => play(true, ballB));
  uncertainBtn.addEventListener("click", () => play(false, ballA));

  resetSession();
})();
