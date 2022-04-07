'use strict'

import fetch from "node-fetch";
import config from '../../config.js';
import db from '../../data/db.js';

 // Get all cat facts from External API
 export async function getListFromAPI() {
  const path = '/facts';

  const res = await fetch(`${config.source.url}${path}?animal_type=cat,amount=5`, { // make a request to source api for 5 different cat facts
    compress: true,
    timeout: 60e3, // 60s timeout as default
    follow: 0,
    headers: {
      'content-type': 'application/json'
    }
  }).catch(err => {
    console.log('Some error!');
    throw err
  })
  // Return response from external API in JSON format
  return await res.json();
}

 // Get all cat facts from local database
 export async function getListFromLocal() {
  try {
    const facts = await db('cat_facts').select('*');
    if(facts !== null && facts.length > 0) {
      console.log(facts);
      return facts;
    } else {
      return { 'error': 'No cat facts found' };
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  } 
}
