const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv = {}) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "vendor",
    webpackConfigEnv,
    entry: "./src/react-mf-requisition.tsx",
  });

  return merge(defaultConfig, {
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
  });
};
