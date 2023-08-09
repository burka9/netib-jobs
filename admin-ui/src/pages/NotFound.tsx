const NotFound = () => {
	return (
		<div className="flex items-center justify-center h-screen flex-col">
			<h1 className="font-bold text-3xl text-gray-800">Page Not Found</h1>
			<button onClick={() => window.location.href = '/'}>Home Page</button>
		</div>
	)
}

export default NotFound