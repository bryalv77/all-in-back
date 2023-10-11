import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../../api/apiResponseHandler';

export default async (req, res, next) => {
  try {
    await ApiResponseHandler.success(
      req,
      res,
      'Hello World',
    );
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
