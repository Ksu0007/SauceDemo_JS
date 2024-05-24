import { config as baseConfig } from "./wdio.base.conf.js";

export const config = {
  ...baseConfig,
  specs: ["./features/**/*.feature"],
  framework: "cucumber",
  cucumberOpts: {
    require: ["./step-definitions/**/*.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
