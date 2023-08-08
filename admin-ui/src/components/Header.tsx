import { AxiosInstance } from "axios"
import { useNavigate } from "react-router-dom";

type MyProp = {
	axios: AxiosInstance;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ axios, setLocation }: MyProp) => {
	const navigate = useNavigate()

	const links = [
		{ name: "Home", path: "/home/" },
		{ name: "Sector", path: "/home/sector" },
		{ name: "Country", path: "/home/country" },
	]

	const logout = () => {
		axios.get("/admin/logout")
			.then(response => {
				if (response.data.success) {
					localStorage.removeItem("netib_jobs_admin_access_token")
					navigate("/")
				}
			}
		)
		.catch(err => console.error(err))
	}
	
	return (
		<div className="header flex items-center bg-dark p-4 px-8">
			<h4 className="text-light">Dashboard</h4>
			<div className="flex grow justify-center items-center">
				{links.map((link, index) => <button key={index} onClick={() => setLocation(link.path)} className="rounded-none mx-4 border-0">{link.name}</button>)}
			</div>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Header