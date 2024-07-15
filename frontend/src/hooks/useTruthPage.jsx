import { useEffect, useState } from "react";
import adminServices from "../services/admin_services_api";
import { toast } from "react-toastify";
import axios from "axios";

function useTruthPage(api) {
  const [truthData, setTruthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTruth, setAddTruth] = useState("");
  const [initalSlice, setInitalSlice] = useState(0);
  const [lastSlice, setLastSlice] = useState(9);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTruth, setDrawerTruth] = useState({});
  const fetchTruths = async () => {
    try {
      const data = await adminServices.fetchCategoryTruth(api);
      setTruthData(data[0]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
      setInitalSlice(0);
      setLastSlice(9);
    }
  };
  useEffect(() => {
    fetchTruths();
  }, [api]);
  const handleDeleteTruth = async (id) => {
    await axios.post(`/api/admin/deletetruth`, { id });
    toast.success(`Truth is Delete in the ${truthData.categoryname} Category`, {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      fetchTruths();
      setLoading(true);
    }, 2000);
  };
  const handleAddTruth = async () => {
    try {
      if (addTruth.trim() != "") {
        const truth = {
          categoryname: truthData.categoryname,
          truth: addTruth,
        };
        await axios.post(`/api/admin/addtruth`, truth);
        setAddTruth("");
        toast.success(
          `Truth is Added in the ${truthData.categoryname} Category`,
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          fetchTruths();
          setLoading(true);
        }, 2000);
      } else {
        toast.error("Enter the truth", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      setAddTruth("");

      toast.error(error.response?.data, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const handleAddTruthChange = (e) => {
    setAddTruth(e.target.value);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleDrawerTruth = (value) => {
    setDrawerTruth(value);
  };
  const handleUpdateTruth = async (value) => {
    try {
      console.log(value);
      await axios.patch(`/api/admin/updatetruth`, value);
      toast.success(
        `Truth is Update in the ${truthData.categoryname} Category`,
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
      setTimeout(() => {
        setOpenDrawer(false);
        fetchTruths();
        setLoading(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextSlice = () => {
    setInitalSlice((pv) => pv + 9);
    setLastSlice((pv) => pv + 9);
  };
  const handlePreviousSlice = () => {
    setInitalSlice((pv) => pv - 9);
    setLastSlice((pv) => pv - 9);
  };
  return {
    truthData,
    loading,
    addTruth,
    initalSlice,
    lastSlice,
    openDrawer,
    drawerTruth,
    handleDeleteTruth,
    handleAddTruth,
    handleNextSlice,
    handleUpdateTruth,
    handlePreviousSlice,
    handleDrawerTruth,
    handleCloseDrawer,
    handleOpenDrawer,
    handleAddTruthChange,
  };
}

export default useTruthPage;
