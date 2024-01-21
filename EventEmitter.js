class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
    return this;
  }

  off(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
    return this;
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
    return this;
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}

module.exports = EventEmitter;
