console.log("form js loaded");
document.getElementById("contactForm").onsubmit = () => {
    clearErrors();

    let valid = true;

    //validate first name
    let fname = document.getElementById("fname").value.trim();
    if(!fname) {
        document.getElementById("fname-error").style.display = "block";
        valid = false;
        
    }
    //validate last name
    let lname = document.getElementById("lname").value.trim();
    if(!lname) {
        document.getElementById("lname-error").style.display = "block";
        valid = false;

    }
    //validate email, ensure an email is given if mailing list is checked
    let email = document.getElementById("email").value.trim();
    let mailingchecklist = document.getElementById("mailingchecklist").checked
    if(mailingchecklist && !email) {
        document.getElementById("email-error").textContent = "Email is required if you join mailing list";
        document.getElementById("email-error").style.display = "block";
        valid = false;
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
        document.getElementById("email-error").textContent = "Email must contain @ and a dot (.)";
        document.getElementById("email-error").style.display = "block";
        valid = false;

    }
    let linkedin = document.getElementById("linkedin").value.trim();

    if (linkedin && !linkedin.startsWith("https://linkedin.com/in/")) {
        document.getElementById("linkedin-error").textContent = "LinkedIn URL must start with https://linkedin.com/in/";

        document.getElementById("linkedin-error").style.display = "block";
        valid = false;
    }
    //validate how we met
    let method = document.getElementById("method").value.trim();
    if (!method) {
        document.getElementById("method-error").style.display = "block";
        valid = false;
    }
    return valid;

};

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    
    for (let error of errors) {
        error.style.display = "none";
    };
};