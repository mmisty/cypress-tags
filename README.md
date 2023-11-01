# Cypress-tags

This plugin helps to parse tags to add them into Mocha Test object so you can access tags in all hooks and inside a test

Example: 
```javascript
    it('test with tags @test', { tags: ['@abc'] }, function () {
      // this.test?.tags object has all tags
      expect(this.test?.tags).to.deep.eq([
        { tag: '@abc', info: [] },
        { tag: '@test', info: [] },
      ]);
    });
```

There are several ways to input tags: 
 - inline tags - just add them into test or suite title (ex `@simple`, `@tag("info")`)
 - cypress configuration object:
   - `it('test with tags', { tags: ['@abc'] }, function () {...`
 - cypress configuration object may have also string type and also parsed tag type: 
   - `it('test with tags', { tags: '@abc' }, function () {...`
   - `it('test with tags', { tags: [{tag: '@abc', info: ['my info'] }] }, function () {...`

## Installation / setup

1. install
Install by 
`npm i -D @mmisty/cypress-tags`

or with yarn
`yarn add @mmisty/cypress-tags -D`

2. configure project

Put into your support.ts (or e2e.ts) file
```javascript
import '@mmisty/cypress-tags'
```
3. types should be added automatically
