import {
  kanjiToNumber,
  makeJapaneseSquare,
  makeNumberSquare,
  numberToKanji,
  parseJapaneseSquare,
} from '../../src/notation/notationUtil';
import { parseSquare } from '../../src/util';

test('parse kif square', () => {
  expect(parseJapaneseSquare('11')).toEqual(parseSquare('1a'));
  expect(parseJapaneseSquare('１一')).toEqual(parseSquare('1a'));
  expect(parseJapaneseSquare('66')).toEqual(parseSquare('6f'));
  expect(parseJapaneseSquare('６六')).toEqual(parseSquare('6f'));
  expect(parseJapaneseSquare('99')).toEqual(parseSquare('9i'));
  expect(parseJapaneseSquare('９九')).toEqual(parseSquare('9i'));
});

test('make kif destination square', () => {
  expect(makeJapaneseSquare(parseSquare('1a'))).toEqual('１一');
  expect(makeJapaneseSquare(parseSquare('6f'))).toEqual('６六');
  expect(makeJapaneseSquare(parseSquare('9i'))).toEqual('９九');
});

test('make kif origination square', () => {
  expect(makeNumberSquare(parseSquare('1a'))).toEqual('11');
  expect(makeNumberSquare(parseSquare('6f'))).toEqual('66');
  expect(makeNumberSquare(parseSquare('9i'))).toEqual('99');
});

test('all squares, kanji to number and back', () => {
  for (let i = 0; i < 81; i++) {
    expect(parseJapaneseSquare(makeJapaneseSquare(i))).toEqual(i);
    expect(parseJapaneseSquare(makeNumberSquare(i))).toEqual(i);
  }
});

test('number to kanji', () => {
  expect(numberToKanji(1)).toEqual('一');
  expect(numberToKanji(10)).toEqual('十');
  expect(numberToKanji(15)).toEqual('十五');
  expect(numberToKanji(20)).toEqual('二十');
  expect(numberToKanji(99)).toEqual('九十九');
});

test('kanji to number', () => {
  expect(kanjiToNumber('一')).toEqual(1);
  expect(kanjiToNumber('十')).toEqual(10);
  expect(kanjiToNumber('十五')).toEqual(15);
  expect(kanjiToNumber('二十')).toEqual(20);
  expect(kanjiToNumber('九十九')).toEqual(99);
});

test('1 to 99, kanji to number and back', () => {
  for (let i = 1; i < 100; i++) {
    expect(kanjiToNumber(numberToKanji(i))).toEqual(i);
  }
});