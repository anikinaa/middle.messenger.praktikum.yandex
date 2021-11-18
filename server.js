const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

app.use(helmet());
const limiter = rateLimit({
    windowMs: 10000,
    max: 100
});

app.use(limiter);

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
