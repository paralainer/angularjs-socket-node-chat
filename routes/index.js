
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index.html');
};
exports.client = function (req, res) {
    res.render('client/index.html');
};

exports.commandCenter = function (req, res) {
    res.render('commandcenter/index.html');
};