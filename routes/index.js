
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index');
};
exports.client = function (req, res) {
    res.render('client/index');
};

exports.commandCenter = function (req, res) {
    res.render('commandcenter/index');
};