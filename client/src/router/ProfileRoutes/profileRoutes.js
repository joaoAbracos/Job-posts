import Person from "../../pages/Profile/Person.vue";
import Company from "../../pages/Profile/Company.vue";
import PageCompany from "../../pages/Profile/page/PageCompany.vue";
import PagePerson from "../../pages/Profile/page/PagePerson.vue";
import PageCompanyEdit from "../../pages/Profile/page/PageCompanyEdit.vue";
import PagePersonEdit from "../../pages/Profile/page/PagePersonEdit.vue";

export default [
  {
    path: "/profile/person",
    name: "profilePerson",
    component: Person,
    meta: {
      auth: true,
    },
  },
  {
    path: "/profile/company",
    name: "profileCompany",
    component: Company,
    meta: {
      auth: true,
    },
  },
  {
    path: "/page/person",
    name: "pagePerson",
    component: PagePerson,
    meta: {
      auth: true,
    },
  },
  {
    path: "/page/company",
    name: "pageCompany",
    component: PageCompany,
    meta: {
      auth: true,
    },
  },
  {
    path: "/page/company/edit",
    name: "pageCompanyEdit",
    component: PageCompanyEdit,
    meta: {
      auth: true,
    },
  },
  {
    path: "/page/person/edit",
    name: "pagePersonEdit",
    component: PagePersonEdit,
    meta: {
      auth: true,
    },
  },
];
