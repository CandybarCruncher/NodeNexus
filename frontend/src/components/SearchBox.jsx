import { useState, useEffect, useRef } from "react";
import config from "../../config";
import _ from "lodash";
import { Box, Stack } from "@mui/material";
import ContactCard from "./ContactCard";
import AddUserBtn from "./buttons/AddUserBtn";

const SearchBox = () => {
	const [query, setQuery] = useState("");
	const [users, setUsers] = useState([]);

	const fetchUsers = async (searchQuery) => {
		try {
			const { data } = await config.get(`/api/usr/users?search=${searchQuery}`);
			setUsers(data);
		} catch (error) {
			console.error(error);
		}
	};

	const debouncedFetchUsers = _.debounce(fetchUsers, 500);

	useEffect(() => {
		if (query) {
			debouncedFetchUsers(query);
		}
	}, [query]);

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	return (
		<>
			<Stack>
				<Box
					position={"relative"}
					width={"26rem"}
				>
					<input
						className="form-control rounded-xl bg-[#1f2833] text-white focus:bg-[#1f2833]"
						type="search"
						placeholder="&#128269; Search"
						aria-label="Search"
						onChange={handleChange}
						value={query}
					/>
					{query.length > 2 && users.length > 0 && (
						<Box
							sx={{
								position: "absolute",
								top: "100%",
								left: 0,
								width: "100%",
								bgcolor: "#0b0c10",
								border: "1px solid #45a29e",
								borderRadius: "10px",
								mt: 1,
								zIndex: 10,
								maxHeight: "20rem",
								overflowY: "auto",
								scrollbarWidth: "thin",
							}}
						>
							{users.map((user) => (
								<Box
									key={user._id}
									sx={{
										padding: "8px",
									}}
								>
									<Stack
										direction="row"
										alignItems={"center"}
										justifyContent={"space-between"}
									>
										<ContactCard chatDetails={user} />
										<AddUserBtn userId={user._id} />
									</Stack>
								</Box>
							))}
						</Box>
					)}
				</Box>
			</Stack>
		</>
	);
};

export default SearchBox;
