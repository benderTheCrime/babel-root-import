import {hasRootPathPrefixInString, transformRelativeToRootPath} from './helper';

const replacePrefix = (path, opts = [], sourceFile) => {
  const options = [].concat(opts);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (hasRootPathPrefixInString(path, option.rootPathPrefix)) {
      return transformRelativeToRootPath(path, option.rootPathSuffix, option.rootPathPrefix, sourceFile);
    }
  }

  return path;
};

export default () => ({
  'visitor': {
    ImportDeclaration(path, state) {
      path.node.source.value = replacePrefix(path.node.source.value, state.opts, state.file.opts.filename);
    }
  }
});
