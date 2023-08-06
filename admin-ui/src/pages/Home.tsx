import { useState, useEffect } from "react"
import Header from "../components/Header"
import { Routes, Route, useNavigate } from "react-router-dom"
import JobPosts from "./JobPosts"
import Loading from "./Loading"
import { axios } from "../store"
import Sector from "./Sector"

const Home = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [location, setLocation] = useState("")

	useEffect(() => {
		axios.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${localStorage.getItem("netib_jobs_admin_access_token")}`

			return config
		})
		axios.get("/admin/verify")
			.then(response => {
				if (response.data.success) {
					setLoading(false)
				} else {
					navigate("/")
				}
			})
			.catch(err => {
				console.error(err)
				navigate("/")
			})
	}, [])

	return loading ? <Loading /> : (
		<div className="home">
			<Header axios={axios} setLocation={setLocation} />

			<Routes location={location}>
				<Route path="/" element={<JobPosts axios={axios} />} />
				<Route path="/sector" element={<Sector axios={axios} />} />
			</Routes>
		</div>
	)
}

export default Home