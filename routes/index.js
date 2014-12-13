
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};
exports.client = function(req, res){
  res.render('client/index');
};
exports.client2 = function(req, res){
  res.render('client/index2');
};

exports.commandCenter = function(req, res){
  res.render('commandcenter/index');
};

exports.createGame = function(req, res){

  res.send({status: 'ok'});
};