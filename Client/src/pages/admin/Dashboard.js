import React, { useEffect, useState } from 'react';
import { getAppointments } from '../../api';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch recent appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  const userRole = localStorage.getItem('userRole')?.toLowerCase();

  return (
    <>
      {userRole === 'admin' && (
        <main className="flex-1 p-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-[#8B6D5C] mb-4">Recent Appointments</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#8B6D5C] border-b">
                  <th className="p-2">Patient</th>
                  <th className="p-2">Contact Number</th>
                  <th className="p-2">Booking Date</th>
                  <th className="p-2">Appointment Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  [...appointments]
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                    .slice(0, 3)
                    .map((appt, index) => (
                      <tr key={index} className="hover:bg-blue-50 text-gray-700">
                        <td className="p-2">{appt.name}</td>
                        <td className="p-2">{appt.contactNumber}</td>
                        <td className="p-2">{new Date(appt.dateTime).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                        <td className="p-2">
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded ${
                              appt.status === 'Confirmed'
                                ? 'bg-green-100 text-green-600'
                                : appt.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {userRole === 'customer' && (
        <div className="p-6 bg-white rounded shadow mb-6">
          <h1 className="text-2xl font-bold text-[#8B6D5C] mb-2">Welcome back to Organic Dental dashboard!</h1>
          <p className="text-gray-700 text-base leading-relaxed">
            We’re really glad to have you here. This dashboard was made to help you stay on top of your dental care in a way that’s simple, clear, and helpful.
            <br />
            You can check your upcoming appointments, review past visits, keep track of your treatments, and find helpful tips for taking care of your teeth and gums.
            <br /><br />
            We believe your smile is one of the most important parts of who you are. It reflects your health, your confidence, and even your mood. That’s why we’re committed to giving you the best care, support, and guidance every step of the way.
            <br /><br />
            Taking care of your teeth doesn’t have to be complicated. With regular checkups, a healthy routine, and a little help from us, you can keep your smile bright and strong for years to come.
            <br /><br />
            If you ever have a question, concern, or just need a little advice, our team is here and ready to help.
            <br />
            You’re not just a patient—you’re part of the Organic Dental family.
            <br /><br />
            Thanks for trusting us with your smile.
            <br />
            Let’s keep it healthy, happy, and shining—together.
          </p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
