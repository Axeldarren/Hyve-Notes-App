// nectarUtils.js
export const getNectarBalance = () => {
    const balance = localStorage.getItem("nectarBalance");
    return balance ? parseInt(balance) : 0; // Default to 0 if not set
  };
  
export const setNectarBalance = (amount) => {
    localStorage.setItem("nectarBalance", amount);
};

export const getUserLevel = () => {
  const nectarBalance = getNectarBalance();

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