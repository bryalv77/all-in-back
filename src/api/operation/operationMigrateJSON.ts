import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import OperationService from "../../services/operationService";

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(Permissions.values.operationCreate);
    const payload = await new OperationService(req).migrateJSON();
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
