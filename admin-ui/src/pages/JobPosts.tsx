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
				setList(response.data.jobPosts)
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	const accept = (id: number) => {
		axios.post("/admin/accept-job-post", { id })
			.then(response => {
				if (response.data.success) {
					setList(list.filter(item => item.id !== id))
				}
			})
			.catch(err => console.error(err))
	}

	const decline = (id: number) => {
		axios.post("/admin/decline-job-post", { id })
			.then(response => {
				if (response.data.success) {
					setList(list.filter(item => item.id !== id))
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<div className="job-posts flex flex-col items-center m-8">
			<h4 className="mb-10">Review job posts</h4>

			<div className="flex justify-center flex-col">
				{list.map(item => <PendingJobPost accept={accept} decline={decline} key={item.id} axios={axios} jobPost={item} />)}
			</div>
		</div>
	)
}

export default JobPosts