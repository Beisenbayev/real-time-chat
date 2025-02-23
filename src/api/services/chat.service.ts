import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr'

class SignalRService {
	private readonly url: string = 'http://localhost:3209/messenger/hub'
	private connection: HubConnection | null = null

	constructor() {}

	public onStartConnection(): void {
		if (!this.connection) {
			this.connection = new HubConnectionBuilder()
				.withUrl(this.url)
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build()

			this.connection
				.start()
				.then(() => {
					console.log('chat connected')
				})
				.catch((err) => {
					console.error('chat connection failed: ', err)
				})
		}
	}

	public onMessageReceived(
		callback: (user: string, message: string, createdAt: Date) => void
	): void {
		if (this.connection) {
			this.connection.on('ReceiveMessage', callback)
		}
	}

	public onSendMessage(user: string, message: string): void {
		if (this.connection) {
			this.connection
				.invoke('SendMessage', user, message, new Date())
				.catch((err) => console.error('chat sendMessage error: ', err))
		}
	}

	public onStopConnection(): void {
		if (this.connection) {
			this.connection
				.stop()
				.then(() => {
					console.log('chat disconnected')
				})
				.catch((err) => {
					console.error('chat disconnection failed: ', err)
				})
		}
	}
}

export default SignalRService
