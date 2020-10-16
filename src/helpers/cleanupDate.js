const cleanupDate = (incomingDate) => {
  let date = new Date(incomingDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
};

export default cleanupDate;
