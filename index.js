const scriptName = process.argv[2];

if (!["start", "test", "build"].includes(scriptName)) {
  console.log(`Unknown script "${scriptName}"`);
  process.exit();
}

require(`./scripts/${scriptName}`);

