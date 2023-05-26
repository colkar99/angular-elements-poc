const { execSync } = require("child_process");

compileMainTheme();

function compileMainTheme() {
  const pathFrom = `dist/tmp`;
  const pathTo = `dist/helpers`;

  execSync(`lessc ${pathFrom}/styles.css ${pathTo}/styles.css`);
}
