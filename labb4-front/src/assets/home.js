"use strict";

//INLOGGAD SIDA. SKYDDAD ROUTE


//HÄMTA TOKEN FÖR ATT VISA SIDA
//Körs direkt när sidan laddas
document.addEventListener("DOMContentLoaded", async () => {

    //Hämtar jwt-token från localStorage
    const token = localStorage.getItem("token");

    //Om ingen token finns blir användare inte inloggad
    if (!token) {

        //Skickas tillbaka till login-sidan
        window.location.href = "/index.html";
        return;
    }
});

//HÄMTA SKYDDAD DATA
// Körs när sidan laddas
document.addEventListener("DOMContentLoaded", async () => {

    //Hämtar token från localStorage
    const token = localStorage.getItem("token");

    // Skickar request till skyddad route i backend
    try {
        const response = await fetch("https://backend-labb4-backend.onrender.com/api/protected", {
            //GET - Hämtar data
            method: "GET",
            //Header. Skickar token till backend
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        //Omvandlar svaret till JSON
        const data = await response.json();

        //Hämtar element från html och visar användarnamn (skyddad data)
        document.getElementById("username").textContent = data.user;

        //Om nåt går fel, logga ut användare
    } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/index.html";
    }


    //LOGGA UT

    //Hämtar Logout-knapp
    const logoutBtn = document.getElementById("logoutBtn");

    //Eventlyssnar som hanterar klick på logout knapp
    //Kontroll om knapp är tryckt
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {

            //Tar bort token och loggar ut
            localStorage.removeItem("token");

            //Skickar tillbaka till login-sidan
            window.location.href = "/index.html";
        });
    }
});
