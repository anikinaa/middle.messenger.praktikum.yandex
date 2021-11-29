const express = require('express');
const helmet = require('helmet');
const fs = require( 'fs' );
const path = require('path');
const rateLimit = require('express-rate-limit');

const distPath = path.resolve(__dirname, 'dist')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        connectSrc: ["'self'", "ya-praktikum.tech", "wss://ya-praktikum.tech"],
        imgSrc: ["'self'", "ya-praktikum.tech", "data:"]
    }
}));

const limiter = rateLimit({
    windowMs: 10000,
    max: 100
});

app.use(limiter);

app.use(express.static(distPath));

app.get('*', function(req, res){

    const indexHTML = fs.readFileSync( path.resolve( distPath, 'index.html' ), {
        encoding: 'utf8',
    } );

    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
