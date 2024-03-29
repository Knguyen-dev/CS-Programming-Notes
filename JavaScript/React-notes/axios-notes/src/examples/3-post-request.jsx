import { useState } from "react";
import axios from "axios";
const url = "https://course-api.com/axios-tutorial-post";

/*
+ POST Request with axios:
- Here we're making a post request, and sending 


*/

const PostRequest = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(url, {
				name,
			});

			console.log(response.data);
		} catch (err) {
			console.log(err.response);

			console.log("Error message: ", err.response.data.msg);
		}
	};

	return (
		<section>
			<h2 className="text-center">post request</h2>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-row">
					<label htmlFor="name" className="form-label">
						name
					</label>
					<input
						type="text"
						className="form-input"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input
						type="email"
						className="form-input"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-block">
					login
				</button>
			</form>
		</section>
	);
};
export default PostRequest;
