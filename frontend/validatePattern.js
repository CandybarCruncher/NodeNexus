export const validate = (formData, requiredFields) => {
	const newErrors = {};

	if (requiredFields.includes("name") && !formData.name) {
		newErrors.name = "Name is required";
	} else if (
		requiredFields.includes("name") &&
		!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(formData.name)
	) {
		newErrors.name = "Please enter a valid full name.";
	}

	if (requiredFields.includes("chatname") && !formData.chatName) {
		newErrors.name = "Name is required";
	} else if (
		requiredFields.includes("chatname") &&
		!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(formData.chatName)
	) {
		newErrors.name = "Please enter a valid name.";
	}

	if (requiredFields.includes("email") && !formData.email) {
		newErrors.email = "Email is required";
	} else if (
		requiredFields.includes("email") &&
		!/^\S+@\S+\.\S+$/.test(formData.email)
	) {
		newErrors.email = "Please enter a valid email address.";
	}

	if (requiredFields.includes("username") && !formData.username) {
		newErrors.username = "Username is required";
	} else if (
		requiredFields.includes("username") &&
		!/^[A-Za-z0-9_]{5,15}$/.test(formData.username)
	) {
		newErrors.username =
			"Username should be 5-15 characters long and can contain letters, numbers, and underscores.";
	}

	if (requiredFields.includes("password") && !formData.password) {
		newErrors.password = "Password is required";
	} else if (
		requiredFields.includes("password") &&
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
			formData.password
		)
	) {
		newErrors.password =
			"Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
	}

	return newErrors;
};
