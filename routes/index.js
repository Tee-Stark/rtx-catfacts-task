"use strict";

import { Router } from "express";

// Import routes
import {
  getFromAPI,
  getFromLocal,
  addNewFact,
  getSingleFact,
  updateFact,
  deleteFact,
} from "./catfacts.js";

const router = Router({
  caseSensitive: true,
});

// Use imported routes in router
router.get("/fromSource", getFromAPI);  //get facts list from external API
router.get("/fromLocal", getFromLocal); // get facts list from local DB
router.post("/add", addNewFact);    // add new fact to local DB
router.get("/:id", getSingleFact);  // get single fact from local DB
router.put("/:id", updateFact);     // update single fact in local DB
router.delete("/:id", deleteFact);  // delete single fact from local DB

export default router;
