"use strict";

// import { Router } from 'express';
import { getListFromAPI, getListFromLocal } from './handlers/catfactsHandler.js';
import catFacts from '../services/catfacts.js';

// function to get cat facts from the External API and save them to the database
export async function getFromAPI (req, res, next) {
  try {
    // Call handler to response with data
    const facts = await getListFromAPI();
    if (!facts || facts.length <= 0) {
      return res.status(404).send({
        message: 'No cat facts returned from API'
      });
    }
    // save cat facts to database
    try {
      const addedFacts = facts.map(fact => {
        const newFact = new catFacts(fact);
        newFact.createCatFact();
      })
      return res.status(200).send({
        message: 'Cat facts found',
        data: addedFacts
      });
    } catch(err) {
      console.error(err);
      return res.status(500).send({
        message: 'Error saving cat facts to database',
        error: err
      });
    }
    
  } catch (err) {
    res.status(500).json({
      message: 'Error getting cat facts from API',
      error: err
    });
  }
}

export async function getFromLocal (req, res, next) {
  try {
    // Call handler to response with data
    const facts = await getListFromLocal();
    if (!facts || facts.length <= 0) {
      return res.status(404).send({
        message: 'No cat facts found in local database'
      });
    }

    return res.status(200).send({
      message: 'Cat facts found',
      data: facts
    });
    
  } catch (err) {
    res.status(500).json({
      message: 'Error getting cat facts from local database',
      error: err
    });
  }
}

// to add new Fact to local database
export async function addNewFact(req, res, next) {
  try {
    const newFact = new catFacts(req.body);
    const addedFact = await newFact.createCatFact();
    if (!addedFact || addedFact.length <= 0) {
      return res.status(400).send({
        message: 'Cat fact wasnt added to database'
      });
    }
    return res.status(200).send({
      message: 'Cat fact added',
      data: addedFact
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding cat fact to database',
      error: err
    });
  }
}

