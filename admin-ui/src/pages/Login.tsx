import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios } from "../store"
import Loading from "./Loading"

const Login = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [requesting, setRequesting] = useState(false)

	const login = () => {
		if (username === "" || password === "") return setMessage("Fill missing fields")

		setRequesting(true)

		axios.post("/admin/login", { username, password })
			.then(response => {
				if (response.data.success) {
					localStorage.setItem("netib_jobs_admin_access_token", response.data.access_token)
					console.log(response.data.access_token)
					navigate("/home")
				}
			})
			.catch(err => {
				console.error(err)
				setPassword("")
				setMessage(err.response && err.response.data ? err.response.data.message : "Something went wrong")
				setRequesting(false)
			})
	}

	useEffect(() => {
		axios.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${localStorage.getItem("netib_jobs_admin_access_token")}`

			return config
		})
		axios.get("/admin/verify")
			.then(response => {
				if (response.data.success) {
					navigate("/home")
				} else {
					setLoading(false)
				}
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}, [])

	return loading ? <Loading /> : (
		<div className="centered-col">
			<h3 className="mb-8">Login</h3>
			<div className="flex flex-col items-center">
				<input className="w-full" value={username} disabled={requesting} onKeyDown={e => {
					if (e.key === "Enter") login()
				}} onChange={e => {
					setUsername(e.target.value)
				}} type="text" placeholder="Username" />
				<input className="w-full" value={password} disabled={requesting} onKeyDown={e => {
					if (e.key === "Enter") login()
				}} onChange={e => {
					setPassword(e.target.value)
				}} type="password" placeholder="Password" />
				<button className="w-full" onClick={login} disabled={requesting}>Login</button>
				<p className="text-red-600">{message}</p>
			</div>
		</div>
	)
}

export default Login