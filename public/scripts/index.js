
const allSignedOut = document.querySelectorAll('.signed-out');
const allSignedIn = document.querySelectorAll('.signed-in');
const accDetails = document.querySelector(".account-details");

function renderHome()//will need some updating once a thing for account settings is added
{
    const allContent = document.querySelectorAll(".options");
    const homePage = document.getElementById("home-options");
    allContent.forEach(item => item.style.display = 'none');
    homePage.style.display = 'grid';
}

const setupUI = (user) =>{
    if (user){
        const html = `<div>Logged in as ${user.email}</div>`;
        accDetails.innerHTML = html;

        //toggle navbar
        allSignedIn.forEach(item => item.style.display = 'block');
        allSignedOut.forEach(item => item.style.display = 'none');
    }
    else{

        //toggle navbar
        allSignedIn.forEach(item => item.style.display = 'none');
        allSignedOut.forEach(item => item.style.display = 'block');
    }
}
