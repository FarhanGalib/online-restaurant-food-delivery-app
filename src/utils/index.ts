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

export function isTimeInRange(timeString: string) {
  const [startTimeStr, endTimeStr] = timeString.split('-');
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Parse start time
  const startTimeComponents = startTimeStr.split(/:|(?=[ap]m)/i);
  let startHours = parseInt(startTimeComponents[0]);
  const startMinutes = parseInt(startTimeComponents[1]);
  const startAMPM = startTimeComponents[2].toLowerCase();
  startHours += startAMPM === 'pm' && startHours !== 12 ? 12 : 0;
  const startTimeInMinutes = startHours * 60 + startMinutes;

  // Parse end time
  const endTimeComponents = endTimeStr.split(/:|(?=[ap]m)/i);
  let endHours = parseInt(endTimeComponents[0]);
  const endMinutes = parseInt(endTimeComponents[1]);
  const endAMPM = endTimeComponents[2].toLowerCase();
  endHours += endAMPM === 'pm' && endHours !== 12 ? 12 : 0;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  // Check if current time is within the range
  return [
    currentTimeInMinutes >= startTimeInMinutes &&
      currentTimeInMinutes <= endTimeInMinutes,
    startTimeStr,
    endTimeStr,
  ];
}
