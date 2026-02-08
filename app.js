//import the express module
import express from 'express';
const app = express();
// Set the port number
const PORT = 4000;
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.post("/submit_form", (req, res) => {
    res.send("form received! (Validation passed)");
});

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);

});

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

