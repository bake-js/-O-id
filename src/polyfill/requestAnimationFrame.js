!("requestAnimationFrame" in self) &&
  Reflect.defineProperty(self, "requestAnimationFrame", {
    value(calback) {
      setTimeout(calback, 0);
    },
  });
