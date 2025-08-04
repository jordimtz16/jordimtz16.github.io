// Optional interactivity
console.log("Welcome to your personal site!");


function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabLinks = document.querySelectorAll(".tab-link");

  tabContents.forEach(tab => tab.classList.remove("active"));
  tabLinks.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
