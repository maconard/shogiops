import { perft } from '../src/debug';
import { parseSfen } from '../src/sfen';
import { Rules } from '../src/types';
import { IllegalSetup } from '../src/variant/position';

const variantPerfts: [Rules, string, number, number][] = [
  ['minishogi', 'rbsgk/4p/5/P4/KGSBR b - 1', 1, 14],
  ['minishogi', 'rbsgk/4p/5/P4/KGSBR b - 1', 2, 181],
  ['minishogi', 'rbsgk/4p/5/P4/KGSBR b - 1', 3, 2512],
  ['minishogi', 'rbsgk/4p/5/P4/KGSBR b - 1', 4, 35401],
  ['minishogi', 'rbsgk/4p/5/P4/KGSBR b - 1', 5, 533203],
];

test.each(variantPerfts)('variant perft: %s (%s): %s', (rules, sfen, depth, res) => {
  const pos = parseSfen(rules, sfen).unwrap();
  expect(perft(pos, depth, false)).toBe(res);
});

test('minishogi checkmate', () => {
  const pos = parseSfen('minishogi', 'r1s1k/2b1g/5/r1G1B/KPS2 b p').unwrap();
  expect(pos.isCheckmate()).toBe(true);
});

test('roles outside variant', () => {
  const r1 = parseSfen('minishogi', '2k2/2p2/2l2/2P2/2K2 b - 1', true);
  expect(
    r1.unwrap(
      _ => undefined,
      err => err.message
    )
  ).toEqual(IllegalSetup.InvalidPieces);
});
