import { AxiosInstance } from "axios";
import { JobPost } from "../store";
import { Country } from "../pages/Country";

type MyProp = {
	axios?: AxiosInstance;
	jobPost: JobPost;
	decline: (id: number) => void;
	accept: (id: number) => void;
}

const PendingJobPost = ({ jobPost, accept, decline }: MyProp) => {
	console.log(jobPost)

	return (
		<div className="flex flex-col mb-5">
			<div className="m-2 p-3 px-5 shadow-md bg-gray-300 flex flex-col max-w-[465px]">
			<p className="text-sm border-dashed border-b-2 self-start my-3 border-gray-700">Job Details</p>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Title</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.title}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Description</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.description}</p>
				</div>
				<br />
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Job Type</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.description}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Location</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.location}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Sector</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.sector.name}</p>
				</div>
				<br />
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Applicants Needed</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.employeeCount}</p>
				</div>
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">Salary</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.salary}</p>
				</div>
				<br />
				<div className="grid grid-cols-5 gap-x-2">
					<p className="font-[600] col-span-2 text-sm text-gray-800">How To Apply</p>
					<p className="col-span-3 text-gray-500 text-sm">{jobPost.howToApply}</p>
				</div>
				<br />
				{jobPost.company
					? (
						<>
							<p className="text-sm border-dashed border-b-2 self-start my-3 border-gray-700">Company Details</p>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Name</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.name}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Description</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.description}</p>
							</div>
							<br />
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Sector</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.sector?.name}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Employee Count</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.employeeCount}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Location</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company?.city?.name + ", " + (jobPost.company.city?.country as Country).name}</p>
							</div>
							<br />
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Company Email</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.email}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Company Phone</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.company.phone}</p>
							</div>
							<br />
						</>
					)
					: jobPost.owner ? (
						<>
							<p className="text-sm border-dashed border-b-2 self-start my-3 border-gray-700">Private Details</p>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Name</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.owner.telegram?.firstName}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Email</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.owner.email}</p>
							</div>
							<div className="grid grid-cols-5 gap-x-2">
								<p className="font-[600] col-span-2 text-sm text-gray-800">Phone</p>
								<p className="col-span-3 text-gray-500 text-sm">{jobPost.owner.phone}</p>
							</div>
							<br />
						</>
					)
					: null
				}

			</div>
			<div className="flex justify-center">
				<button className="text-sm py-0.5 bg-green-500 shadow border-green-500" onClick={() => accept(Number(jobPost.id))}>Accept</button>
				<button className="text-sm py-0.5 bg-red-500 shadow border-red-500" onClick={() => decline(Number(jobPost.id))}>Decline</button>
			</div>
		</div>
	)
}

export default PendingJobPost