"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`欢迎使用pk前端框架生成器 ${chalk.red("generator-pk-cli")}!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "项目名称",
        default: `pk-${this.appname}`
      },
      {
        type: "input",
        name: "description",
        message: "项目描述",
        default: ""
      },
      {
        type: "input",
        name: "version",
        message: "版本号",
        default: "0.0.1"
      },
      {
        type: "list",
        name: "template",
        message: "请选择模板",
        choices: [
          {
            name: "vue-iview",
            value: "iview",
            checked: true // 默认选中
          },
          {
            name: "vue-antd",
            value: "antd"
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath() + "/" + this.props.template,
      this.destinationPath(this.props.name)
    );
    this.fs.extendJSON(
      this.destinationPath(this.props.name + "/package.json"),
      {
        name: this.props.name,
        version: this.props.version,
        description: this.props.description
      }
    );
  }

  end() {
    yosay("您的应用已创建完毕!");
    chalk.green("进入目录运行npm install安装依赖吧");
  }
};
