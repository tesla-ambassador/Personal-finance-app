export function getDateOfMonth(date: Date) {
  const day = date.getDate();

  return `${day.toLocaleString()}${getOrdinalSuffix(day)}`;
}

export function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getDuePayment(latestDate: Date, currentDate: Date) {
  const current = currentDate.getDate();
  const latest = latestDate.getDate();
  const difference = current - latest;

  if (difference <= 5 && difference >= 0) {
    return true;
  } else if (current < latest) {
    return false;
  } else return;
}
