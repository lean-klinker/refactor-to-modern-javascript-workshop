const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = 3000;

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.use('/', express.static('./src'));

app.listen(PORT, function () {
    console.log('Now listening at http://localhost:' + PORT + '/ ...')
})