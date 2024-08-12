function prevent(event) {
  event instanceof Event && event.preventDefault();
  return event;
}

export default prevent;
