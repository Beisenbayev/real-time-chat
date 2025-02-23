<template>
	<div class="chat-message">
		<b class="chat-message__username"> {{ props.username }}</b>

		<p class="chat-message__text">
			{{ props.text }}
		</p>

		<span class="chat-message__date">
			{{ props.date.toLocaleString() }}
		</span>
	</div>
</template>

<script setup lang="ts">
/**
 * Свойства, передаваемые в компонент для отображения сообщения.
 * @typedef {Object} Props
 * @property {string} username - Имя пользователя, отправившего сообщение.
 * @property {string} text - Текст сообщения.
 * @property {Date} date - Дата и время отправки сообщения.
 */
const props = defineProps<{
	username: string
	text: string
	date: Date
}>()
</script>

<style scoped lang="scss">
.chat-message {
	width: fit-content;
	max-width: 80%;
	padding: 4px 8px;
	border-radius: 6px;
	background: #b3d8a8;

	&__username {
		font-size: 14px;
		font-weight: 600;
		line-height: 18px;
		color: #2c2c2e;
	}

	&__text {
		margin: 4px 0 8px;
		font-size: 14px;
		line-height: 20px;
		color: #2c2c2e;
	}

	&__date {
		display: inline-block;
		width: 100%;
		font-size: 12px;
		line-height: 12px;
		text-align: right;
		color: #666668;
	}
}
</style>
