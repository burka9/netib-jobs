import { AxiosInstance } from "axios"
import { useNavigate } from "react-router-dom";

type MyProp = {
	axios: AxiosInstance;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ axios, setLocation }: MyProp) => {
	const navigate = useNavigate()

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
				<button onClick={() => setLocation("/home/")} className="rounded-none mx-4">Home</button>
				<button onClick={() => setLocation("/home/sector")} className="rounded-none mx-4">Sector</button>
				<button onClick={() => setLocation("/home/country")} className="rounded-none mx-4">Country</button>
			</div>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Header