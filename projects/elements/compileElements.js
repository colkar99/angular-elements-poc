const { execSync } = require("child_process");

const projects = [
  // "angular-components-library",
  // "another-angular-components-library",
  // "claim-builder",
  "claim-type",
];

projects.forEach((project) => {
  console.log(`\nCompiling "${project}":\n`);
  compileComponent(project);
  //   components.forEach((component) => compileComponent(project, component));
});

function compileComponent(project) {
  console.log(`\t- ${project}`);

  const buildJsFiles = `ng run elements:build:production  --output-hashing=none  --deploy-url="/app" --main=projects/elements/src/${project}/compile.ts`;
  console.log(`${project} Build completed`);
  const bundleIntoSingleFile = `cat dist/tmp/runtime.js dist/tmp/main.js dist/tmp/polyfills.js > dist/tmp/my-${project}.js`;

  //   const buildJsFiles = `ng build --prod  --output-hashing none --deploy-url /scripts/libs/  --main=projects/elements/src/${project}/compile.ts`;
  //   const bundleIntoSingleFile = `cat dist/tmp/runtime-es2015.js dist/tmp/main-es2015.js > dist/tmp/my-${component}.js`;

  const copyBundledComponent = `cp dist/tmp/my-${project}.js dist/components/`;

  const copyCss = `cp dist/tmp/styles.css dist/components/`;

  execSync(
    `${buildJsFiles} && ${bundleIntoSingleFile} && ${copyBundledComponent} && ${copyCss}`
  );
}
