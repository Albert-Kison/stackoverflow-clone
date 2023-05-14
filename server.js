// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
const express = require('express');
const app = express();
// app.use(requireHTTPS);

app.use(express.static(__dirname+'/dist/ass04'));

app.get('/*', function(req, res) {
    console.log(__dirname+'dist/ass04/index.html');
    res.sendFile(__dirname+'dist/ass04/index.html')
});

app.listen(process.env.PORT || 8080, (req, res) => {
    console.log("Server started");
});