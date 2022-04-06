"use strict";

import { Router } from 'express';
import { getListFromAPI } from './handlers/catfactsHandler';
import db from '../data/db'

const router = Router();

// function to get cat faacts from the External API and save them to the database
router.get('/fromSource', async (req, res, next) => {
  try {
    // Call handler to response with data
    const facts = await getListFromAPI();
    if (!facts || facts.length <= 0) {
      return res.status(404).send({
        message: 'No cat facts found'
      });
    }

    return res.status(200).send({
      message: 'Cat facts found',
      data: facts
    });
  } catch (err) {
    next(err);
  }
});

export default router;
