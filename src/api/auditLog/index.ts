export default (app) => {
  app.get(
    `/tenant/:tenantId/audit-log`,
    require('./auditLogList').default,
  );
  app.get(`/index`, require('./default').default);
};
