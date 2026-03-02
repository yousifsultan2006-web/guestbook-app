//import the express module
import express from 'express';
const submissions = [];
const app = express();
// Set the port number
const PORT = 3011;

app.set('view engine', 'ejs');
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

        timestamp: new Date()
    };
    submissions.push(submittedform)
        res.render("confirmation", {submittedform})
    });


    

app.get("/admin", (req, res) => {
    res.render('admin', {orders});
});

app.get('/', (req, res) => {
    res.render('index');

});



app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

