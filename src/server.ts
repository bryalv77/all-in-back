/**
 * Starts the application on the port specified.
 */
require('dotenv').config();

const PORT = process.env.PORT || 8080;
console.log('PORT: ', PORT);
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middlewares/authMiddleware';
import { tenantMiddleware } from './middlewares/tenantMiddleware';
import { databaseMiddleware } from './middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createRateLimiter } from './api/apiRateLimiter';
import { languageMiddleware } from './middlewares/languageMiddleware';
import authSocial from './api/auth/authSocial';
import setupSwaggerUI from './api/apiDocumentation';
console.log('here in api index.ts');
console.log('creating app');
const app = express();
console.log('created app');
const server = app.listen(PORT);
server.timeout = 120000;
console.log('servertimeout: ', server);
// Enables CORS
app.use(cors({ origin: true }));
console.log('Enable cors');
// Initializes and adds the database middleware.
console.log('databaseMiddleware');
app.use(databaseMiddleware);

// Sets the current language of the request
console.log('languageMiddleware');
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
console.log('authMiddleware');
app.use(authMiddleware);

// Setup the Documentation
console.log('setupSwaggerUI');
setupSwaggerUI(app);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
console.log('helmet');
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
console.log('body parser');
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith('/api/plan/stripe/webhook')) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  }),
);
console.log('routes');

// Configure the Entity routes
const routes = express.Router();

// Enable Passport for Social Sign-in
console.log('passport for social sign in');
authSocial(app, routes);
console.log('requiring routes');
function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    try {
      const module = require(`./api/${moduleName}`).default(
        routes,
      );
      console.log('loaded module name: ', moduleName);
      resolve(module);
    } catch (error) {
      reject(error);
    }
  });
}
const modules = [
  'auditLog',
  'auth',
  'plan',
  'tenant',
  'file',
  'user',
  'settings',
  'customer',
  'product',
  'order',
  'operation',
  'bank',
  'category',
  'taskList',
  'tasks',
  'tags',
  'taskTags',
  'subTasks',
  'media',
  'posts',
  'like',
  'hashtag',
  'postHashtag',
  'artist',
  'album',
  'song',
  'playlist',
  'playlistSong',
  'userPlaylist',
  'city',
  'country',
  'address',
  'productCategory',
  'orderDetail',
  'paymentMethods',
  'productReview',
  'promotions',
  'course',
  'teacher',
  'lesson',
  'courseEnrollment',
  'student',
  'courseComment',
  'courseTransaction',
  'courseCategory',
  'categoryCourseRelation',
  'courseProgress',
  'message',
  'conversation',
  'conversationParticipant',
  'business',
  'businessCategory',
  'service',
  'availabilityTimeslot',
  'appointment',
  'brand',
  'deliveryMethod',
  'followers',
];
Promise.all(
  modules.map((moduleName) => loadModule(moduleName)),
)
  .then((modules) => {
    console.log('required all the routes');
    // Loads the Tenant if the :tenantId param is passed
    console.log('tenantMiddleware');
    routes.param('tenantId', tenantMiddleware);
    // Add the routes to the /api endpoint
    console.log('add api routes');
    app.use('/api', routes);
    console.log('export app');
    // Resto de la configuración de tu aplicación Express
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al cargar módulos:', error);
  });
