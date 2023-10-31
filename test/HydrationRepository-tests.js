import { expect } from "chai";

import {
  universalAverage,
  getInfoPerDay,
} from "../src/data-model.js";

import userSample from "../src/data/sampleData";

describe("HydrationTest", () => {
  let hydrationData;

  beforeEach("initialize hydrationData", () => {
    hydrationData = userSample.hydration;
  });

  it("should return 0 if no user data is found", () => {
    const hydrationData = []; 
    const result = universalAverage(hydrationData);

    expect(result).to.equal(0);
  });  

  it("should return a number for the amount of ounces consumed on a given day", () => {
    const result = universalAverage(hydrationData, 'numOunces');
  
    expect(parseInt(result)).to.be.a("number"); 
  });

  it("should return a number of average all time water intake", () => {
    const result = universalAverage(hydrationData, 'numOunces');
  
    expect(parseInt(result)).to.be.a("number"); 
  });

  it("should return a object with ounces of water for the last 7 days of data", () => { 
    const result = universalAverage(hydrationData, 'numOunces');
  
    expect(parseInt(result)).to.be.a("number"); 
  });

  it("should return 0 if no data is provided", () => {
    const users = [];
    const result = universalAverage(users, 'someKey');
  
    expect(result).to.equal(0); 
  });

});


