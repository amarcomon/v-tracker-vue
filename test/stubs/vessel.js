const firstVessel = {
  flag: 'Marshall Islands',
  gt: '47000',
  id: '1',
  imoNumber: '123456789',
  mmsi: '987654321',
  name: 'ENSCO DS-2',
  owner: 'o1',
  owners: {
    'o1': true
  },
  reports: {
    'r1': true,
    'r2': true
  },
  yob: '1997',
  maxFo: '0',
  maxDo: '650',
  maxFw: '660',
  lastReport: {
    reportTime: '2018-06-20'
  }
}

const secondVessel = {
  flag: 'Poland',
  gt: '45000',
  id: '2',
  imoNumber: '987654321',
  mmsi: '987654324',
  name: 'ENSCO DS-8',
  owner: 'o2',
  owners: {
    'o2': true
  },
  reports: {
    'r3': true,
    'r4': true
  },
  yob: '2013',
  maxFo: '0',
  maxDo: '650',
  maxFw: '660',
  lastReport: {
    reportTime: '2018-06-10'
  }
}

const vesselCapacities = {
  maxDo: 650,
  maxFo: 0,
  maxFw: 660
}

export { firstVessel, secondVessel, vesselCapacities }
