import { expect } from "chai";

import { getAvgDailyOunces, getOuncesPerDay, getDataPerWeek, getLatestData } from '../src/hydrationFunctions';
import userSample from "../src/data/sampleData";

describe('HydrationTest', () => {
  let hydrationData;

  beforeEach('initialize hydrationData', () => {
    hydrationData = userSample.hydration;
  });

  it("should return a user's average fluid ounces consumed per day for all time", () => {
    expect(getAvgDailyOunces(1, hydrationData)).to.equal(45);
  });

  it('should return 0 if no user data is found', () => {
    const testDataList = [];
    const userId = 1; 
    const result = getAvgDailyOunces(userId, testDataList);

    expect(result).to.equal(0);
  });

  it("should return a number for the amount of ounces a user has consumed on a specific day", () => {
    const userObj = userSample.sampleUsers[0]; 
    const specificDate = '2023/03/24'; 
    const result = getOuncesPerDay(userObj, hydrationData, specificDate);

    expect(result).to.be.a('number'); 
  });

    it("should return 0 if no user data is found for that date", () => {
    const userObj = userSample.sampleUsers[0];
    const specificDate = '2023/03/25'; 
    const result = getOuncesPerDay(userObj, hydrationData, specificDate);

    expect(result).to.equal(0); 
  });

  it("should return an array with ounces of water for the last 7 days of data", () => {
    const startDate = '2023/03/25'; 
    const result = getDataPerWeek(hydrationData, startDate);

    expect(result).to.be.an('array'); 
  });

});