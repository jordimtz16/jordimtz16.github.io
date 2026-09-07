// script.js
document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabName = link.getAttribute("data-tab");

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
