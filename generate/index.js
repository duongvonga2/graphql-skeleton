const fs = require('fs');
const path = require('path');

const EXAMPLE_PATH = path.resolve(__dirname, 'example');
const EXAMPLE_GRAPHQL_PATH = EXAMPLE_PATH + '/graphql';
const EXAMPLE_VALIDATOR_SCHEMA_PATH = EXAMPLE_PATH + '/validator-schema';
const EXAMPLE_GRAPHQL_MUTATIONS_PATH = EXAMPLE_GRAPHQL_PATH + '/mutations';
const EXAMPLE_GRAPHQL_QUERIES_PATH = EXAMPLE_GRAPHQL_PATH + '/queries';

const copyNInitFile = (srcPath, destPath, moduleName, upperModuleName) => {
  let fileContent = fs.readFileSync(srcPath, 'utf-8');
  fileContent = fileContent.replace(/{{moduleName}}/g, moduleName);
  fileContent = fileContent.replace(/{{upperModuleName}}/g, upperModuleName);
  fileContent = fileContent.replace(/{{fullUpperModuleName}}/g, moduleName.toUpperCase());
  fileContent = fileContent.replace(/\`/g, '');

  fs.writeFileSync(destPath, fileContent, 'utf-8');
  console.log('init file ', destPath, 'success');
};

const copyFileFromExample = (examplePath, modulePath, moduleName, excludes = []) => {
  const upperModuleName = moduleName
    .split('')
    .map((item, index) => (index ? item : item.toUpperCase()))
    .join('');
  const exampleFiles = fs.readdirSync(examplePath);
  exampleFiles.forEach((pathItem) => {
    if(excludes.includes(pathItem)){
      return;
    }
    const destPath = modulePath + '/' + pathItem.replace(/example/, moduleName);
    const srcPath = examplePath + '/' + pathItem;
    copyNInitFile(srcPath, destPath, moduleName, upperModuleName);
  });
};

const copyGraphqlMutationsFolder = (modulePath, moduleName) => {
  copyFileFromExample(EXAMPLE_GRAPHQL_MUTATIONS_PATH, modulePath, moduleName);
};

const copyGraphqlQueriesFolder = (modulePath, moduleName) => {
  copyFileFromExample(EXAMPLE_GRAPHQL_QUERIES_PATH, modulePath, moduleName);
};

const copyGraphqlFolder = (modulePath, moduleName) => {
  copyFileFromExample(EXAMPLE_GRAPHQL_PATH, modulePath, moduleName, ['mutations', 'queries']);
  const mutationPath = modulePath + '/mutations';
  const queriesPath = modulePath + '/queries';
  fs.mkdirSync(mutationPath);
  fs.mkdirSync(queriesPath);
  copyGraphqlMutationsFolder(mutationPath, moduleName);
  copyGraphqlQueriesFolder(queriesPath, moduleName);
};

const copyValidatorSchemaFolder = (modulePath, moduleName) => {
  copyFileFromExample(EXAMPLE_VALIDATOR_SCHEMA_PATH, modulePath, moduleName);
};

const copyExampleFolder = (modulePath, moduleName) => {
  copyFileFromExample(EXAMPLE_PATH, modulePath, moduleName, ['graphql','validator-schema'])
};

const initDir = (moduleName) => {
  const modulePath = path.resolve(__dirname, '../src/modules', moduleName);
  const moduleGraphqlPath = `${modulePath}/graphql`;
  const moduleValidatorPath = `${modulePath}/validator-schema`;
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
    fs.mkdirSync(moduleGraphqlPath);
    fs.mkdirSync(moduleValidatorPath);
    copyExampleFolder(modulePath, moduleName);
    copyValidatorSchemaFolder(moduleValidatorPath, moduleName);
    copyGraphqlFolder(moduleGraphqlPath, moduleName);
    return;
  }
  if (!fs.existsSync(moduleGraphqlPath)) {
    fs.mkdirSync(moduleGraphqlPath);
    copyGraphqlFolder(moduleGraphqlPath, moduleName);
    return;
  }
  if (!fs.existsSync(moduleValidatorPath)) {
    fs.mkdirSync(moduleValidatorPath);
    copyValidatorSchemaFolder(moduleValidatorPath, moduleName);
    return;
  }
};

const [arg1, agr2, ...moduleNames] = process.argv;
moduleNames.forEach(item => {
  initDir(item);
})
