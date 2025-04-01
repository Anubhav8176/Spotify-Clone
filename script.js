
var clientId = "eaadf8cfd0334aca88ca04afa7a0f612";
var clientSecret = "066cf16470ee455288cd4442f95f668c";
var accessToken = ``;
var categoriesList;


//Getting the access_token from the api
async function getAccessToken(clientId, clientSecret){
    let data;

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret
            })
        })

        data = await response.json()   
        accessToken = data.access_token
    } catch (error) {
        console.log(`The error is: ${error}`)
    }
}

async function getCategories(accessToken){

    let rawData;

    try{
        const categories = await fetch("https://api.spotify.com/v1/browse/categories",{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        rawData = await categories.json()
        categoriesList = rawData.categories.items
    } catch(error){
        console.log(`The error for categories is: ${error}`)
    }
}


getAccessToken(clientId, clientSecret)
.then(()=>{
    console.log(`Token: `, accessToken)
    getCategories(accessToken)
    .then(()=>{
        categoriesList.forEach(category => {
            document.querySelector(".cardContainer").innerHTML += `
                <div class="card">
                    <img src="${category.icons[0].url}" alt="cover">
                    <h2>${category.name}</h2>
                </div>
            `;
        });
    })
})

