
let signIn = document.querySelector(".signin");
let signUp = document.querySelector(".signup");
let nextSection = document.querySelectorAll(".next");
let loginLink = document.getElementById("login");
let signUpLink = document.getElementById("signup");

let btnNextSignup = document.getElementById("btnNextSignup");
let btnNext2 = document.getElementById("btnNext2");
let btnNext3 = document.getElementById("btnNext3");
let btnNext4 = document.getElementById("btnNext4");
let btnNext5 = document.getElementById("btnNext5");

let btnLogin = document.getElementById("btnLogin");

// Click event for "Login" link
loginLink.onclick = function() {
    signIn.classList.add("active");
    signUp.classList.add("inActive");
    nextSection.forEach(section => section.classList.add("inActive"));
}

// Click event for "Sign Up" link
signUpLink.onclick = function() {
    signIn.classList.remove("active");
    signUp.classList.remove("inActive");
    nextSection.forEach(section => section.classList.remove("active"));
}

// Click event for "Next" button on the signup section
btnNextSignup.onclick = function() {
    signIn.classList.remove("active");
    signUp.classList.add("inActive");
    nextSection[0].classList.add("active");
}

// Click event for "Next" button on section 2
btnNext2.onclick = function() {
    nextSection[0].classList.remove("active");
    nextSection[1].classList.add("active");
}

// Click event for "Next" button on section 3
btnNext3.onclick = function() {
    nextSection[1].classList.remove("active");
    nextSection[2].classList.add("active");
}

// Click event for "Next" button on section 4
btnNext4.onclick = function() {
    nextSection[2].classList.remove("active");
    nextSection[3].classList.add("active");
}

// Click event for "Next" button on section 5
btnNext5.onclick = function() {
    nextSection[3].classList.remove("active");
    nextSection[4].classList.add("active");
}

// Click event for "Login" button
btnLogin.onclick = function() {
    // Add your login logic here
    console.log("Login button clicked");
    // Example: You can retrieve the email and password values from the input fields
    let email = document.querySelector(".signin input[type='email']").value;
    let password = document.querySelector(".signin input[type='password']").value;
    // Example: Perform login validation or API request
    if (email && password) {
        console.log("Perform login validation or API request");
        // Add your login validation or API request logic here
    }
};



