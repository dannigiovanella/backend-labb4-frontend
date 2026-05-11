"use strict";
//LOGGA IN OCH REGISTRERING

//Ladda innehåll innan js-kod körs
document.addEventListener("DOMContentLoaded", () => {

    //Validering
    //Hämtar element för felmedelande
    const messageLogIn = document.getElementById("message");
    const messageReg = document.getElementById("messagereg");
    const stateMessage = document.getElementById("statemessage");

    //LOGGA IN
    //Hämtar id för login-knapp
    const loginBtn = document.getElementById("loginBtn");

    //Kontroll om det är login-knapp som körs
    if (loginBtn) {

        //Eventlyssnare för vad som händer vid klick av knapp
        loginBtn.addEventListener("click", async () => {

            //visa loading vid seg inloggning
            stateMessage.textContent = "Loggar in...";
            stateMessage.classList.remove("error");

            //Hämtar värdet från inputfältet för användarnamn
            const username = document.getElementById("loginUser").value;

            //Hämtar värdet från inputfältet för lösenord
            const password = document.getElementById("loginPass").value;

            //validering
            //Felmeddelande vid tomt fält
            //adderad class för felmeddelande
            if (!username || !password) {
                messageLogIn.textContent = "Fyll i användarnamn och lösenord";
                messageLogIn.classList.add("error");
                return;
            }


            try {
                //Skickar request till login-route i backend
                const response = await fetch("https://backend-labb4-backend.onrender.com/api/login", {

                    //Post skickar data
                    method: "POST",
                    //Header. Beskriver att data är json-format
                    headers: {
                        "Content-Type": "application/json"
                    },

                    //omvandlar js-objekt till json
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });


                //Kontrollerar om inloggning inte lyckas
                //Felmeddelande för fel användarnamn eller lösenord

                //Rensar fält
                messageLogIn.textContent = "";

                if (!response.ok) {
                    messageLogIn.textContent = "Fel användarnamn eller lösenord";
                    messageLogIn.classList.add("error");
                    return;
                }


                //Omvandlar svar från backend till json
                const data = await response.json();

                //TESTLOG -  TA BORT SEN
                console.log("Svar från backend:", data);

                //Sparar jwt-token i localStorage
                localStorage.setItem("token", data.token);

                //TEST. TA BORT SEN -  Visar att användaren är inloggad
                console.log("Användare inloggad");

                //Om inloggning lyckas skickas användaren till home-sidan
                window.location.href = "/home.html";


            } catch (error) {

                //Vid fel skrivs felmeddelande ut i konsol
                console.error("Fel vid inloggning:", error.message);

            }

        });
    }

    //REGISTRERING
    //Skickar användardata till register route för att lägga till ny användare i databasen


    //Hämtar knappen för register från html
    const regBtn = document.getElementById("regBtn");

    //Kontroll om det är registreringsknapp som körs
    if (regBtn) {
        regBtn.addEventListener("click", async () => {

            // ämtar värde från input. Användarnamn som användare skrivit in
            const username = document.getElementById("regUser").value;

            //Hämtar värde från input. Lösenord som användaren skrivit in
            const password = document.getElementById("regPass").value;


            // Validering
            //Felmeddelande om fält är tomt
            if (!username || !password) {
                messageReg.textContent = "Alla fält måste fyllas i";
                messageReg.classList.add("error");
                return;
            }
            //KOntroll om lösenord är minst 10 tecken
            if (password.lenght < 10) {
                messageReg.textContent = "Lösenord måste vara minst 10 tecken";
                messageReg.classList.add("error");
                return;
            }

            try {
                //Skickar request till register-route i backend
                const response = await fetch("https://backend-labb4-backend.onrender.com/api/register", {

                    //Post skickar data
                    method: "POST",
                    //Header. Beskriver att data är json-format
                    headers: {
                        "Content-Type": "application/json"
                    },

                    //Omvandlar js-objekt till json
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                //Kontrollerar om registrering inte lyckas
                //Felmeddelande om registrering inte lyckas

                //Rensar fält
                messageReg.textContent = "";

                if (!response.ok) {
                    messageReg.textContent = "Registrering misslyckades";
                    messageReg.classList.add("error");
                    return;
                }

                //Feedback om registrering lyckades
                alert("Registrering lyckades");

                //Tömmer fälten
                document.getElementById("regUser").value = "";
                document.getElementById("regPass").value = "";

                //omvandlar svaret från backend till js-objekt
                const data = await response.json();


                // Om nåt går fel
            } catch (error) {

                //Skriver ut fel i konsol
                console.error("Fel vid registrering:", error);
            }

        });
    }

});