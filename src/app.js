const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const path = require('path');

// public static path (To Run normal HTML files)
const staticPath = path.join(__dirname, "../public/");
app.use(express.static(staticPath));


//new views path
const template_path = path.join(__dirname, "../templates/views");
app.set("views", template_path);


//partials path
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

app.set('view engine', 'hbs');

// Routing
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("About");
});

app.get('/weather', (req, res) => {
    res.render("weather");
});

app.get('*', (req, res) => {
    res.render("404error", {
        errorMsg: "Get Back To Homepage"
    });
});

app.listen(PORT, () =>{
    console.log(`Listening To The Port: ${PORT}`);
})