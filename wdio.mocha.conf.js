import { config as baseConfig } from "./wdio.base.conf.js";

export const config = {
  ...baseConfig,
  specs: ["./test/specs/**/*.js"],
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
