export const publicRoutes = ["/login"];
export const privateRoutes = ["/stay", "/user"];
export const NEXT_PREV_TYPE = {
  FIRST: "first",
  PREVIOUS: 'previous',
  NEXT: 'next',
  LAST: 'last'
};
export const STAY_COLUMNS = [
  {
    name: "_page.stay.table.header.arrival",
    field: "startDate",
    sort: {
      isSortable: true,
      isSortActive: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.departure",
    field: "endDate",
    sort: {
      isSortable: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.stayDescription",
    field: "stayDescription",
  },
  {
    name: "_page.stay.table.header.numberOfPerson",
    field: "numberOfFishers",
    sort: {
      isSortable: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.code",
    field: "code",
  },
];

export const USER_COLUMNS = [
  {
    name: "_page.user.table.header.firstName",
    field: "firstName",
  },
  {
    name: "_page.user.table.header.lastName",
    field: "lastName",
  },
  {
    name: "_page.user.table.header.userName",
    field: "userName",
  },
  {
    name: "_page.user.table.header.email",
    field: "email",
  },
  {
    name: "_page.user.table.header.phoneNumber",
    field: "phoneNumber",
  },
];
