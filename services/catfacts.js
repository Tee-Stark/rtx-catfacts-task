
import db from '../data/db';

export default class CatFacts {
    constructor(catFact) {
      this.object_id = String(catFact._id);
      this.user = String(catFact.user);
      this.source = catFact.source;
      this.originally_created = String(catFact.createdAt);
      this.last_updated = String(catFact.updatedAt);
      this.deleted = catFact.deleted;
      this.used = catFact.used;
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
          deleted: this.deleted,
          used: this.used,
          text: this.text
        }
        if(catFactObj !== null) {
          // check if fact already exists in database
          const checkExists = await db('cat_facts').where({ object_id: catFactObj.object_id }).first();
          if(!checkExists || checkExists === null) { // if fact does not exist in database
            const catFact = await db('cat_facts').insert(catFactObj, "id");
            console.log(catFact);
            return await db('cat_facts').where({id: catFact}).first();
          } else {
            return { 'error': 'Cat fact already exists' };
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
        const catFact = await db('cat_facts').where({ object_id: id }).first();
        if(catFact !== null) {
          return catFact;
        } else {
          return { 'error': 'Cat fact does not exist' };
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    }
    // update cat fact in local database
    static async updateFact(id, updates) {
      try {
        const checkExists = await db('cat_facts').where({ id }).first();
        if(checkExists) {
          const catFact = await db('cat_facts').where({ id }).update(updates, 'id');
          return await db('cat_facts').where({id: catFact}).first();
        }
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    }
  
    // delete cat fact from local database
    static async deleteFact(id) {
      try {
        const catFact = await db('cat_facts').where({ id }).first();
        if(catFact !== null) {
          const deleted = await db('cat_facts').where({ id }).del();
          return deleted;
        } else {
          return { 'error': 'Cat fact does not exist' };
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    }

  }
  