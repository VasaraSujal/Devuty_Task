import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from '../config/env.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Tactyqal Labs Blog API',
      version: '1.0.0',
      description: 'RESTful API for Tactyqal Labs blog management system',
      contact: {
        name: 'Tactyqal Labs',
        email: 'contact@tactyqal.com',
      },
    },
    servers: [
      {
        url: `${config.CORS_ORIGIN.replace('3000', '5000')}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'access_token',
          description: 'HTTP-only cookie authentication',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['ADMIN', 'AUTHOR'] },
            avatar: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            slug: { type: 'string' },
            excerpt: { type: 'string', nullable: true },
            content: { type: 'string' },
            coverImage: { type: 'string', nullable: true },
            status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
            authorId: { type: 'string', format: 'uuid' },
            categoryId: { type: 'string', format: 'uuid' },
            metaTitle: { type: 'string', nullable: true },
            metaDescription: { type: 'string', nullable: true },
            canonicalUrl: { type: 'string', nullable: true },
            ogImage: { type: 'string', nullable: true },
            noIndex: { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
            author: { $ref: '#/components/schemas/User' },
            category: { $ref: '#/components/schemas/Category' },
            tags: {
              type: 'array',
              items: { $ref: '#/components/schemas/Tag' },
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            _count: {
              type: 'object',
              properties: {
                posts: { type: 'integer' },
              },
            },
          },
        },
        Tag: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            slug: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            _count: {
              type: 'object',
              properties: {
                posts: { type: 'integer' },
              },
            },
          },
        },
        MediaUploadResult: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            path: { type: 'string' },
            filename: { type: 'string' },
            size: { type: 'integer' },
            mimeType: { type: 'string' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalItems: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        ApiError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                details: { type: 'array', items: { type: 'object' } },
              },
            },
          },
        },
      },
    },
    security: [
      { cookieAuth: [] },
      { bearerAuth: [] },
    ],
    tags: [
      { name: 'Authentication', description: 'Authentication endpoints' },
      { name: 'Posts', description: 'Blog post management' },
      { name: 'Categories', description: 'Category management' },
      { name: 'Tags', description: 'Tag management' },
      { name: 'Media', description: 'Media upload' },
      { name: 'Health', description: 'Health check' },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Tactyqal Labs API Documentation',
  }));

  // JSON endpoint
  app.get('/api/v1/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};