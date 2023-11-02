import { expect } from "chai";

import { getRandomUser, getUserData } from "../src/data-model.js";

import userSample from "../src/data/sampleData";

describe("getRandomUser", () => {
  let users = userSample.sampleUsers;

  beforeEach(() => {
    users = userSample.sampleUsers;
  });

  it("should return a random user index", () => {
    const randomIndex = getRandomUser(users);

    expect(randomIndex).to.be.a("number");
    expect(randomIndex).to.be.at.least(0);
    expect(randomIndex).to.be.at.most(users.length - 1);
  });

  it("should return a random user object from the array", () => {
    const randomIndex = getRandomUser(users);
    const randomUser = userSample.sampleUsers[randomIndex];

    expect(users).to.deep.include(randomUser);
  });
});

describe("getUserData", () => {
  it("should return user data based on index position", () => {
    const indexPosition = 1;
    const userData = getUserData(userSample.sampleUsers, indexPosition);
    const expectedUserData = {
      id: 2,
      name: "Tyreek VonRueden",
      address: "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
      email: "Nicolette_Halvorson43@yahoo.com",
      dailyStepGoal: 9000,
      friends: [13, 19, 3],
      firstName: "Tyreek",
    };
    expect(userData).to.deep.equal(expectedUserData);
  });

  it("should return null for an invalid index position", () => {
    const indexPosition = -1;
    const userData = getUserData(userSample.sampleUsers, indexPosition);

    expect(userData).to.equal(null);
  });

  it("should return null for an empty user data array", () => {
    const indexPosition = 0;
    const userData = getUserData([], indexPosition);

    expect(userData).to.equal(null);
  });
});
