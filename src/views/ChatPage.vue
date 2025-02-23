<template>
	<ion-page class="chat-page">
		<ion-content class="chat-page__content ion-padding">
			<div class="chat-page__content-inner">
				<div class="chat-page__messages">
					<chat-message
						class="chat-page__messages-item"
						v-for="(item, index) in messages"
						:key="index"
						:username="item.user"
						:text="item.message"
						:date="item.createdAt"
					/>
				</div>

				<chat-input class="chat-page__panel" @on-send="onSendMessage" />
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonContent, IonPage } from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'

import ConstService from '@/shared/services/const.service'
import SignalRService from '@/api/services/chat.service'
import { IMessage } from '@/api/interfaces/chat.interface'

import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

const router = useRouter()

const username: Ref<string> = ref('')
const messages: Ref<IMessage[]> = ref([])

// Создание экземпляра сервиса SignalR для обработки связи с сервером
const signalRService: SignalRService = new SignalRService()

/**
 * При onMounted компонента:
 * - Проверяет сохраненный никнейм в Preferences.
 * - Если никнейм найден, устанавливает его в состояние.
 * - Если никнейм не найден, перенаправляет пользователя на страницу авторизации.
 * - Инициализирует подключение к SignalR.
 */
onMounted(async () => {
	const nickname = await Preferences.get({ key: ConstService.nickname })

	if (nickname.value) {
		username.value = nickname.value
	} else {
		router.replace('/auth')
	}

	signalRService.onStartConnection()
})

/**
 * При onBeforeUnmount компонента:
 * - Останавливает соединение с SignalR.
 */
onBeforeUnmount(() => {
	signalRService.onStopConnection()
})

/**
 * Обработчик отправки сообщения.
 * - Добавляет новое сообщение в список сообщений.
 * - Отправляет сообщение через SignalR.
 *
 * @param {string} message - Текст отправляемого сообщения.
 */
const onSendMessage = (message: string): void => {
	messages.value.push({
		user: username.value,
		message,
		createdAt: new Date(),
	})

	signalRService.onSendMessage(username.value, message)
}
</script>

<style scoped lang="scss">
.chat-page {
	&__content {
		--background: #f4f7f9;

		&-inner {
			display: flex;
			flex-direction: column;
			column-gap: 32px;
			height: 100%;
		}
	}

	&__messages {
		flex: 1;
		overflow-y: auto;

		&-item {
			& + & {
				margin-top: 16px;
			}
		}
	}
}
</style>
