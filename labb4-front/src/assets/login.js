//LOGGA IN

//Ladda innehåll innan js-kod körs
document.addEventListener("DOMContentLoaded", () => {


//Hämtar id för login-knapp
//Eventlyssnare för vad som händer vid klick av knapp
document.getElementById("loginBtn").addEventListener("click", async () => {

    //Hämtar värdet från inputfältet för användarnamn
    const username = document.getElementById("loginUser").value;

    //Hämtar värdet från inputfältet för lösenord
    const password = document.getElementById("loginPass").value;

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
        if (!response.ok) {
            throw new Error("Inloggning lyckades ej");
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

});