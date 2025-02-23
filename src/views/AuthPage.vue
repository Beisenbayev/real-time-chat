<template>
	<ion-page class="auth-page">
		<ion-content class="auth-page__content ion-padding">
			<div class="auth-page__content-inner">
				<div class="auth-page__form">
					<ion-input
						v-model="nickname"
						class="auth-page__form-input"
						label="Nickname"
						label-placement="stacked"
						fill="outline"
						placeholder="Enter nickname"
					></ion-input>

					<ion-button
						class="auth-page__form-btn"
						:disabled="!nickname"
						@click="onSave"
					>
						Save
					</ion-button>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'

import ConstService from '@/shared/services/const.service'

const router = useRouter()

const nickname: Ref<string> = ref('')

const onSave = async (): Promise<void> => {
	await Preferences.set({
		key: ConstService.nickname,
		value: nickname.value,
	})

	router.replace('/chat')
}
</script>

<style scoped lang="scss">
.auth-page {
	&__content {
		--background: #f4f7f9;

		&-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}

	&__form {
		width: 280px;

		&-input {
			--border-width: 1px;
		}

		&-btn {
			width: 100%;
			margin: 12px 0 0 0;
		}
	}
}
</style>
