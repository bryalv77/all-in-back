export default (app) => {
  app.post(
    `/tenant/:tenantId/course-comment`,
    require('./courseCommentCreate').default,
  );
  app.put(
    `/tenant/:tenantId/course-comment/:id`,
    require('./courseCommentUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/course-comment/import`,
    require('./courseCommentImport').default,
  );
  app.delete(
    `/tenant/:tenantId/course-comment`,
    require('./courseCommentDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/course-comment/autocomplete`,
    require('./courseCommentAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/course-comment`,
    require('./courseCommentList').default,
  );
  app.get(
    `/tenant/:tenantId/course-comment/:id`,
    require('./courseCommentFind').default,
  );
};
