Package.describe({
  summary: "Meteor wrapper for googlefonts API",
  version: "1.1.3",
  git: "https://github.com/udondan/googlefonts.git",
  environments: ['server']
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@0.9.0");
  where = 'server';
  api.add_files('lib/googlefonts.js', where);
  api.export && api.export('googlefonts', where);
});
