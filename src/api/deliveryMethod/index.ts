export default (app) => {
  app.post(
    `/tenant/:tenantId/delivery-method`,
    require('./deliveryMethodCreate').default,
  );
  app.put(
    `/tenant/:tenantId/delivery-method/:id`,
    require('./deliveryMethodUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/delivery-method/import`,
    require('./deliveryMethodImport').default,
  );
  app.delete(
    `/tenant/:tenantId/delivery-method`,
    require('./deliveryMethodDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/delivery-method/autocomplete`,
    require('./deliveryMethodAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/delivery-method`,
    require('./deliveryMethodList').default,
  );
  app.get(
    `/tenant/:tenantId/delivery-method/:id`,
    require('./deliveryMethodFind').default,
  );
};
