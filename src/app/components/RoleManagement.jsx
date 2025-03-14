"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showTop10, setShowTop10] = useState(true);
  const {data:session} =useSession();

  // Fetch token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
     else if(session)
      {
        console.log("Session final:- ",session?.user?.jwt)
      if(session?.user)
      {
        setToken(session?.user?.jwt)
      }
    }
    
  }, [session]);

  // Fetch all users
  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/admin/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if(data.error)
          {
            console.log(data.error)
            return 
          }
          setUsers(data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }
  }, [token]);

  const removeUser = async (userId, role) => {
   
  
    if (role === "superadmin") {
      setMessage("Superadmin cannot be removed.");
      return;
    }
  
    try {
      const response = await fetch("/api/admin/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to remove user.");
        return;
      }
  
      const data = await response.json();
      setMessage(`User removed successfully: ${data.message}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      setMessage("Error removing user.");
      console.error(error);
    }
  };


  // Handle role toggle
  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";

    try {
      const roleResponse = await fetch("/api/admin/roleChange", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!roleResponse.ok) {
        const errorData = await roleResponse.json();
        console.error("API error:", errorData.message || errorData);
        setMessage(errorData.error || "Failed to update role.");
        return;
      }

      const data = await roleResponse.json();

      if (roleResponse.status === 200) {
        setMessage(data.message);
      } else if (roleResponse.status === 206) {
        setMessage(data.message);
      }
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      setMessage("Error updating role.");
      console.error(error);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(result);
    setShowTop10(result.length > 10);
  };

  useEffect(() => {
    handleSearch();
  }, [users, roleFilter]); // Re-run filtering when users or role filter changes

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 rounded-lg max-w-7xl mx-auto overflow-auto">
    <h1 className="text-xl font-bold mb-4 text-blue-600 text-center sm:text-left">
      User Role Management
    </h1>
    {message && <p className="text-green-500 mb-4">{message}</p>}
  
    {/* Search and Filter Section */}
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-2 w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search by username, email, or userID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  
    {/* User Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
              Username
            </th>
            <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
              Role
            </th>
            <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 dark:bg-gray-800 text-center">
          {filteredUsers
            .slice(0, showTop10 ? 10 : filteredUsers.length)
            .map((user) => (
              <tr key={user._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-y-2 sm:space-x-2">
                  <button
                    onClick={() => toggleRole(user._id, user.role)}
                    className={`px-4 py-2 rounded min-w-[45%] sm:min-w-[60%] ${
                      user.role === "user"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {user.role === "user" ? "Promote to Admin" : "Demote to User"}
                  </button>
  
                  {roleFilter !== "superadmin" && (
                    <button
                      onClick={() => removeUser(user._id, user.role)}
                      className="px-4 py-2 bg-red-500 text-white rounded w-full sm:w-auto hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  
    {showTop10 && filteredUsers.length > 10 && (
      <button
        onClick={() => setShowTop10(false)}
        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
      >
        Show All
      </button>
    )}
  </div>
  );
}
