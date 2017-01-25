import slash from 'slash';
import path from 'path';

export const hasRootPathPrefixInString = (importPath, rootPathPrefix = '~') => {
  return typeof importPath === 'string' && new RegExp(`^${rootPathPrefix}`).test(importPath);
};

export const transformRelativeToRootPath = (importPath, rootPathSuffix, rootPathPrefix, sourceFile = '') => {
  const withoutRootPathPrefix = importPath.substring(rootPathPrefix.length, importPath.length);
  const absolutePath = path.resolve(`${rootPathSuffix ? rootPathSuffix : './'}/${withoutRootPathPrefix}`);
  const sourcePath = path.resolve(sourceFile.substring(0, sourceFile.lastIndexOf('/')));
  const relativePath = slash(path.relative(sourcePath, absolutePath));

  if (relativePath.indexOf('../') !== 0) {
    return `./${relativePath}`;
  }

  return relativePath;
};
