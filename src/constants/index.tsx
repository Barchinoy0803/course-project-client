import { QUESTION_TYPE, TEMPLATE_TYPE } from "../types"

export const defaultUser = {
  username: "",
  email: "",
  password: ""
}

export const initialStateLogin = {
  email: "",
  password: ""
}

export const OtpDefaultValues = {
  otp: ""
}

export const initialStateTemplate = {
  title: "",
  topic: "",
  description: "",
  image: "",
  type: TEMPLATE_TYPE.PUBLIC,
  Question: []
}

export const templateTypeOptions = [
  {
    label: "Public",
    value: TEMPLATE_TYPE.PUBLIC
  },
  {
    label: "Private",
    value: TEMPLATE_TYPE.PRIVATE
  }
]

export const questionTypeOptions = [
  {
    label: "Open",
    value: QUESTION_TYPE.OPEN
  },
  {
    label: "Close",
    value: QUESTION_TYPE.CLOSE
  },
  {
    label: "Multichoice",
    value: QUESTION_TYPE.MULTICHOICE
  },
  {
    label: "Numerical",
    value: QUESTION_TYPE.NUMERICAL
  },
]


export const drawerListItems = [
  {
    title: "templates",
    link: "/dashboard/templates"
  },
  {
    title: "forms",
    link: "/dashboard/forms"
  },
  {
    title: "analyze",
    link: "/dashboard/analyze"
  }
]

export const UserTableColumns = [
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'email', headerName: 'Email', width: 400 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'createdAt', headerName: 'Join Us', width: 450 },
];

export const TemplateTableColumns = [
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params: any) => (
      <img
        src={params.value}
        alt="template"
        className="w-full h-full object-contain rounded-[8px]"
      />
    ),
    sortable: false,
    filterable: false,
  },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'topic', headerName: 'Topic', width: 250 },
  { field: 'description', headerName: 'description', width: 500 },
  { field: 'type', headerName: 'type', width: 150 }
];

export const defaultImageLink = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-image-icon&psig=AOvVaw1PRDcwsEDtSTJH9zlDEeNF&ust=1750335955327000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLiz_9j7-o0DFQAAAAAdAAAAABAE"

export const YES_NO_OPTIONS = [
  {
    label: "YES",
    value: "YES",
  },
  {
    label: "NO",
    value: "NO",
  }
]