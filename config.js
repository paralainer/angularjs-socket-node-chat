module.exports = function(app, express){

  var config = this;

  // Configuration
  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/public');
    app.set('view engine', 'html');

    app.set("view options", {layout: false});
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });
  return config;

};