/* =======================================
   LOAD SAVED THEME ON ALL PAGES
======================================= */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");

    const icon = document.getElementById("theme-icon");
    if (icon) icon.src = "images/sun.png";
}


/* =======================================
   DARK MODE TOGGLE 
======================================= */
const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            icon.src = "images/sun.png";
        } else {
            localStorage.setItem("theme", "light");
            icon.src = "images/moon.png";
        }
    });
}



/* =======================================
   BACK TO TOP — HOME PAGE
======================================= */
document.addEventListener("DOMContentLoaded", function () {
    const backBtn = document.getElementById("backToTop");
    if (backBtn) {

        window.addEventListener("scroll", () => {
            backBtn.classList.toggle("show", window.scrollY > 300);
        });

        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});




/* =======================================
   CLOCK 
======================================= */
if (document.getElementById("clock")) {
    function updateClock() {
        const now = new Date();
        document.getElementById("clock").textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
}


/* =======================================
   SERVICES PAGE — SORTING
======================================= */
if (document.querySelector(".services-page")) {

    const sortSelect = document.getElementById("sort");
    const serviceGrid = document.querySelector(".service-grid");
    let services = Array.from(document.querySelectorAll(".service-box"));

   
    sortSelect.addEventListener("change", function () {
        let value = this.value;

        services = Array.from(document.querySelectorAll(".service-box"));

        if (value === "low-high") {
            services.sort((a, b) => a.dataset.price - b.dataset.price);
        }
        else if (value === "high-low") {
            services.sort((a, b) => b.dataset.price - a.dataset.price);
        }
        else if (value === "a-z") {
            services.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        }
        else if (value === "z-a") {
            services.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        }

        services.forEach(card => serviceGrid.appendChild(card));
    });
}

/* =======================================
   FAVORITES — SAVE IN LOCAL STORAGE
======================================= */

if (document.querySelector(".services-page")) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const serviceBoxes = document.querySelectorAll(".service-box");

    serviceBoxes.forEach(box => {
        const name = box.dataset.name; 
        const checkbox = box.querySelector(".favorite input");

        if (favorites.includes(name)) {
            checkbox.checked = true;
            box.classList.add("fav-active");
        }

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                
                if (!favorites.includes(name)) {
                    favorites.push(name);
                }
            } else {
               
                favorites = favorites.filter(item => item !== name);
            }

            
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}
