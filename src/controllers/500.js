module.exports.index = function (err, req, res, next) {
    res.status(500);
    console.log(err.stack);
    res.send('Something wrong. Try it later.');
};