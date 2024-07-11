import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import kids from "../assets/children.png";
import teens from "../assets/teenagers.png";
import adults from "../assets/couple.png";
import profile from "../assets/profile.png";
import axios from "axios";
import Loader from "../components/Loader";
import adminServices from "../services/admin_services_api";
function AdminPanel() {
  const [truthList, setTruthList] = useState([]);
  const [userList, setUserList] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    const allTruth = await adminServices.fetchAllTruths();
    const userList = await adminServices.fetchAllUsers();
    setTruthList(allTruth);
    setUserList(userList?.length || 0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    fetchDashboardData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="bg-gray-100">
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {truthList.map((truth, index) => (
            <Card
              key={index}
              imgScr={
                truth.categoryname.toLowerCase() === "kids"
                  ? kids
                  : truth.categoryname.toLowerCase() === "teens"
                  ? teens
                  : truth.categoryname.toLowerCase() === "adults"
                  ? adults
                  : null
              }
              totalTruth={truth.truths.length}
              cardTitle={`${truth.categoryname} Truths`}
            />
          ))}
          <Card imgScr={profile} totalTruth={userList} cardTitle="User" />
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
