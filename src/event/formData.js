const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));

export default formData;
