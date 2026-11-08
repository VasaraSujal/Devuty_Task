import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import { errorHandler, AppError } from './middlewares/error.middleware.js';
import { csrfProtection, csrfTokenMiddleware } from './middlewares/csrf.middleware.js';
import apiRoutes from './routes/index.js';
import { setupSwagger } from './config/swagger.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later' } },
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF protection: expose token to client and validate on state-changing requests
app.use(csrfTokenMiddleware);
app.use(csrfProtection);

app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'OK', timestamp: new Date().toISOString() });
});

// Mount API routes
app.use('/api/v1', apiRoutes);

// Setup Swagger documentation
setupSwagger(app);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404, 'NOT_FOUND'));
});

app.use(errorHandler);

export default app;