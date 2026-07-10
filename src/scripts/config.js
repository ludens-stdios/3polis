export default {
  modules: {
    development: {
      abandonmentThreshold: 10,
      abandonChance: 0.1,
      constructionTime: 5,
      upgradeChance: 0.2,
      redevelopChance: 0.05,
    },
    jobs: {
      maxWorkers: 2,
    },
    residents: {
      maxResidents: 2,
      residentMoveInChance: 0.1,
    },
    roadAccess: {
      searchRadius: 3,
    },
  },
  citizen: {
    minWorkingAge: 16,
    retirementAge: 65,
    maxJobSearchRadius: 5,
  },
  vehicle: {
    speed: 0.0005,
    fadeTime: 500, // ms
    maxLifeTime: 10000, // ms
    spawnInterval: 1000, // ms
  },
};
