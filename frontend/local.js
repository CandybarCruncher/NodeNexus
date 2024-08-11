const stored = "";

export const setUserData = (userData) => {
	localStorage.setItem(stored, JSON.stringify(userData.data));
	// console.log(`stored ${JSON.stringify(userData.data)}`);
};

export const getUserData = () => {
	const userData = localStorage.getItem(stored);
	return userData ? JSON.parse(userData) : null;
};

export const clearUserData = () => {
	localStorage.removeItem(stored);
};
