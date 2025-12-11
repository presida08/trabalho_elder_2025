document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    smoothLoad();
});


function toggleTheme() {
    const body = document.body;

    // alterna classe
    body.classList.toggle("light");

    // salva preferencia
    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

    animateThemeChange();
}



function animateThemeChange() {
    document.body.style.transition = "background 0.4s, color 0.4s";
    setTimeout(() => {
        document.body.style.transition = "";
    }, 400);
}



function smoothLoad() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity .5s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 50);
}
