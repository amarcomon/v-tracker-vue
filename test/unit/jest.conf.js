const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup', 'jest-localstorage-mock'],
  mapCoverage: true,
  modulePathIgnorePatterns: ['src/components/Icons'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/App.vue',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
    '!src/components/Icons/Animated'
  ],
  transformIgnorePatterns: [
    "node_modules/(?!vue2-google-maps)"
  ]
}
