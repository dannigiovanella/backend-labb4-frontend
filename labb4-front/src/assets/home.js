"use strict";

//INLOGGAD SIDA. SKYDDAD ROUTE

//Ladda innehåll innan js-kod körs
document.addEventListener("DOMContentLoaded", () => {

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
    const res = await fetch("https://backend-labb4-backend.onrender.com/api/protected", {
        //GET - Hämtar data
        method: "GET",
        //Header. Skickar token till backend
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    //Omvandlar svaret till JSON
    const data = await res.json();

    //Hämtar element från html och visar användarnamn (skyddad data)
    document.getElementById("username").textContent = data.user;
});

});