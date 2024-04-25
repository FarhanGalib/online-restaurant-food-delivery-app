export const deepCopy = <T>(obj: T) => {
  return JSON.parse(JSON.stringify(obj)) as T;
};

export function handleOrderId(orders: TOrder[]) {
  let newOrderId;

  if (orders.length > 0) {
    newOrderId = `${Number(orders[orders.length - 1].id) + 1}`;
  }
  return newOrderId;
}

export function getCurrentTimeInMinutes(currentTime = new Date()) {
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  return currentTimeInMinutes;
}

export function parseTimeInMinutes(time: string) {
  const timeComponents = time.split(/:|(?=[ap]m)/i);
  let hours = parseInt(timeComponents[0]);
  const minutes = parseInt(timeComponents[1]);
  const AMPM = timeComponents[2].toLowerCase();
  hours += AMPM === 'pm' && hours !== 12 ? 12 : 0;
  const timeInMinutes = hours * 60 + minutes;

  return timeInMinutes;
}

export function isTimeInRange(timeString: string) {
  const [startTimeStr, endTimeStr] = timeString.split('-');

  const [startTimeInMinutes, endTimeInMinutes] = timeString
    .split('-')
    .map((time) => parseTimeInMinutes(time));

  const currentTimeInMinutes = getCurrentTimeInMinutes();

  // // Parse start time
  // const startTimeInMinutes = parseTime(startTimeStr);
  // // Parse end time
  // const endTimeInMinutes = parseTime(endTimeStr);

  // Check if current time is within the range
  const isBranchOpen =
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes;

  const isBranchClosing =
    currentTimeInMinutes >= endTimeInMinutes - 30 &&
    currentTimeInMinutes <= endTimeInMinutes;

  return [isBranchOpen, isBranchClosing, startTimeStr, endTimeStr];
}
