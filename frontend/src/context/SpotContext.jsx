import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SpotContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function SpotProvider({ children }) {
  const [spots, setSpots] = useState([]);

  // GET all spots
  const fetchSpots = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/spots`);
      setSpots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ADD spot (MISSING PART)
  const addSpot = async (name) => {
    try {
      const res = await axios.post(`${API_URL}/api/spots`, {
        name,
      });

      // instantly update UI
      setSpots((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // (optional) DELETE spot
  const deleteSpot = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/spots/${id}`);

      setSpots((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  return (
    <SpotContext.Provider value={{ spots, addSpot, deleteSpot }}>
      {children}
    </SpotContext.Provider>
  );
}

export const useSpots = () => useContext(SpotContext);
