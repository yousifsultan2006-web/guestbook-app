//import the express module
import express from 'express';
const submissions = [];
const app = express();
// Set the port number
const PORT = 3011;
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.post("/submit_form", (req, res) => {
    
    
    const submittedform = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        jobtitle: req.body.jobtitle,
        Company: req.body.Company,
        LinkedIn: req.body.LinkedIn,
        Method: req.body.methodofmeeting,
        Other: req.body.other,
        message: req.body.message,
        mailingchecklist: req.body.mailingchecklist,
        formathtml: req.body["format-html"],
        formattext: req.body["format-text"],
    };
    submissions.push(submittedform);
    res.redirect(`/confirmation`);
});
app.get("/admin", (req, res) => {
    res.send(submissions);
});

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`)

});

app.get(`/confirmation`, (req, res) => {
   res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

