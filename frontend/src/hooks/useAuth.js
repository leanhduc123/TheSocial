import { useEffect, useContext } from "react";
import { useAsync } from "react-hook-async";
import axios from "axios";

import { AuthUserCtx } from "../context/authUser";

const fetchMeApi = (jwt) => {
  return axios
    .get("http://10.1.8.202:5000/auth/me", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((res) => res.data);
};

export const useAuth = () => {
  const [fetchMeApiData, executeFetchMe] = useAsync({}, fetchMeApi);
  const { setAuthUser } = useContext(AuthUserCtx);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    executeFetchMe(jwt).then((user) => {
      setAuthUser(user);
    });
  }, [executeFetchMe, setAuthUser]);

  return fetchMeApiData;
};
