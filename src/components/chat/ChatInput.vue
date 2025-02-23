<template>
	<div class="chat-input">
		<ion-input v-model="message" placeholder="Enter message"></ion-input>

		<ion-button class="auth-page__form-btn" :disabled="!message" @click="onSend">
			<ion-icon slot="icon-only" :icon="send"></ion-icon>
		</ion-button>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { IonInput, IonButton, IonIcon } from '@ionic/vue'
import { send } from 'ionicons/icons'

const message: Ref<string> = ref('')

const emits = defineEmits(['on-send'])

/**
 * Обработчик отправки сообщения.
 * - Отправляет введенное сообщение через событие `on-send`.
 * - Очищает поле ввода после отправки.
 *
 * @returns {void}
 */
const onSend = (): void => {
	emits('on-send', message.value)

	message.value = ''
}
</script>

<style scoped lang="scss">
.chat-input {
	display: flex;
	align-items: center;
}
</style>
