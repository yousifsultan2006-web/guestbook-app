//import the express module
import express from 'express';
const app = express();
// Set the port number
const PORT = 4000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);

});

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});