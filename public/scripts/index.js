const allSignedOut = document.querySelectorAll('.signed-out');
const allSignedIn = document.querySelectorAll('.signed-in');

function renderHome()//will need some updating once a thing for account settings is added
{
    const allContent = document.querySelectorAll(".options");
    const homePage = document.getElementById("home-options");
    allContent.forEach(item => item.style.display = 'none');
    homePage.style.display = 'grid';
}

const setupUI = (user) =>{
    if (user){
        allSignedIn.forEach(item => item.style.display = 'block');
        allSignedOut.forEach(item => item.style.display = 'none');
    }
    else{
        allSignedIn.forEach(item => item.style.display = 'none');
        allSignedOut.forEach(item => item.style.display = 'block');
    }
}