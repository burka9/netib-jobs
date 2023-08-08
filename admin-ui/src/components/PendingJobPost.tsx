import { AxiosInstance } from "axios";
import { JobPost } from "../store";

type MyProp = {
	axios?: AxiosInstance;
	jobPost: JobPost;
	decline: (id: number) => void;
	accept: (id: number) => void;
}

const PendingJobPost = ({ jobPost, accept, decline }: MyProp) => {
	return (
		<div className="flex flex-col mb-5">
			<div className="m-2 p-3 px-5 shadow-md bg-gray-300 flex flex-col max-w-[465px]">
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Title</p>
					<p className="col-span-3">{jobPost.title}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Description</p>
					<p className="col-span-3">{jobPost.description}</p>
				</div>
				<br />
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Job Type</p>
					<p className="col-span-3">{jobPost.description}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Location</p>
					<p className="col-span-3">{jobPost.location}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Sector</p>
					<p className="col-span-3">{jobPost.sector.name}</p>
				</div>
				<br />
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Applicants Needed</p>
					<p className="col-span-3">{jobPost.employeeCount}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-bold col-span-2">Salary</p>
					<p className="col-span-3">{jobPost.salary}</p>
				</div>
			</div>
			<div className="flex justify-center">
				<button className="bg-green-500 shadow border-green-500" onClick={() => accept(Number(jobPost.id))}>Accept</button>
				<button className="bg-red-500 shadow border-red-500" onClick={() => decline(Number(jobPost.id))}>Decline</button>
			</div>
		</div>
	)
}

export default PendingJobPost