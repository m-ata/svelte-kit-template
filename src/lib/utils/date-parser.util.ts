export const parseDateInputFormat = (timeStamp: number) =>
  new Date(+timeStamp).toLocaleDateString("de");