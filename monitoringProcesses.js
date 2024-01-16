const { execSync } = require("child_process");
const fs = require("fs");

const logFilePath = "activityMonitor.log";
const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

const runCommand = (command) => {
  try {
    return execSync(command, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Error running command: ${error.message}`);
    return "";
  }
};

const monitorAndLog = () => {
  const unixCommand = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
  const windowsCommand =
    "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
  const command = process.platform === "win32" ? windowsCommand : unixCommand;
  const output = runCommand(command);
  const [cpu, mem, processName] = output.split(/\s+/);
  return `Process: ${processName} | CPU: ${cpu} | Memory: ${mem}`;
};

const displayInformation = () => {
  const processInfo = monitorAndLog();
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(processInfo);
};

const writeToFile = () => {
  const processInfo = monitorAndLog();
  fs.appendFileSync(logFilePath, `${getCurrentUnixTime()} : ${processInfo}\n`, {
    flag: "a",
  });
};

displayInformation();
setInterval(displayInformation, 100);
writeToFile();
setInterval(writeToFile, 60*1000);
