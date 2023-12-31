export default (app) => {
  app.post(
    `/tenant/:tenantId/song`,
    require('./songCreate').default,
  );
  app.put(
    `/tenant/:tenantId/song/:id`,
    require('./songUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/song/import`,
    require('./songImport').default,
  );
  app.delete(
    `/tenant/:tenantId/song`,
    require('./songDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/song/autocomplete`,
    require('./songAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/song`,
    require('./songList').default,
  );
  app.get(
    `/tenant/:tenantId/song/:id`,
    require('./songFind').default,
  );
};
