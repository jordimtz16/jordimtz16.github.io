// script.js
document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", (evt) => {
      const tabName = link.getAttribute("onclick").match(/'(.+?)'/)[1];

      // Remove active classes
      tabLinks.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      // Add active to current
      document.getElementById(tabName).classList.add("active");
      link.classList.add("active");
    });
  });
});
