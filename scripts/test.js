const execute = require("../helpers/execute")

execute({
  scriptName: "test",
  env: process.env.NODE_ENV || "test"
})