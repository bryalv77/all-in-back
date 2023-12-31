export default (app) => {
  app.post(
    `/tenant/:tenantId/appointment`,
    require('./appointmentCreate').default,
  );
  app.put(
    `/tenant/:tenantId/appointment/:id`,
    require('./appointmentUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/appointment/import`,
    require('./appointmentImport').default,
  );
  app.delete(
    `/tenant/:tenantId/appointment`,
    require('./appointmentDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/appointment/autocomplete`,
    require('./appointmentAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/appointment`,
    require('./appointmentList').default,
  );
  app.get(
    `/tenant/:tenantId/appointment/:id`,
    require('./appointmentFind').default,
  );
};
