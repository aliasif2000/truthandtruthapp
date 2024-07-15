import React from "react";

function UserTable({ userList }) {
  return (
    <tbody className="divide-y divide-gray-200">
      {userList.map((user, index) => (
        <tr key={index}>
          <td className="px-4 py-2 font-medium text-gray-900">{index + 1}</td>
          <td className="px-4 py-2 text-gray-700">{user.username}</td>
          <td className="px-4 py-2 text-gray-700">{user.email}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default UserTable;
