// eslint-disable-next-line no-unused-vars
const nunjucks = require('nunjucks');
var path = require('path')

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

//nunjucks.configure('templates', {autoescape: false});

//const env = new nunjucks.Environment();

env.addFilter('extension', function(str) {
    console.log(str)
    console.log(path.extname(str))
    return path.extname(str);
});


module.exports = function(app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // Register an Express middleware
  app.use('/build', (req, res) => {

    const entries_service = app.service('entries');
    let params = {};
    params.query = {};
    params.paginate = false;
    params.query.kodi_type = {
      $in: ['TV', 'Film']
    };
    const tv_folder='/data/kodi/tv/';
    const film_folder='/data/kodi/movies/';

    entries_service.find(params).then(entries => {

      const result = env.render('output.sh', {entries, tv_folder, film_folder});
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
  });
};
