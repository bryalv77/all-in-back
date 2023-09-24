export default (app) => {
  app.post(
    `/tenant/:tenantId/followers`,
    require('./followersCreate').default,
  );
  app.put(
    `/tenant/:tenantId/followers/:id`,
    require('./followersUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/followers/import`,
    require('./followersImport').default,
  );
  app.delete(
    `/tenant/:tenantId/followers`,
    require('./followersDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/followers/autocomplete`,
    require('./followersAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/followers`,
    require('./followersList').default,
  );
  app.get(
    `/tenant/:tenantId/followers/:id`,
    require('./followersFind').default,
  );
};
