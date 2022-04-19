import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import NotificationAlert from "react-notification-alert";

import {
  Button, Nav, Modal, Form,
  Container, Row, Col, Dropdown
} from "react-bootstrap";

import
  paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import "assets/scss/datatables.scss"

import {
  GetPatients, GetPatient, SavePatient,
  UpdatePatient, DeletePatient, CancelAppointment
} from "store/_Api/Patient"
import { Label } from "reactstrap";

function Patients() {  

  const [PatientLists, setPatientLists] = useState([]);

  const [PatientID, setPatientID] = useState(0);
  const [PatientName, setPatientName] = useState("");
  const [Schedule, setSchedule] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const notificationAlertRef = useRef(null);

  const PatientsColumns = [
    {
      dataField: "patientID",
      text: "patientID",
      hidden: true,
    },
    {
      dataField: "patientName",
      text: "Patient Name ↓",
      sort: true,
    },
    {
      dataField: "appointmentSchedule",
      text: "Appointment Schedule ↓",
      sort: true,
      formatter: (cellContent, data) => (
        <>
          {moment(data.appointmentSchedule).format('L')}
        </>
      )
    },
    {
      dataField: "status",
      text: "Status ↓",
      sort: true,
      formatter: (cellContent, data) => (
        <>
          {
            data.status === "Cancelled" ?
            <span className="text-danger">{data.status}</span> :
            <span className="text-success">{data.status}</span> 
          }
        </>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, data) => (
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            aria-expanded={false}
            aria-haspopup={true}
            as={Nav.Link}
            data-toggle="dropdown"
            variant="link"
            className="m-0">
            <span className="text-muted">Options</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => onGetPatient(data.patientID)}> Update
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => onDeletePatient(data.patientID)}> Delete
            </Dropdown.Item>
            <br/>
            <Dropdown.Item
              onClick={(e) => onCancelAppointment(data.patientID)}> Cancel Appointment
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    }
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: PatientLists.length, // replace later with size(users),
    custom: true,
  }

  const defaultSorted = [{
    dataField: 'patientID', // if dataField is not match to any column you defined, it will be ignored.
    order: 'patientID' // desc or asc
  }];

  const { SearchBar } = Search;

  const notify = (attr) => {    
    var options = {};
    options = {
      place: attr.place,
      message: (
        <div>
          <div>
            {attr.message}
          </div>
        </div>
      ),
      type: attr.type,
      icon: attr.icon,
      autoDismiss: attr.autoDismiss,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const onGetAllPatients = async () => {
    const response = await GetPatients();
    setPatientLists(response);
  }

  const onGetPatient = async (PatientID) => {
    setIsOpen(true)

    const response = await GetPatient(PatientID);
    setPatientID(response.patientID);
    setPatientName(response.patientName);
    setSchedule(new Date(response.appointmentSchedule).toLocaleDateString('en-CA'));
  }

  const ClearFields = () => {
    setPatientID(0)
    setPatientName("")
    setSchedule("")
  }

  const onCreatePatient = async () => {
    var data = {
      patientName: PatientName,
      appointmentSchedule: Schedule,
    }

    const response = await SavePatient(data)

    if(parseInt(response) > 0){
      var Attr = {
        place: "tc",
        message: "Successfully Added",
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
      onGetAllPatients()
      ClearFields()
    }
    else{
      var Attr = {
        place: "tc",
        message: response,
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
    }
  }

  const onUpdatePatient = async () => {
    var data = {
      patientID: parseInt(PatientID),
      patientName: PatientName,
      appointmentSchedule: new Date(Schedule),
    }

    const response = await UpdatePatient(data)
    if(parseInt(response) > 0){
      var Attr = {
        place: "tc",
        message: "Successfully Updated",
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
      onGetAllPatients()
      ClearFields()
      setIsOpen(false)
    }
    else{
      var Attr = {
        place: "tc",
        message: response,
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
    }
  }

  const onDeletePatient = async (PatientID) => {

    const response = await DeletePatient(PatientID)

    if(parseInt(response) > 0){
      var Attr = {
        place: "tc",
        message: "Successfully Deleted",
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
      onGetAllPatients()
      ClearFields()
      setIsOpen(false)
    }
    else{
      var Attr = {
        place: "tc",
        message: response,
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
    }
  }

  const onCancelAppointment = async (PatientID) => {

    const response = await CancelAppointment(PatientID)

    if(parseInt(response) > 0){
      var Attr = {
        place: "tc",
        message: "Successfully Cancelled Appointment",
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
      onGetAllPatients()
      ClearFields()
      setIsOpen(false)
    }
    else{
      var Attr = {
        place: "tc",
        message: response,
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      }

      notify(Attr)
    }
  }

  useEffect(() => {
    onGetAllPatients()
  },[])
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Form.Group>
              <label>Patient Name</label>
            <Form.Control
              placeholder="Patient Name"
              value={PatientName ? PatientName : ""}
              type="text" onChange={e => setPatientName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <label>Schedule</label>
            <Form.Control
              placeholder="Schedule"
              value={Schedule ? Schedule : ""}
              type="date" onChange={e => setSchedule(e.target.value)}></Form.Control>
            </Form.Group>
            <Button
              className="btn-fill"
              type="Add Patient"
              variant="success" onClick={onCreatePatient}>
              Create New Patient
            </Button>
          </Col>
          <Col md="3"></Col>
        </Row>
        <br/>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={PatientsColumns}
                    data={PatientLists}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={PatientLists}
                        columns={PatientsColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                            <Col sm="8">
                                <div className="text-sm-end">
                                <Label className="text-info">PATIENTS LISTS</Label>
                                </div>
                              </Col>
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block float-end">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                  defaultSorted={defaultSorted}
                                  classes={
                                    "table align-middle table-nowrap table-hover"
                                  }
                                  bordered={false}
                                  striped={false}
                                  responsive
                                />
                              </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
        </PaginationProvider>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        size={"lg"}>
          <Row>
            <Col sm="12">
              <Modal.Header className="justify-content-center">
                <h4>Update Patient</h4>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <label>Patient Name</label>
                <Form.Control
                  placeholder="Patient Name"
                  value={PatientName ? PatientName : ""}
                  type="text" onChange={e => setPatientName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <label>Schedule</label>
                <Form.Control
                  placeholder="Schedule"
                  value={Schedule ? Schedule : ""}
                  type="date" onChange={e => setSchedule(e.target.value)}></Form.Control>
                </Form.Group>
              </Modal.Body>
              <div className="modal-footer">
                <Button
                  className="btn-fill"
                  type="button"
                  variant="default"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-fill"
                  type="button"
                  variant="success"
                  onClick={onUpdatePatient}
                >
                  Update Patient
                </Button>
              </div>
            </Col>
          </Row>
      </Modal>
      <NotificationAlert ref={notificationAlertRef} />
    </>
  );
}

export default Patients;