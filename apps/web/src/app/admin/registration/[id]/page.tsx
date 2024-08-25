"use client"

import * as React from 'react';
import { useParams } from 'next/navigation';
import axios from '@/helper/axiosInstance';
import { UserContext } from '@/context/UserContext';
import { withAuthAdmin } from '@/hoc/authGuard';

interface Attendance {
  ticketCode: string;
  user: {
    name: string;
  };
  isAttendance: boolean;
}

const Attendance: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const [attendanceList, setAttendanceList] = React.useState<Attendance[]>([]);

  const fetchAttendance = async (eventId: string) => {
    try {
      console.log("USER EMAIL FOR GET ATTENDEE", user?.email)
      const { data } = await axios.get(`/api/dashboard/getAttendee/${user?.email}/${eventId}`);
      console.log("ticket code::", data.data[0].detailtransaction[0].ticketcode);
      const list = data.data.map((transaction: any) => {
        return {
          ticketCode: transaction.detailtransaction[0].ticketcode,
          user: transaction.user,
          isAttendance: transaction.detailtransaction[0].isAttendance,
        };
      });
      setAttendanceList(list);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      const timer = setTimeout(() => {
        fetchAttendance(id);
      }, 500);

    return () => clearTimeout(timer);
    }
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl pb-5 text-orange-500">Attendance List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">TICKET CODE</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">USER</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">ATTENDANCE</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceList.length > 0 ? (
              attendanceList.map((attendance, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-left text-sm font-medium text-gray-900">{attendance.ticketCode}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{attendance.user.name}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500">
                    <input type="checkbox" checked={attendance.isAttendance} readOnly />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-sm text-gray-500">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default withAuthAdmin(Attendance);
