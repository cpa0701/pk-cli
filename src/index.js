#! node
const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();
env.register(require.resolve("../generators/app"), "pk-cli");
env.run("pk-cli");
