import { GrepTagObject } from '../common/types';

const regexTagsNoReasons = '(@[^@ ()"\']+)';
const regexDiffQuotes = ['"', "'"].map(t => `(@[^@ ]+\\(${t}[^@${t}]+${t}(?:,\\s*${t}[^@${t}]+${t})*\\))`);
const tagsRegex = new RegExp(`${regexDiffQuotes.join('|')}|${regexTagsNoReasons}`, 'g');

export const uniqTags = (arr: GrepTagObject[]): GrepTagObject[] => {
  const stringifyTagObj = (o: GrepTagObject) => {
    return JSON.stringify({
      tags: o.tag,
      info: o.info,
    });
  };

  return arr.filter((obj, index, self) => {
    const indexCurrent = self.map(s => stringifyTagObj(s)).indexOf(stringifyTagObj(obj));

    return indexCurrent === index;
  });
};

export const parseInlineTags = (title: string): GrepTagObject[] => {
  return parseTags(title).map(t => ({ ...t, tag: t.tag.startsWith('@') ? t.tag : `@${t.tag}` }));
};

export const removeTagsFromTitle = (str: string): string => {
  let resultStr = str;
  const found = str?.match(tagsRegex);

  if (found != null) {
    // eslint-disable-next-line no-return-assign
    found.forEach(p => (resultStr = resultStr.replace(p, '')));
  }

  return resultStr.replace(/\s\s*/g, ' ').trim();
};

const searchParams = [
  {
    sym: "'",
    map: '%27',
  },
];

const encodeDecode = (str: string, isEncode: boolean) => {
  let newStr = str;

  searchParams.forEach(
    // eslint-disable-next-line no-return-assign
    t => (newStr = newStr.replace(new RegExp(`${isEncode ? t.sym : t.map}`, 'g'), isEncode ? t.map : t.sym)),
  );

  return newStr;
};

export const encodeTagInfo = (str: string) => encodeDecode(encodeURIComponent(str), true);
export const decodeTagInfo = (str: string) => encodeDecode(decodeURIComponent(str), false);

export const parseOneTag = (tg: string): GrepTagObject => {
  const reasons: string[] = [];
  let tagResult = '';
  const regexpReasons = /\((.*)\)$/;
  const regexpTag = /^@([^(@]+)(?:\(|$)/;
  const reasonsMatch = tg.match(regexpReasons);

  if (reasonsMatch != null) {
    reasons.push(
      ...reasonsMatch[1]
        .split(',')
        .map(p => p.replace(/^\s*"([^"]*)"\s*$/, '$1'))
        .map(p => p.replace(/^\s*'([^']*)'\s*$/, '$1'))
        .map(k => decodeTagInfo(k)),
    );
  }
  const tagMatch = tg.match(regexpTag);

  if (tagMatch != null) {
    // eslint-disable-next-line prefer-destructuring
    tagResult = tagMatch[1];
  }

  return {
    tag: tagResult,
    info: reasons,
  };
};

export const parseTags = (str: string): GrepTagObject[] => {
  const tags: GrepTagObject[] = [];
  const found = str?.match(tagsRegex);

  if (found != null) {
    tags.push(...found.map(p => parseOneTag(p)));
  }

  return tags;
};

/**
 * Helper function to create tag with info, returns string
 * @param name tag name ex 'my'
 * @param info params array  ex
 * tag('@my', 'Issue1'); // creates '@my("Issue1")'
 *
 * info then can be used in scope of test
 * @example
 *
 * it('test', { tags: [ tag('issue', 'example of info') ] }, function () {
 *   const infoForIssue = this.test?.tags?.find(t => t?.tag === 'issue')?.info ?? '';
 *   cy.log(`${infoForIssue}`);
 * });
 */
export const tag = (name: string, ...info: string[]): string => {
  const encodedReasons = info.map(inf => encodeTagInfo(inf));
  const reasonsSeparatedByComma = encodedReasons.map(r => `"${r}"`).join(',');
  const reasonsStr = encodedReasons.length > 0 ? `(${reasonsSeparatedByComma})` : '';

  return `@${name}${reasonsStr}`;
};
