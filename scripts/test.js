const execute = require("../helpers/execute")

execute({
  scriptName: "start",
  env: process.env.NODE_ENV || "test"
})