const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Welcome'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;
// process.env.PORT -> If we deploy it to heroku

app.listen(port, () => console.log(`Server running on port ${port}`));

