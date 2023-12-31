export default (app) => {
  app.post(
    `/tenant/:tenantId/media`,
    require('./mediaCreate').default,
  );
  app.put(
    `/tenant/:tenantId/media/:id`,
    require('./mediaUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/media/import`,
    require('./mediaImport').default,
  );
  app.delete(
    `/tenant/:tenantId/media`,
    require('./mediaDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/media/autocomplete`,
    require('./mediaAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/media`,
    require('./mediaList').default,
  );
  app.get(
    `/tenant/:tenantId/media/:id`,
    require('./mediaFind').default,
  );
};
