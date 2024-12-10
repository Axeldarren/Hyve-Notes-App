import axios from 'axios';

export const fetchUserData = async () => {
  const token = await getToken();
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getNectarBalance = async () => {
  const userData = await fetchUserData();
  return userData.nectar || 0; // Default to 0 if nectar balance is not set
};

export const getUserLevel = (nectarBalance) => {
  if (nectarBalance < 10) {
    return "Worker Bee"; // Level 1
  } else if (nectarBalance < 50) {
    return "Soldier Bee"; // Level 2
  } else if (nectarBalance < 100) {
    return "Royal Bee"; // Level 3
  } else {
    return "Queen Bee"; // Level 4
  }
};
