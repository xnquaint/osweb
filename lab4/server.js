const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apartmentRoutes = require('./routes/apartments');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/apartmentsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/apartments', apartmentRoutes);

app.get('/', (req, res) => {
    res.redirect('/apartments');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
