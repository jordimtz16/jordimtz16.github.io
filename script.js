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




// CODE TO SHOW THE DROPDOWN LISTS OF COURSES 

function toggleDropdown(event, listId) {
  event.stopPropagation(); // prevent immediate close when clicking button
  const list = document.getElementById(listId);
  const allLists = document.querySelectorAll(".dropdown-list");

  // Close all dropdowns first
  allLists.forEach(l => {
    if (l !== list) l.style.display = "none";
  });

  // Toggle this dropdown
  list.style.display = (list.style.display === "block") ? "none" : "block";
}

// Close dropdowns when clicking outside
document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-list").forEach(list => {
    list.style.display = "none";
  });
});
