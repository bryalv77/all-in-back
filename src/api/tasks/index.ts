export default (app) => {
  app.post(
    `/tenant/:tenantId/tasks`,
    require('./tasksCreate').default,
  );
  app.put(
    `/tenant/:tenantId/tasks/:id`,
    require('./tasksUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/tasks/import`,
    require('./tasksImport').default,
  );
  app.delete(
    `/tenant/:tenantId/tasks`,
    require('./tasksDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/tasks/autocomplete`,
    require('./tasksAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/tasks`,
    require('./tasksList').default,
  );
  app.get(
    `/tenant/:tenantId/tasks/:id`,
    require('./tasksFind').default,
  );
};
