import node from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default [
  {
    input: "index.js",
    output: {
      file: "dist/index-es.js",
      format: "es"
    },
    plugins: [
      json(),
      node({
        jsnext: true,
        browser: false
      }),
      cjs()
    ],
    external: [
      "scrypt",
      "elliptic",
      "crypto",
      "assert",
      "stream",
      "fs",
      "path",
      "buffer",
      "util",
      "sha3",
      "vm"
    ]
  },
  {
    input: "index.js",
    output: {
      file: "dist/index-cjs.js",
      format: "cjs"
    },
    plugins: [
      json(),
      node({
        jsnext: false,
        browser: false
      }),
      cjs()
    ],
    external: [
      "scrypt",
      "elliptic",
      "crypto",
      "assert",
      "stream",
      "fs",
      "path",
      "buffer",
      "util",
      "sha3",
      "vm"
    ]
  },
  {
    input: "index.js",
    output: {
      file: "dist/index-browser.js",
      format: "umd",
      paths: {
        elliptic:
          "https://cdn.jsdelivr.net/npm/elliptic@6.4.0/lib/elliptic.min.js"
      }
    },
    plugins: [
      globals(),
      builtins(),
      json(),
      node({
        jsnext: false,
        browser: true
      }),
      cjs()
    ],
    external: ["scrypt", "elliptic"]
  }
];
