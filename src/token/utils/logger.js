const logger = {
  log: (message, level = "INFO") => {
      console.log(`[${level}] ${message}`);
  }
};

module.exports = logger;