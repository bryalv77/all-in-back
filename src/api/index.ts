import express from 'express';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createRateLimiter } from './apiRateLimiter';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import authSocial from './auth/authSocial';
import setupSwaggerUI from './apiDocumentation';
console.log('here in api index.ts');
console.log('creating app');
const app = express();
console.log('created app');
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
require('./auditLog').default(routes);
require('./auth').default(routes);
require('./plan').default(routes);
require('./tenant').default(routes);
require('./file').default(routes);
require('./user').default(routes);
require('./settings').default(routes);
require('./customer').default(routes);
require('./product').default(routes);
require('./order').default(routes);
require('./operation').default(routes);
require('./bank').default(routes);
require('./category').default(routes);
require('./taskList').default(routes);
require('./tasks').default(routes);
require('./tags').default(routes);
require('./taskTags').default(routes);
require('./subTasks').default(routes);
require('./media').default(routes);
require('./posts').default(routes);
require('./followers').default(routes);
require('./like').default(routes);
require('./hashtag').default(routes);
require('./postHashtag').default(routes);
require('./artist').default(routes);
require('./album').default(routes);
require('./song').default(routes);
require('./playlist').default(routes);
require('./playlistSong').default(routes);
require('./userPlaylist').default(routes);
require('./city').default(routes);
require('./country').default(routes);
require('./address').default(routes);
require('./productCategory').default(routes);
require('./orderDetail').default(routes);
require('./paymentMethods').default(routes);
require('./productReview').default(routes);
require('./promotions').default(routes);
require('./course').default(routes);
require('./teacher').default(routes);
require('./lesson').default(routes);
require('./courseEnrollment').default(routes);
require('./student').default(routes);
require('./courseComment').default(routes);
require('./courseTransaction').default(routes);
require('./courseCategory').default(routes);
require('./categoryCourseRelation').default(routes);
require('./courseProgress').default(routes);
require('./message').default(routes);
require('./conversation').default(routes);
require('./conversationParticipant').default(routes);
require('./business').default(routes);
require('./businessCategory').default(routes);
require('./service').default(routes);
require('./availabilityTimeslot').default(routes);
require('./appointment').default(routes);
require('./brand').default(routes);
require('./deliveryMethod').default(routes);
console.log('required all the routes');
// Loads the Tenant if the :tenantId param is passed
console.log('tenantMiddleware');
routes.param('tenantId', tenantMiddleware);

// Add the routes to the /api endpoint
console.log('add api routes');
app.use('/api', routes);
console.log('export app');
export default app;
