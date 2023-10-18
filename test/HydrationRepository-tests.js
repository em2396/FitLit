import { expect } from "chai";

import { getAvgDailyOunces } from '../src/hydrationFunctions';
import userSample from "../src/data/sampleData";

describe('getAvgDailyOunces', () => {
  let userId;
  let dataList;

  beforeEach(() => {
    userId = 1;
    dataList = [
      {
        userID: 1,
        date: '2023/03/23',
        numOunces: 28,
      },
      {
        userID: 1,
        date: '2023/03/24',
        numOunces: 50,
      },
      {
        userID: 1,
        date: '2023/03/25',
        numOunces: 30,
      },
    ];
  });

  it('calculates the average daily water intake correctly', () => {
    const result = getAvgDailyOunces(userId, dataList);
    expect(result).to.equal(36); // This is the expected average for the provided data.
  });
});