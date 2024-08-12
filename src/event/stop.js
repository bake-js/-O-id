function stop(event) {
  event instanceof Event && event.stopPropagation();
  return event;
}

export default stop;
