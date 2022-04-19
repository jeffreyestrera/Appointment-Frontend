/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Patients from "views/Patients.js"

const dashboardRoutes = [
  {
    path: "/patients",
    name: "Patients",
    icon: "nc-icon nc-single-02",
    component: Patients,
    layout: "/admin",
  },
];

export default dashboardRoutes;
