const getExpiredSlots = () => {
  const expiredSlots = [];
  const now = moment("08:30", "hh:mm ");
  const start = now.clone().startOf("hour").add(30, "minutes");
  const end = moment().clone().add(50, "minutes");
  while (start.isBefore(end)) {
    expiredSlots.push(start.format("h:mm A"));
    start.add(30, "minutes");
  }
  return expiredSlots;
};

console.log(getExpiredSlots());
