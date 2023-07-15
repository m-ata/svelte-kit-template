import editIcon from '$lib/images/icons/edit.svg';
import deleteIcon from '$lib/images/icons/delete.svg';
import type { TFishColor } from '$lib/types/stats.type';

export const publicRoutes = ["/login"];
export const privateRoutes = ["/dashboard", "/stay", "/user"];
export const NEXT_PREV_TYPE = {
  FIRST: "first",
  PREVIOUS: 'previous',
  NEXT: 'next',
  LAST: 'last'
};
export const STAY_COLUMNS = [
  {
    name: "",
    type: "checkbox",
    field: "isSelected",
  },
  {
    name: "_page.stay.table.header.arrival",
    field: "startDate",
    type: "date",
    sort: {
      isSortable: true,
      isSortActive: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.departure",
    field: "endDate",
    type: "date",
    sort: {
      isSortable: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.stayDescription",
    field: "stayDescription",
    type: "text",
  },
  {
    name: "_page.stay.table.header.numberOfPerson",
    field: "numberOfFishers",
    type: "text",
    sort: {
      isSortable: true,
      sortType: "asc",
    },
  },
  {
    name: "_page.stay.table.header.code",
    field: "code",
    type: "text",
  },
  {
    name: "_common.actionText",
    type: "icon-buttons",
    buttons: [{
      type: 'edit',
      icon: editIcon
    }, {
      type: 'delete',
      icon: deleteIcon,
    }]
  },
];

export const USER_COLUMNS = [
  {
    name: "",
    type: "checkbox",
    field: "isSelected",
  },
  {
    name: "_page.user.table.header.firstName",
    field: "firstName",
    type: "text",
  },
  {
    name: "_page.user.table.header.lastName",
    field: "lastName",
    type: "text",
  },
  {
    name: "_page.user.table.header.userName",
    field: "userName",
    type: "text",
  },
  {
    name: "_page.user.table.header.email",
    field: "email",
    type: "text",
  },
  {
    name: "_page.user.table.header.phoneNumber",
    field: "phoneNumber",
    type: "text",
  },
  {
    name: "_common.actionText",
    type: "icon-buttons",
    buttons: [{
      type: 'edit',
      icon: editIcon
    }, {
      type: 'delete',
      icon: deleteIcon,
    }]
  },
];

export const MAX_USER_INACTIVITY = 5 * 60 * 1000;
export const LANGUAGES = ['en', 'de', 'nb'];

export const GET_API = {
  STAY: '/getStayList',
  USER: '/getUsers'
};

export const DELETE_API = {
  STAY: '/deleteStay',
  USER: '/deleteUser'
}

export const UPDATE_API = {
  USER: '/updateUser'
}

export const emptyUser = {
  camps: [],
  configuration: {},
  createDate: 0,
  email: '',
  emailVerificationCode: '',
  emailVerified: false,
  firstName: '',
  initialUser: false,
  lastName: '',
  lastUpdateDate: 0,
  name: '',
  organisationId: 0,
  phoneNumber: '',
  userId: '',
  userName: '',
}

export const FISH_COLORS: TFishColor = {
  1022: "#d8bf8e",
  1711: "#d8d8d8",
  2311: "#757575",
  2202: "#e36b66",
  1032: "#2a5453",
};