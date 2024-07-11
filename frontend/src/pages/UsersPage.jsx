import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";

function Users() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/admin/getalluser");
      setUserList(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="divide-y divide-gray-300">
      {/* <div className="container mx-auto py-8">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter truth..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Add Truth
          </button>
        </div>
      </div> */}

      {userList.length === 0 ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              There are no users.
            </h2>
          </div>
        </div>
      ) : (
        <div className="pt-5 overflow-x-auto container mx-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Id
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="w-20"></th>
              </tr>
            </thead>

            <UserTable userList={userList} />
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
