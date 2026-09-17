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
