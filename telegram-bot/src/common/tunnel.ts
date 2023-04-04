import axios from 'axios'
import localtunnel from 'localtunnel'
import { SERVER } from './env';

interface Tunnel {
	[key: string]: () => Promise<string>;
}

const tunnel: Tunnel = {
	ngrok: async (): Promise<string> => {
		let origin: string

		try {
			const tunnels = await axios.get('http://localhost:4040/api/tunnels')
			origin = (tunnels).data.tunnels[0].public_url
		} catch {
			throw new Error('no tunnel found')
		}

		return origin
	},
	localtunnel: async (): Promise<string> => {
		const tunnel = await localtunnel({ port: SERVER.PORT })

		return tunnel.url
	}
}

export default tunnel