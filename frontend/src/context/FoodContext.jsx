import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const FoodContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  // GET FOODS
  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/foods`
      );

      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // ADD FOOD
  const addFood = async (food) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/foods`,
        food
      );

      setFoods((prev) => [
        ...prev,
        res.data,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE FOOD
  const updateFood = async (id, foodData) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/foods/${id}`,
        foodData
      );

      setFoods((prev) =>
        prev.map((food) =>
          food._id === id ? res.data : food
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE FOOD
  const deleteFood = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/foods/${id}`
      );

      setFoods((prev) =>
        prev.filter(
          (food) => food._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        addFood,
        updateFood,
        deleteFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFoods() {
  return useContext(FoodContext);
}
