// babel-preset-expo resolves the "@/*" alias directly from tsconfig.json paths.
module.exports = function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};
