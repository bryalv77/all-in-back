require('dotenv').config();
const PORT = process.env.PORT || 8080;
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

const app = express();
app.use(cors({ origin: true }));
app.use(databaseMiddleware);
app.use(languageMiddleware);
app.use(authMiddleware);
setupSwaggerUI(app);
// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);
app.use(helmet());
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
const routes = express.Router();
authSocial(app, routes);
function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    try {
      const module = require(`./api/${moduleName}`).default(
        routes,
      );

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
  .then(() => {
    routes.param('tenantId', tenantMiddleware);
    app.use('/api', routes);
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((error) => {
    console.log('error: ', error);
  });
