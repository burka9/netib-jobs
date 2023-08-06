import { AxiosInstance } from "axios"
import { useState, useEffect } from "react"
import { JobPost } from "../store"
import PendingJobPost from "../components/PendingJobPost"

const JobPosts = ({ axios }: { axios: AxiosInstance }) => {
	const [list, setList] = useState<JobPost[]>([])
	
	useEffect(() => {
		axios.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${localStorage.getItem("netib_jobs_admin_access_token")}`

			return config
		})

		axios.get("/admin/pending-job-posts")
			.then(response => {
				console.log(response.data)
				setList(response.data.jobPosts)
			})
			.catch(err => {
				console.error(err)
			})
	}, [])
	
	return (
		<div className="job-posts flex flex-col items-center m-8">
			<h4>Review job posts</h4>

			<div className="flex justify-center">
				{list.map(item => <PendingJobPost key={item.id} jobPost={item} />)}
			</div>
		</div>
	)
}

export default JobPosts