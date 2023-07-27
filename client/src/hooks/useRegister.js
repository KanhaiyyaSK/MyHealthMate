import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (
    email,
    password,
    name,
    age,
    gender,
    height,
    weight
  ) => {
    setIsLoading(true);
    setError(null);

<<<<<<< HEAD
    const response = await fetch("http://localhost:4000/api/user/register", {
=======
		const response = await fetch("http://localhost:4000/api/user/register", {
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        age,
        gender,
        height,
        weight,
      }),
    });
<<<<<<< HEAD
    const json = await response.json();
=======
		const json = await response.json();
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
