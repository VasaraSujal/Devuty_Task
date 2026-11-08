import app from './src/app.js';
import { config } from './src/config/env.js';

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
  console.log(`📊 Health check: http://localhost:${config.PORT}/api/v1/health`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
});