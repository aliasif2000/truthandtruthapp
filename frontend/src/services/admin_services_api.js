import axios from "axios";

class AdminServices {
  async fetchCategoryTruth(api) {
    try {
      const { data } = await axios.get(`/api/admin/${api}`);
      return data;
    } catch (error) {
      console.error("Error fetching category truth:", error);
      throw error;
    }
  }

  async fetchAllTruths() {
    try {
      const { data } = await axios.get("/api/admin/gettruth");
      return data;
    } catch (error) {
      console.error("Error fetching all truths:", error);
      throw error;
    }
  }

  async fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/admin/getalluser");
      return data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
}

const adminServices = new AdminServices();
export default adminServices;
