//import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const submissions = [];
const app = express();
// Set the port number
const PORT = 3012;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
// create the pool
const pool = mysql2.createPool({
     host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}).promise();

app.get('/db-test', async (req, res) => {
    try {
        const submissions = await pool.query('SELECT * FROM submissions');
        res.send(submissions[0]);

    } catch (err) {
         console.error('Database error:', err);
       res.status(500).send('Database error: ' + err.message);
    }
})

app.post("/submit_form", async(req, res) => {
    
    try {
        const form = req.body;
        console.log('New form submitted:', form);
        const sql = `
        INSERT INTO submissions 
        (fname, lname, email, jobtitle, company, linkedin, method, other, message, mailingchecklist, format)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        const params = [
            form.fname, 
            form.lname,
            form.email,
            form.jobtitle,
            form.company,
            form.linkedin,
            form.method,
            form.other,
            form.message,
            form.mailingchecklist? 1 : 0,
            form.format
        ];console.log(params);
        const result = await pool.execute(sql, params);
        console.log('form saved with ID: ', result[0].insertId);

        res.render('confirmation', { form });
    } catch(err) {
        console.error('Error saving form: ', err);
        res.status(500).send('Sorry, there was an error submitting your form. please try again.')
    }
    
   //const submittedform = {
     //   fname: req.body.fname,
       // lname: req.body.lname,
        //email: req.body.email,
        //jobtitle: req.body.jobtitle,
        //Company: req.body.Company,
        //LinkedIn: req.body.LinkedIn,
        //Method: req.body.methodofmeeting,
        //Other: req.body.other,
        //message: req.body.message,
        //mailingchecklist: req.body["mailing-list-checkmark"],
        //format: req.body.format,

        //timestamp: new Date()
    //};
    });


    

app.get("/admin",async(req, res) => {

    try {
        const [submissions] = await pool.query('SELECT * FROM submissions ORDER BY timestamp DESC');

        res.render('admin', {submissions});

    } catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading submissions: '
+ err.message);
    }
    

});

app.get('/', (req, res) => {
    res.render('index');

});

app.get('/portfolio', (req, res) => {
    res.render('portfolio')
});




app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

