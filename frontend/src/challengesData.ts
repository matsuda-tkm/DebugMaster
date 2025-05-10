// challengesData.ts
export interface TestCase {
  input: any[];
  expected: any;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  image: string;
  languages: string[];
  instructions: string;
  examples: string;
  video: string;
  testCases: TestCase[];
}

export const challengesData: Challenge[] = [
  {
    id: 'say-age',
    title: 'あなたの年齢を教えてね',
    description:
      '年齢（整数）を入力として受け取り、「あなたは◯歳ですね！」というメッセージを返す関数を作成します。入力と出力の基本を学びます。',
    difficulty: '初級',
    image:
      'images/Debug_Master.jpeg?auto=format&fit=crop&w=800&q=80',
    languages: ['Python'],
    instructions: `整数 \`age\` を入力として受け取り、「あなたは◯歳ですね！」という形式の文字列を返す関数 \`say_age\` を作成してください。
  
  【仕様】
  ・ 入力は0以上の整数（例: 12, 25 など）
  ・ 出力は「あなたは◯歳ですね！」という文章
  ・ ◯の部分に入力された数値が入ります`,
    examples: `
  例1:
  入力: 10
  出力: "あなたは10歳ですね！"
  
  例2:
  入力: 0
  出力: "あなたは0歳ですね！"
    `,
    video: '/videos/say-age.mp4',
    testCases: [
      { input: [8], expected: "あなたは8歳ですね！" },
      { input: [13], expected: "あなたは13歳ですね！" },
      { input: [0], expected: "あなたは0歳ですね！" }
    ]
  },
  {
    id: 'favorite-food',
    title: '好きな食べ物を教えてね',
    description:
      '好きな食べ物の名前を入力として受け取り、「あなたの好きな食べ物は◯◯ですね！」というメッセージを返す関数を作成します。',
    difficulty: '初級',
    image:
      'images/Debug_Master.jpeg?auto=format&fit=crop&w=800&q=80',
    languages: ['Python'],
    instructions: `文字列 \`food\` を入力として受け取り、「あなたの好きな食べ物は◯◯ですね！」という形式の文字列を返す関数 \`favorite_food_message\` を作成してください。
  
  【仕様】
  ・ 入力は食べ物の名前（例: "カレー", "りんご" など）
  ・ 出力は必ず「あなたの好きな食べ物は◯◯ですね！」という文章
  ・ ◯◯の部分には入力された文字列がそのまま入ります`,
    examples: `
  例1:
  入力: "カレー"
  出力: "あなたの好きな食べ物はカレーですね！"
  
  例2:
  入力: "いちご"
  出力: "あなたの好きな食べ物はいちごですね！"
    `,
    video: '/videos/favorite-food.mp4',
    testCases: [
      { input: ["カレー"], expected: "あなたの好きな食べ物はカレーですね！" },
      { input: ["りんご"], expected: "あなたの好きな食べ物はりんごですね！" },
      { input: ["すし"], expected: "あなたの好きな食べ物はすしですね！" }
    ]
  },
  {
    id: 'apple-basket',
    title: 'りんごをカゴに入れよう',
    description:
      'りんごの数を入力として受け取り、「カゴに◯個のりんごがあります」という文字列を返す関数を作成します。変数と出力の基本を学びます。',
    difficulty: '初級',
    image:
      'images/Debug_Master.jpeg?auto=format&fit=crop&w=800&q=80',
    languages: ['Python'],
    instructions: `整数 \`n\` を入力として受け取り、「カゴにn個のりんごがあります」という文字列を返す関数 \`apple_message\` を作成してください。
  
  【仕様】
  ・ n は 0 以上の整数とします。
  ・ 戻り値は「カゴに◯個のりんごがあります」という形式の文字列です。
  ・ 例: n = 3 → "カゴに3個のりんごがあります"`,
    examples: `
  例1:
  入力: 2
  出力: "カゴに2個のりんごがあります"
  
  例2:
  入力: 0
  出力: "カゴに0個のりんごがあります"
    `,
    video: '/videos/apple-basket.mp4',
    testCases: [
      { input: [1], expected: "カゴに1個のりんごがあります" },
      { input: [5], expected: "カゴに5個のりんごがあります" },
      { input: [0], expected: "カゴに0個のりんごがあります" }
    ]
  },
  {
    id: 'sum-n',
    title: '1からnまでの整数の合計',
    description:
      '整数 n を入力として受け取り、1からnまでの整数の合計を計算して返す関数を作成します。n が0の場合は 0 を返すことに注意してください。',
    difficulty: '初級',
    image:
      'images/sum_character.png?auto=format&fit=crop&w=800&q=80',
    languages: ['Python'],
    instructions: `整数 n を入力として受け取り、1からnまでの整数の合計を計算する関数を実装してください。
  
  【仕様】
  ・ n は 0 以上の整数
  ・ n が 0 の場合は 0 を返す
  ・ 例: n = 10 の場合、1 + 2 + ... + 10 = 55 となる`,
    examples: `
  例1:
  入力: 1
  出力: 1
  
  例2:
  入力: 5
  出力: 15
    `,
    video: "/videos/sum-n.mp4",
    testCases: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [2], expected: 3 },
      { input: [3], expected: 6 },
      { input: [5], expected: 15 },
      { input: [10], expected: 55 },
      { input: [20], expected: 210 },
      { input: [50], expected: 1275 },
      { input: [100], expected: 5050 }
    ]
  },
  {
    id: 'reverse-string',
    title: '文字列の逆順',
    description:
      '入力された文字列を逆順に並べ替えて返す関数を作成します。空文字の場合は空文字を返してください。',
    difficulty: '初級',
    image:
      'images/reverse_character.png?auto=format&fit=crop&w=800&q=80',
    languages: ['Python'],
    instructions: `文字列 s を入力として受け取り、s の文字順序を逆にした新しい文字列を返す関数を実装してください。
  
  【仕様】
  ・ s は任意の文字列
  ・ 空文字の場合は空文字を返す
  ・ 例: s = "olleH" の場合、"Hello" を返す`,
    examples: `
  例1:
  入力: "gubeD"
  出力: "Debug"

    `,
    video: "/videos/reverse-string.mp4",
    testCases: [
      { input: ["ehT"], expected: "The" },
      { input: ["drowyek"], expected: "keyword" },
      { input: ["si"], expected: "is" },
      { input: ["piks"], expected: "skip" },
    ]
  },
  {
    id: 'list-conditional-transformation',
    title: 'リスト操作: 条件付き変換',
    description:
      'リスト内の正の整数を条件に基づき変換する関数をデバッグします。正の偶数はそのまま、正の奇数は3倍にし、負の数、0、非整数は無視する仕様です。',
    difficulty: '中級',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2728&ixlib=rb-4.0.3',
    languages: ['Python'],
    instructions: `整数のリストを入力として受け取り、各要素について以下の処理を行う関数を作成してください。

・ 正の偶数 → そのまま出力
・ 正の奇数 → 3倍して出力
・ 負の数、0、非整数 → 無視

結果は、元のリストの順序を保った新しいリストとして返してください。`,
    examples: `
例1:
入力: [1, 2, -3, 4, 5, 0, 3.5]
出力: [3, 2, 4, 15]

例2:
入力: []
出力: []
    `,
    video: "/videos/list-conditional-transformation.mp4",
    testCases: [
      { input: [[1, 2, -3, 4, 5, 0, 3.5]], expected: [3, 2, 4, 15] },
      { input: [[-1, -2, 0, 2]], expected: [2] },
      { input: [[7, 8, 9]], expected: [21, 8, 27] },
      { input: [[3.14, 2.71]], expected: [] },
    ],
  },
  {
    id: 'nested-dictionary-update',
    title: '辞書操作: ネスト辞書の更新',
    description:
      'ネストされた辞書内の "target" キーを検出し、その値が数値の場合は2倍に更新する関数のデバッグ問題です。再帰的な辞書探索が必要となるため、LLMが処理の流れを誤解しやすい内容です。',
    difficulty: '難しい',
    image:
      'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    languages: ['Python'],
    instructions: `辞書を入力として受け取り、任意の深さでネストされた辞書の中から、キー "target" が存在し、かつその値が数値の場合に、その値を2倍にしてください。
その他の部分は変更せず、元の構造を保持して返す関数を作成してください。`,
    examples: `
例:
入力: {
  "a": {"target": 3, "other": 1},
  "b": {"target": 5},
  "c": 7,
  "d": {"nested": {"target": 10}}
}
出力: {
  "a": {"target": 6, "other": 1},
  "b": {"target": 10},
  "c": 7,
  "d": {"nested": {"target": 20}}
}
    `,
    video: "/videos/nested-dictionary-update.mp4",
    testCases: [
      {
        input: [{ a: { target: 3, other: 1 }, b: { target: 5 }, c: 7 }],
        expected: { a: { target: 6, other: 1 }, b: { target: 10 }, c: 7 },
      },
      {
        input: [{ x: { y: { target: 4 } }, z: { target: 'non-numeric' } }],
        expected: { x: { y: { target: 8 } }, z: { target: 'non-numeric' } },
      },
      { input: [{}], expected: {} },
      {
        input: [{ target: 4, nested: { target: 7, deeper: { target: 1.5 } } }],
        expected: { target: 8, nested: { target: 14, deeper: { target: 3.0 } } },
      },
      {
        input: [{ a: { target: -3 }, b: { nested: { target: 0 } } }],
        expected: { a: { target: -6 }, b: { nested: { target: 0 } } },
      },
      {
        input: [{ a: { b: 1 }, c: { d: 2 } }],
        expected: { a: { b: 1 }, c: { d: 2 } },
      },
      {
        input: [{ a: { target: 1, b: { target: 2, c: { target: 3 } } } }],
        expected: { a: { target: 2, b: { target: 4, c: { target: 6 } } } },
      }
    ],
  },
  {
    id: 'api-json-fetch',
    title: 'API統合: JSONデータ取得と検証',
    description:
      'requestsライブラリを使って、https://httpbin.org のエンドポイントからJSONデータを取得し、レスポンス内の "args" オブジェクトにある "data" キーの値を抽出する関数をデバッグします。HTTPステータスコードやタイムアウト、エラーハンドリングの落とし穴に注意してください。',
    difficulty: '難しい',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2668&ixlib=rb-4.0.3',
    languages: ['Python'],
    instructions: `requestsライブラリを使用して、指定されたURLからJSONデータを取得してください。

仕様は以下の通りです：
・ レスポンスのHTTPステータスコードが200の場合、レスポンスJSON内の "args" オブジェクトを確認し、その中に "data" キーが存在するかチェックする。
・ "data" キーが存在する場合、その値はJSON文字列になっているので、これをパースして元のオブジェクトとして返すこと。
・ HTTPステータスコードが200以外、または "data" キーが存在しない場合は文字列"Error"を返すこと。`,
    examples: `
例:
入力: "https://httpbin.org/anything?data={'id':1,'name':'Alice'}"
出力: {"id": 1, "name": "Alice"}
    `,
    video: "/videos/api-json-fetch.mp4",
    testCases: [
      {
        input: ["https://httpbin.org/anything?data={\"id\":1,\"name\":\"Alice\"}"],
        expected: { id: 1, name: "Alice" },
      },
      {
        // URLに "data" キーが含まれない場合
        input: ["https://httpbin.org/anything?info={\"id\":2}"],
        expected: "Error",
      },
      {
        // HTTPステータスコードが200以外の場合（例: 404）
        input: ["https://httpbin.org/status/404?data={\"id\":3,\"name\":\"Bob\"}"],
        expected: "Error",
      },
      {
        // "data" キーが存在するが、JSONとしてパース不可能な場合
        input: ["https://httpbin.org/anything?data=invalid_json"],
        expected: "Error",
      },
      {
        // "data" キーの値が空のJSON文字列の場合
        input: ["https://httpbin.org/anything?data={}"],
        expected: {},
      },
      {
        // "data" キーの値がJSON文字列の配列の場合
        input: ["https://httpbin.org/anything?data=[1,2,3]"],
        expected: [1, 2, 3],
      },
      {
        // "data" キーが存在し、他のクエリパラメータも付いている場合
        input: ["https://httpbin.org/anything?data={\"id\":4}&info=extra"],
        expected: { id: 4 },
      },
      {
        // "args" オブジェクトが存在しない場合
        input: ["https://httpbin.org/ip"],
        expected: "Error",
      }
    ],
  },
  {
    id: 'dynamic-config-validator',
    title: '動的設定バリデーター: ネスト設定の検証',
    description:
      'ネストされた設定辞書 (config) が、仕様辞書 (spec) で示された各項目の型および制約を満たしているかを再帰的に検証する関数を作成してください。すべてのキーが仕様に適合する場合は True を、1つでも不適合な場合や仕様のキーが存在しない場合は "Invalid" を返します。',
    difficulty: '難しい',
    image:
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=2667&ixlib=rb-4.0.3',
    languages: ['Python'],
    instructions: `以下の仕様に従って、設定オブジェクト (config) と仕様オブジェクト (spec) を入力として受け取り、設定が仕様を満たすか検証する関数を作成してください。

【入力】
- config: ネストされた辞書（Pythonの dict）で、各キーの値は任意の型・構造。
- spec: 同じ構造を持つ辞書で、各キーに対して期待される型や制約を指定します。
  - もし spec の値が文字列の場合、その値は期待される型を示します（例："string", "number", "boolean"）。
  - もし spec の値がオブジェクトの場合、必ず "type" キーを持ち、数値の場合は任意で "min" および "max" を指定できます。例: { "type": "number", "min": 1, "max": 65535 }。
  - ネストされた辞書の場合は、spec も同じ構造になっており、再帰的に検証します。

【出力】
- config のすべてのキーが spec の定める型および制約を満たす場合は True を返す。
- 1つでも仕様を満たさない場合、または spec に定義されたキーが config に存在しない場合は、固定文字列 "Invalid" を返す。

【注意点】
- 数値の場合、spec に "min" や "max" が定義されていれば、その範囲内であるかをチェックする。
- config が空の辞書で、spec も空の場合は True を返す。
- 再帰的に全てのキーを検証する必要があります。
`,
    examples: `
例:
config = {
  "host": "localhost",
  "port": 8080,
  "debug": true,
  "thresholds": {
    "min": 0,
    "max": 100
  }
}
spec = {
  "host": "string",
  "port": { "type": "number", "min": 1, "max": 65535 },
  "debug": "boolean",
  "thresholds": {
    "min": { "type": "number", "min": 0 },
    "max": { "type": "number", "max": 1000 }
  }
}
出力: True
`,
video: "/videos/dynamic-config-validator.mp4",
testCases: [
  {
    "input": [
      {
        "host": "localhost",
        "port": 8080,
        "debug": true,
        "thresholds": { "min": 0, "max": 100 },
      },
      {
        "host": "string",
        "port": { "type": "number", "min": 1, "max": 65535 },
        "debug": "boolean",
        "thresholds": {
          "min": { "type": "number", "min": 0 },
          "max": { "type": "number", "max": 1000 },
        },
      },
    ],
    "expected": true,
  },
  {
    "input": [
      {
        "host": "localhost",
        "port": 70000,
        "debug": "yes",
        "thresholds": { "min": -5, "max": 1200 },
      },
      {
        "host": "string",
        "port": { "type": "number", "min": 1, "max": 65535 },
        "debug": "boolean",
        "thresholds": {
          "min": { "type": "number", "min": 0 },
          "max": { "type": "number", "max": 1000 },
        },
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "host": "localhost",
        "port": 8080,
        "thresholds": { "min": 0, "max": 100 },
      },
      {
        "host": "string",
        "port": { "type": "number", "min": 1, "max": 65535 },
        "debug": "boolean",
        "thresholds": {
          "min": { "type": "number", "min": 0 },
          "max": { "type": "number", "max": 1000 },
        },
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {},
      {}
    ],
    "expected": true,
  },
  {
    "input": [
      {
        "host": "localhost",
        "port": 8080,
        "debug": true,
        "extra": "not allowed",
        "thresholds": { "min": 0, "max": 100 },
      },
      {
        "host": "string",
        "port": { "type": "number", "min": 1, "max": 65535 },
        "debug": "boolean",
        "thresholds": {
          "min": { "type": "number", "min": 0 },
          "max": { "type": "number", "max": 1000 },
        },
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "host": "localhost",
        "port": 8080,
        "debug": true,
        "thresholds": { "min": 0 }
      },
      {
        "host": "string",
        "port": { "type": "number", "min": 1, "max": 65535 },
        "debug": "boolean",
        "thresholds": {
          "min": { "type": "number", "min": 0 },
          "max": { "type": "number", "max": 1000 },
        },
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "database": {
          "user": "admin",
          "pass": 1234
        }
      },
      {
        "database": {
          "user": "string",
          "pass": "string"
        }
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "server": {
          "host": "example.com",
          "port": 443,
          "ssl": {
            "enabled": true,
            "protocol": "TLSv1.2"
          }
        }
      },
      {
        "server": {
          "host": "string",
          "port": { "type": "number", "min": 1, "max": 65535 },
          "ssl": {
            "enabled": "boolean",
            "protocol": "string"
          }
        }
      },
    ],
    "expected": true,
  },
  {
    "input": [
      {
        "limit": 5000
      },
      {
        "limit": { "type": "number", "min": 1, "max": 1000 }
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "featureFlag": "true"
      },
      {
        "featureFlag": "boolean"
      },
    ],
    "expected": "Invalid",
  },
  {
    "input": [
      {
        "service": {
          "name": "myservice",
          "version": "1.0",
          "config": {
            "retry": 3,
            "timeout": 30,
            "extra": "oops"
          }
        }
      },
      {
        "service": {
          "name": "string",
          "version": "string",
          "config": {
            "retry": { "type": "number", "min": 1 },
            "timeout": { "type": "number", "min": 1 }
          }
        }
      },
    ],
    "expected": "Invalid",
  },
]
},
];
