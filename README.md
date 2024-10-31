# Make10 2.0
<img src="https://github.com/cijb-7724/make10_2.0/blob/main/public/preview.png" alt="preview" />

[ここ](https://cijb-7724.github.io/make10_2.0/)で遊べます.

### 通常のMake10
車のナンバーなどの4つの数字を使って，四則演算や順序の並び替え，括弧を使った優先順位付けを行い，10を作るゲーム．

## 工夫したポイント
- 数字を4つだけでなく，**6つ**まで選択可能にした
- 四則演算に加えて，**対数**や**指数**の演算を追加した
- 使用可能な演算子を選択できる機能を追加した
- 数字の**並び替えを選択式**にした
- **目標値を10以外**にも設定できるように拡張した

## 計算量
- 使用する数字の種類: n
- 使用する演算子の種類: k
- 並び替え: 可能

という問題設定を考える．最初に数字の順番を全通り試して($n!$)，数字の間に演算子を挿入する($k^{n-1}$)．計算の優先順位は(n-1)通りある．1回計算を進めた後は再度計算の優先順位が(n-2)通りあるだけであるので，全体の計算量は，O $($ $n!$ $(n-1)!$ $k^{n-1}$ $)$となる．

[実装](https://github.com/cijb-7724/make10_2.0/blob/main/src/utils/solve.ts#L19-L73)
