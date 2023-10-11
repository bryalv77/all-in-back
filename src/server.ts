/**
 * Starts the application on the port specified.
 */
require('dotenv').config();

const PORT = process.env.PORT || 8080;
console.log('PORT: ', PORT);
import api from './api';

api.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
