import db from "../data/db.js";
import fetch from "node-fetch";
import config from "../config.js";
export default class CatFacts {
  // construct new cat fact object using data from external API
  constructor(catFact) {
    this.object_id = String(catFact._id) || "null";
    this.user = String(catFact.user);
    this.source = catFact.source;
    this.originally_created = String(catFact.createdAt || new Date().toISOString());
    this.last_updated = String(catFact.updatedAt || new Date().toISOString());
    this.deleted = catFact.deleted || false;
    this.used = catFact.used || false;
    this.text = catFact.text;
  }

  // Create a new cat fact in local database
  async createCatFact() {
    try {
      const catFactObj = {
        object_id: this.object_id,
        user: this.user,
        source: this.source,
        originally_created: this.originally_created,
        last_updated: this.last_updated,
        text: this.text,
      };
      if (catFactObj !== null) {
        // check if fact already exists in database
        const checkExists = await db("cat_facts")
          .where({ text: catFactObj.text });
        // console.log(checkExists)
        if (!checkExists || checkExists[0] === undefined) {
          // if fact does not exist in database
          const id = await db("cat_facts").insert(catFactObj, "id");
          // console.log(id);
          return await db("cat_facts").where({ id: id[0] }).first();
        } else {
          console.log("Fact already exists");
          return { error: "Cat fact already exists" };
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  // get a single fact from local database
  static async getFactFromLocal(id) {
    try {
      const catFact = await db("cat_facts").where({ id }).first();
      if (catFact !== undefined) {
        return catFact;
      } else {
        return { error: "Cat fact does not exist" };
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  // update cat fact in local database
  static async updateFact(id, updates) {
    try {
      const checkExists = await db("cat_facts").where({ id }).first();
      if (checkExists) {
        const catFact = await db("cat_facts")
          .where({ id })
          .update(updates, "id");
        return await db("cat_facts").where({ id: catFact[0] }).first();
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  // delete cat fact from local database
  static async deleteFact(id) {
    try {
      const catFact = await db("cat_facts").where({ id }).first();
      if (catFact !== null) {
        const deleted = await db("cat_facts").where({ id }).del();
        return deleted;
      } else {
        return { error: "Cat fact does not exist" };
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  /***************************************************
   * Getting All Facts From both local and External API
   ****************************************************/
  // Get 5 facts from external API
  static async getListFromAPI() {
   const path = '/facts';
 
   const res = await fetch(`${config.source.url}${path}?animal_type=cat,amount=5`, { // make a request to source api for 5 different cat facts
     compress: true,
     timeout: 60e3, // 60s timeout as default
     follow: 0,
     headers: {
       'content-type': 'application/json'
     }
   }).catch(err => {
     console.error(err);
     throw err
   })
   // Return response from external API in JSON format
   return await res.json();
 }

  // Get all cat facts from local database
  static async getListFromLocal() {
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

}
