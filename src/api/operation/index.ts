export default (app) => {
  app.post(`/tenant/:tenantId/operation`, require("./operationCreate").default);
  app.post(
    `/tenant/:tenantId/operation/migrateJSON`,
    require("./operationMigrateJSON").default
  );
  app.post(
    `/tenant/:tenantId/operation/insertJSON`,
    require("./operationInsertJSON").default
  );
  app.put(
    `/tenant/:tenantId/operation/:id`,
    require("./operationUpdate").default
  );
  app.post(
    `/tenant/:tenantId/operation/import`,
    require("./operationImport").default
  );
  app.delete(
    `/tenant/:tenantId/operation`,
    require("./operationDestroy").default
  );
  app.get(
    `/tenant/:tenantId/operation/autocomplete`,
    require("./operationAutocomplete").default
  );
  app.get(`/tenant/:tenantId/operation`, require("./operationList").default);
  app.get(
    `/tenant/:tenantId/operation/:id`,
    require("./operationFind").default
  );
};
