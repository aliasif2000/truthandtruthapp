import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import kids from "../assets/children.png";
import teens from "../assets/teenagers.png";
import adults from "../assets/couple.png";
import profile from "../assets/profile.png";
import Loader from "../components/Loader";
import adminServices from "../services/admin_services_api";
import Table from "../components/Table/Table";

function AdminPanel() {
  const [truthList, setTruthList] = useState([]);
  const [userList, setUserList] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const allTruth = await adminServices.fetchAllTruths();
        const userList = await adminServices.fetchAllUsers();
        setTruthList(allTruth);
        setUserList(userList?.length || 0);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    })();
  }, []);
  if (loading) {
    return <Loader />;
  }
  const defaultCategory = [
    { categoryname: "Kids" },
    { categoryname: "Teens" },
    { categoryname: "Adults" },
  ];
  return (
    <div className="flex justify-center bg-gray-100">
      <main className="container  px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-6">
          {(truthList.length !== 0 ? truthList : defaultCategory)?.map(
            (truth, index) => (
              <Card
                key={index}
                imgScr={
                  truth?.categoryname?.toLowerCase() === "kids"
                    ? kids
                    : truth.categoryname.toLowerCase() === "teens"
                    ? teens
                    : truth.categoryname.toLowerCase() === "adults"
                    ? adults
                    : null
                }
                totalTruth={truth?.truths?.length || 0}
                cardTitle={`${truth.categoryname || truth} Questions`}
              />
            )
          )}
          <Card imgScr={profile} totalTruth={userList} cardTitle="User" />
        </div>

        {truthList?.map((truthData, index) => (
          <div key={index} className="mt-6">
            <h1 className="text-xl font-semibold mb-2">
              {truthData.categoryname + " Questions :"}
            </h1>
            <Table
              columns={["ID", "Category", "Question"]}
              data={truthData}
              initialSlice={0}
              lastSlice={4}
              className="w-full"
            />
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminPanel;
