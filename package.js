Package.describe({
  summary: "Meteor wrapper for googlefonts API",
  environments: ['server']
});

Package.on_use(function (api) {
  where = 'server';
  api.add_files('lib/googlefonts.js', where);
  api.export && api.export('googlefonts', where);
});
