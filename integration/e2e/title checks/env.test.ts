import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle  ', () => {
  it('test @tag', function () {
    expect(this.test?.title).eq('test @tag');
  });
});

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle true, tags as object', () => {
  it('test', { tags: ['@tag'] }, function () {
    expect(this.test?.title).eq('test @tag');
  });
});

Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();
describe('cyTagsShowTagsInTitle false', () => {
  it('test @tag', function () {
    expect(this.test?.title).eq('test');
  });
});

Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();
describe('cyTagsShowTagsInTitle false, tags as object', () => {
  it('test', { tags: ['@tag'] }, function () {
    expect(this.test?.title).eq('test');
  });
});

Cypress.env('cyTagsShowTagsInTitle', undefined);
registerTags();
describe('cyTagsKeepTitleAsIs true', () => {
  it('test @tag', function () {
    expect(this.test?.title).eq('test @tag');
  });
});

Cypress.env('cyTagsShowTagsInTitle', undefined);
registerTags();
describe('cyTagsKeepTitleAsIs true', () => {
  it('test', { tags: ['@tag'] }, function () {
    expect(this.test?.title).eq('test');
  });
});
