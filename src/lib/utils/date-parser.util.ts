export const parseDateInputFormat = (timeStamp: number) =>
  new Date(+timeStamp).toISOString().split("T")[0];