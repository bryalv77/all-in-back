/**
 * This method returns the server config.
 * By default, it returns the Environment Variables.
 */
require('dotenv').config();
export function getConfig(): any {
  return process.env;
}
