const EventEmitter = require("./EventEmitter");

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    const startTime = Date.now();

    try {
      const response = await asyncFunc(...args);
      const data = await response.json();
      const endTime = Date.now();
      this.emit("end");
      this.emit("data", data);

      const executionTime = endTime - startTime;
      console.log(`Execution time: ${executionTime}ms`);
    } catch (error) {
      this.emit("error", error);
    }
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

console.log(withTime.rawListeners("end"));

const fetchExample = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return response;
};

withTime.execute(fetchExample);
