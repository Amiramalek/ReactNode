import React, { useEffect, useState } from 'react';
import { getAppointments, updateAppointmentStatus, deleteAppointment } from '../../api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('userRole')?.toLowerCase(); // Ensure lowercase comparison

        const allAppointments = await getAppointments(token); // Pass token if required in your getAppointments()

        if (role === 'customer') {
          const userAppointments = allAppointments.filter(
            (appointment) => appointment.email === email
          );
          setAppointments(userAppointments);
        } else if (role === 'admin') {
          setAppointments(allAppointments);
        }
      } catch (err) {
        console.error('Failed to fetch appointments.', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((item) => item._id !== id));
      setDeleteTarget(null);
    } catch (err) {
      alert('Failed to delete appointment');
      console.error(err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div className='p-6'>
      <div className='bg-white p-4 rounded shadow'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>All Appointments</h2>
          <h3 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Total Appointments: {appointments.length}</h3>
        </div>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-[#8B6D5C] border-b'>
              <th className='p-2'>Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Contact Number</th>
              <th className='p-2'>Booking Date</th>
              <th className='p-2'>Appointment Date</th>
              <th className='p-2'>Audit Details</th>
              <th className='p-2'>Message</th>
              <th className='p-2'>Status</th>
              {localStorage.getItem('userRole')?.toLowerCase() === 'admin' && (
                <th className='p-2'>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length === 0 ? (
              <tr className='hover:bg-blue-50 text-gray-700'>
                <td colSpan="9" className='p-2'>
                  No appointments found.
                </td>
              </tr>
            ) : (
              currentAppointments.map((appointment) => (
                <tr key={appointment._id} className='hover:bg-blue-50 text-gray-700'>
                  <td className='p-2'>{appointment.name}</td>
                  <td className='p-2'>{appointment.email}</td>
                  <td className='p-2'>{appointment.contactNumber}</td>
                  <td className='p-2'>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td className='p-2'>{new Date(appointment.dateTime).toLocaleDateString()}</td>
                  <td className='p-2'>{appointment.auditDetails}</td>
                  <td className='p-2'>{appointment.message}</td>
                  <td className='p-2'>
                    {localStorage.getItem('userRole')?.toLowerCase() === 'admin' ? (
                      <select
                        value={appointment.status}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            const updated = await updateAppointmentStatus(appointment._id, newStatus);
                            setAppointments((prev) =>
                              prev.map((item) =>
                                item._id === appointment._id ? { ...item, status: updated.status } : item
                              )
                            );
                          } catch (err) {
                            alert('Failed to update status');
                          }
                        }}
                      >
                        <option value="Booked">Booked</option>
                        <option value="Failed">Failed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      appointment.status
                    )}
                  </td>
                  {localStorage.getItem('userRole')?.toLowerCase() === 'admin' && (
                    <td className='p-2'>
                      <button className='text-[#8B6D5C]'
                        onClick={() => setDeleteTarget(appointment._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Delete confirmation popup */}
        {deleteTarget && (
          <div style={popupOverlayStyle}>
            <div style={popupStyle}>
              <p>Are you sure you want to delete this appointment?</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  style={{
                    backgroundColor: '#d32f2f',
                    color: '#fff',
                    padding: '8px 16px',
                    border: 'none',
                    marginRight: '10px',
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteTarget(null)}
                  style={{ backgroundColor: '#9e9e9e', color: '#fff', padding: '8px 16px', border: 'none' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className='flex gap-6 items-center justify-center mt-6'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const thStyle = { padding: '10px', border: '1px solid #ccc', textAlign: 'left' };
const tdStyle = { padding: '10px', border: '1px solid #ccc' };

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};

const popupStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '6px',
  width: '300px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
};

export default Appointments;
