export const GetPatients = () => {

  return fetch('https://localhost:44329/Patient/GetPatients', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(res => {
      if (res.status >= 400) {
          throw new Error("Server responds with error!")
      }
      return res.json()
  })
  .then(data => {
      return data
  },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      })
}

export const GetPatient = (PatientID) => {

  return fetch(`https://localhost:44329/Patient/GetPatient/${PatientID}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(res => {
      if (res.status >= 400) {
          throw new Error("Server responds with error!")
      }
      return res.json()
  })
  .then(data => {
      return data
  },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      })
}

export const SavePatient = (data) => {
  return fetch("https://localhost:44329/Patient/SavePatient", {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!")
      }
      return res.json()
    })
    .then(data => {
        return data
    },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      });
}

export const UpdatePatient = (data) => {
  return fetch("https://localhost:44329/Patient/UpdatePatient", {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!")
      }
      return res.json()
    })
    .then(data => {
        return data
    },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      });
}

export const DeletePatient = (PatientID) => {
  return fetch(`https://localhost:44329/Patient/DeletePatient/${PatientID}`, {
    method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!")
      }
      return res.json()
    })
    .then(data => {
        return data
    },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      });
}

export const CancelAppointment = (PatientID) => {
  return fetch(`https://localhost:44329/Patient/CancelAppointment/${PatientID}`, {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!")
      }
      return res.json()
    })
    .then(data => {
        return data
    },
      err => {
          const response = {
              status: 400,
              message: err
          }
          return response
      });
}