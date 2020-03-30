//signup
$(document).ready(function(){
    const signup = document.querySelector("#signup-form");
    signup.addEventListener('submit', (e) =>{
        e.preventDefault();//very important since otherwise the form would refresh and that is very much not wanted

        const inputEmail = $("#signup-email").val();
        const inputPassword = $("#signup-password").val();

        auth.createUserWithEmailAndPassword(inputEmail, inputPassword).then(function(){
            const modal = $("#modal-signup");
            M.Modal.getInstance(modal).close();
            document.querySelector("#signup-form").reset();
            signup.querySelector(".error").innerHTML = "";
        }).catch(err => {
            signup.querySelector(".error").innerHTML = err.message;
        });
    });
});
//signout
$(document).ready(function(){
    const logout = document.querySelector("#sign-out-button");
    logout.addEventListener("click", (e) =>{
        e.preventDefault();//same as before
        auth.signOut().then(() =>{
            console.log("User signed out");
        });
    });
});
//login
$(document).ready(function(){
    const login = document.querySelector("#login-form");
    login.addEventListener('submit', (e) =>{
        e.preventDefault();

        const inputEmail = $("#login-email").val();
        const inputPassword = $("#login-password").val();

        auth.signInWithEmailAndPassword(inputEmail, inputPassword).then(cred => {
            console.log(cred.user);
            const modal = $("#modal-login");
            M.Modal.getInstance(modal).close();
            document.querySelector("#login-form").reset();
            login.querySelector('.error').innerHTML = "";
        }).catch(err => {
            login.querySelector('.error').innerHTML = err.message;
        });
    });
});


auth.onAuthStateChanged(user =>{
    
    if (user){
        setupUI(user);
    }
    else{
        setupUI();
    }

});