import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr'

/**
 * Сервис для работы с SignalR, обеспечивающий подключение, отправку и получение сообщений.
 * @class
 */
class SignalRService {
	/** URL для подключения к SignalR хабу. */
	private readonly url: string = 'http://localhost:3209/messenger/hub'

	/** Соединение с SignalR хабом. */
	private connection: HubConnection | null = null

	constructor() {}

	/**
	 * Инициализирует соединение с SignalR хабом и начинает его.
	 * @public
	 * @method
	 */
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

	/**
	 * Регистрирует колбэк для обработки входящих сообщений.
	 * @param {function} callback - Функция, которая будет вызвана при получении нового сообщения.
	 * @param {string} callback.user - Имя пользователя, отправившего сообщение.
	 * @param {string} callback.message - Текст полученного сообщения.
	 * @param {Date} callback.createdAt - Время, когда сообщение было отправлено.
	 * @public
	 * @method
	 */
	public onMessageReceived(callback: (user: string, message: string) => void): void {
		if (this.connection) {
			this.connection.on('ReceiveMessage', callback)
		}
	}

	/**
	 * Отправляет сообщение на сервер SignalR.
	 * @param {string} user - Имя пользователя, отправляющего сообщение.
	 * @param {string} message - Текст отправляемого сообщения.
	 * @public
	 * @method
	 */
	public onSendMessage(user: string, message: string): void {
		if (this.connection) {
			this.connection
				.invoke('SendMessage', user, message)
				.catch((err) => console.error('chat sendMessage error: ', err))
		}
	}

	/**
	 * Останавливает соединение с SignalR хабом.
	 * @public
	 * @method
	 */
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
