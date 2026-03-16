export function validateForm(data) {
    const errors = [];

    //trim spaces for easier validation
    const fname = data.fname ? data.fname.trim() : "";

    const lname = data.lname ? data.lname.trim() : "";

    //validate first name 
    if (!fname) {
        errors.push("First name is required");

    }

    //validate last name
    if (!lname) {
        errors.push("Last name is required");
    }

    const validMethods = ["conference", "socialmedia"];
    //validate method of meeting
    if (!validMethods.includes(data.method)) {
        errors.push("Please select a valid option for 'How we met'");

    }

    //validate mailing format
    if (data.mailingchecklist) {
        const validFormats = ["html", "text"];

        if (!validFormats.includes(data.format)) {
            errors.push("Please choose an email format (HTML or Text");

        }
    }
    console.log(errors);
    return {
        isValid: errors.length === 0, errors
    };

    
}