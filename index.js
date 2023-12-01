require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/user/home', (req, res) => {
    res.render('user/home', { layout: 'userLayout', title: 'User Home' });
});

// Admin side routes
app.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard', { layout: 'adminLayout', title: 'Admin Dashboard' });
});

app.get('/', (req, res) => {
    res.render('common/index')
})
app.get('/news', (req, res) => {
    res.render('common/news')
})
app.get('/contact', (req, res) => {
    res.render('common/contact')
})
app.get('/hiring', (req, res) => {
    res.render('common/hiring')
})

app.get('/maintenance', (req, res) => {
    res.render('common/maintenance')
})

app.get('/about', (req, res) => {
    res.render('common/about')
})

app.get('/about', (req, res) => {
    res.render('common/about')
})

app.get('/detail_product', (req, res) => {
    res.render('common/detail_product')
})

app.get('/signup', (req, res) => {
    res.render('common/signup')
})

app.get('/login', (req, res) => {
    res.render('common/login')
})

const PORT_SERVER = process.env.PORT_SERVER || 3000
app.listen(PORT_SERVER, () => {
    console.log(`Server is running on port ${PORT_SERVER}`);
});