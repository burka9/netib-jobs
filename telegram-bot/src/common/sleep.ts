export default async function(delay = 1500): Promise<boolean> {
	return new Promise<boolean>(resolve => setTimeout(() => {
		resolve(true)
	}, delay))
}
