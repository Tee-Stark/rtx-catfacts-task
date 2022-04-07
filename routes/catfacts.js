"use strict";

import catFacts from '../services/catfacts.js';

// controller to get cat facts from the External API and save them to the database
export async function getFromAPI (req, res, next) {
  try {
    // Call handler to response with data
    const facts = await catFacts.getListFromAPI();
    if (facts.error || facts.length <= 0) {
      return res.status(404).send({
        message: 'No cat facts returned from API'
      });
    }
    // save cat facts to database
    try {
      const alreadyExists = []; // an array to keep track of cat facts that already exist in the database
      const addedFacts = facts.map(async fact => {
        const newFact = new catFacts(fact);
        await newFact.createCatFact();
        if (newFact.error) {
          alreadyExists.push(newFact.error);
        }
      })
      // ensure that all facts were saved, and return the saved facts
      if(addedFacts.length > 0 && addedFacts.length === facts.length && !addedFacts[0].error) {
        return res.status(200).send({
          message: 'Cat facts found and saved to database',
          data: addedFacts
        });
      } else if (alreadyExists.length > 0) {
        return res.status(400).send({
          message: 'one or more cat facts already exist in the database',
          error: addedFacts[0].error
        });
      } else {
        return res.status(500).send({
          message: 'Unable to save cat facts to database from API',
        });
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send({
        message: 'Error saving cat facts to database',
        error: err.message
      });
    }
    
  } catch (err) {
    res.status(500).json({
      message: 'Error getting cat facts from API',
      error: err.message
    });
  }
}

// controller to get cat facts from the database
export async function getFromLocal (req, res, next) {
  try {
    // Call handler to response with data
    const facts = await catFacts.getListFromLocal();
    if (facts.error || facts.length <= 0) {
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
      error: err.message
    });
  }
}

// to add new Fact to local database
export async function addNewFact(req, res, next) {
  try {
    const newFact = new catFacts(req.body);
    const addedFact = await newFact.createCatFact();
    if (addedFact.error || addedFact.length <= 0) {
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
      error: err.message
    });
  }
}

// to get single fact from local database
export async function getSingleFact(req, res, next) {
  try {
    const id = req.params.id;
    const fact = await catFacts.getFactFromLocal(id);
    if (fact.error) {
      return res.status(404).send({
        message: 'No cat fact with this id found in local database'
      });
    }
    return res.status(200).send({
      message: 'Cat fact returned successfully',
      data: fact
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error getting cat fact from local database',
      error: err.message
    });
  }
}

// to update cat fact in local database
export async function updateFact(req, res, next) {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedFact = await catFacts.updateFact(id, updates);
    if (!updatedFact || updatedFact.length <= 0) {
      return res.status(404).send({
        message: 'Cat fact does not exist in local database'
      });
    }
    return res.status(200).send({
      message: 'Cat fact updated successfully',
      data: updatedFact
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating cat fact in local database',
      error: err.message
    });
  }
}

// to delete cat fact from local database
export async function deleteFact(req, res, next) {
  try {
    const id = req.params.id;
    const deletedFact = await catFacts.deleteFact(id);
    if (deletedFact.error || deletedFact.length <= 0) {
      return res.status(404).send({
        message: 'Cat fact does not exist in local database'
      });
    }
    return res.status(200).send({
      message: 'Cat fact deleted successfully',
      data: deletedFact
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting cat fact from local database',
      error: err.message
    });
  }
}