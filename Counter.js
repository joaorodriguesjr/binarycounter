export class Counter {
  constructor() {
    this.count = 1;
  }

  start(callback) {
    const update = () => {
      if (this.count === 256) {
        this.count = 0;
      }

      callback(this.count);
      this.count++;
    };

    setInterval(update, 1000);
  }
}
