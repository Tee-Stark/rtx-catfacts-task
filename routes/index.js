'use strict'

import { Router } from 'express';

// Import routes
import { getFromAPI } from './catfacts.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.get('/fromSource', getFromAPI);

export default router;