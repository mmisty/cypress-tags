import { parseInlineTags, removeTagsFromTitle, uniqTags } from 'cy-local/utils/tags';
import GrepTagObject = Mocha.GrepTagObject;

export const origins = () => ({
  originIt: it,
  originItOnly: it.only,
  originItSkip: it.skip,
  originDescribe: describe,
  originOnly: describe.only,
  originSkip: describe.skip,
});

type TestConfig = {
  _testConfig: Cypress.TestConfigOverrides;
};

export const registerTags = () => {
  const showTagsInTitle = () => {
    return Cypress.env('cyTagsShowTagsInTitle') !== undefined
      ? Cypress.env('cyTagsShowTagsInTitle') === 'true' || Cypress.env('cyTagsShowTagsInTitle') === true
      : undefined;
  };

  const originals = origins();

  const parseAll = (testOrSuite: Mocha.Suite | Mocha.Test, res: GrepTagObject[]): GrepTagObject[] => {
    const objTags = (testOrSuite as unknown as TestConfig)._testConfig?.tags;

    const tagsArr = objTags ? (typeof objTags === 'string' ? [objTags] : objTags ?? []) : [];

    const fromConfig = tagsArr.flatMap(t =>
      typeof t === 'string' ? parseInlineTags(t) : t.tag ? [{ info: [], ...t }] : [{ tag: 'unknown type of tag' }],
    );
    const inlineTagsTest = parseInlineTags(testOrSuite.title);
    res = [...res, ...fromConfig, ...inlineTagsTest];

    if (testOrSuite.parent) {
      return parseAll(testOrSuite.parent, res);
    }

    return uniqTags(res);
  };

  const tagsLineForTitle = (tags: GrepTagObject[]): string => {
    const info = (inf: string[] | undefined) => (inf && inf.length > 0 ? `("${inf.join('","')}")` : '');

    return tags.map(t => `${t.tag}${info(t.info)}`).join(' ');
  };

  /**
   * Add tags to title when specific setting
   * @param rootSuite
   * @param setting
   */
  const suiteTitleChange = (rootSuite: Mocha.Suite, setting: { showTagsInTitle?: boolean }) => {
    const suiteTags = parseAll(rootSuite, []);

    rootSuite.title = removeTagsFromTitle(rootSuite.title);

    if (setting.showTagsInTitle && suiteTags.length > 0) {
      const tagsLine = tagsLineForTitle(suiteTags);
      rootSuite.title = `${rootSuite.title} ${tagsLine}`;
    }

    for (const suite of rootSuite.suites) {
      suiteTitleChange(suite, setting);
    }
  };

  const testProcess = (test: Mocha.Test) => {
    test.tags = parseAll(test, []);

    if (showTagsInTitle() === undefined) {
      return;
    }

    const tagsLine = showTagsInTitle() ? tagsLineForTitle(test.tags) : '';
    test.title = removeTagsFromTitle(test.title) + tagsLine;
  };

  function itWithTags(...args: unknown[]): Mocha.Test {
    const test = (originals.originIt as unknown as (...a: unknown[]) => Mocha.Test)(...args);

    // for tests that doesn't have parent suite
    if (test.parent && test.parent.title === '' && !test.parent?.parent) {
      testProcess(test);
    }

    return test;
  }

  function describeWithTags(...args: unknown[]): Mocha.Suite {
    const suite = (originals.originDescribe as unknown as (...a: unknown[]) => Mocha.Suite)(...args);

    // do only for root suite
    if (suite.parent?.title === '') {
      suite.eachTest(st => {
        testProcess(st);
      });
    }

    if (showTagsInTitle() !== undefined) {
      suiteTitleChange(suite, { showTagsInTitle: showTagsInTitle() });
    }

    return suite;
  }

  const handleRetries = () => {
    const runner = (Cypress as any).mocha.getRunner() as Mocha.Runner;

    let prevTest: Mocha.Test | undefined;

    runner
      .on('retry', test => {
        prevTest = test;
      })
      .on('test', (test: Mocha.Test) => {
        if ((test as any)._currentRetry > 0 && prevTest) {
          test.tags = prevTest.tags;
        } else {
          prevTest = undefined;
        }
      });
  };

  type GlobalMochaFunc = {
    describe: unknown;
    it: unknown;
  };

  type GlobalMochaExtensions = {
    describe: { only: unknown; skip: unknown };
    it: { only: unknown; skip: unknown };
  };

  (global as GlobalMochaFunc).describe = describeWithTags;
  (global as GlobalMochaExtensions).describe.only = originals.originOnly;
  (global as GlobalMochaExtensions).describe.skip = originals.originSkip;
  (global as GlobalMochaFunc).it = itWithTags;
  (global as GlobalMochaExtensions).it.only = originals.originItOnly;
  (global as GlobalMochaExtensions).it.skip = originals.originItSkip;

  handleRetries();
};
