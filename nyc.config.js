const reportDir = process.env.COVERAGE_REPORT_DIR ?? 'coverage-nyc';
const tempDir = process.env.COVERAGE_TEMP ?? 'reports/.nyc_output';

module.exports = {
  all: true,
  cache: false,
  reporter: ['json', 'lcov', 'text', 'cobertura', 'clover'],
  include: ['src/**'],
  exclude: [
    'src/cypress',
    'src/mocha',
    'src/common/types.ts',
    'src/common/types.js',
    '*.types.ts',
    'types.ts',
    'tests',
    'reports',
    'lib',
    'integration',
  ],
  sourceMap: false,
  instrument: false,
  'report-dir': reportDir,
  'temp-dir': tempDir,
  branches: 80,
  lines: 60,
  functions: 60,
  statements: 80,
};
