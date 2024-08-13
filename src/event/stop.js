function stop(event) {
  event.stopPropagation();
  return event;
}

export default stop;
