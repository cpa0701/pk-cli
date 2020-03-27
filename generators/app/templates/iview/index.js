/**
 * Create by Pengan Chen on 2020/3/27
 */
var chalk = require('chalk');    //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');    //yeoman弹出框
var path = require('path');
var pkpackage = yeoman.generators.Base.extend({
  constructor: function () {
    // 默认会添加的构造函数
    yeoman.generators.Base.apply(this, arguments);
  },
  info: function () {
    this.log(chalk.green(
      'I am going to build your app!'
    ));
  },
  prompting () {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    },];
    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },
  generateBasic: function () {  //按照自己的templates目录自定义
    this.directory('src', 'src');    //拷贝目录
    this.directory('data', 'data');
    this.copy('package.json', 'package.json');   //拷贝文件
    this.copy('index.html', 'index.html');
    this.copy('README.md', 'README.md');
    this.copy('webpack.config.js', 'webpack.config.js');
  },
  generateClient: function () {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.destinationPath('./');
  },
  install: function () {      //安装依赖
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },
  end: function () {
    this.log(yosay(
      'Your app has been created successfully!'
    ));
  }
});
module.exports = pkpackage;
