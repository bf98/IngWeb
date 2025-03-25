<script lang="ts">
	import axios from "axios"
	import { defineComponent } from "vue"

	export default defineComponent({
		data() {
			return {
				username: "",
				password: "",
			}
		},
		methods: {
			async onSubmit() {
				try {
					await axios.post("/api/auth/login", {
						username: this.username,
						password: this.password,
					})
					location.href = "/"
				} catch (e: any) {
					if (e.response) {
						alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
					}
					else {
						alert(e.message)
					}
				}
			},
		},
	})
</script>

<template>
	<h2>Login</h2>
	<form @submit.prevent="onSubmit">
		<ul>
			<li>
				<label for="username">Username</label>
				<input type="text" v-model="username" name="username" />	
			</li>
			<li>
				<label for="password">Password</label>
				<input type="text" v-model="password" name="password" />	
			</li>
			<li>
				<input type="submit" name="submit" value="Login" />
			</li>
		</ul>
	</form>
</template>
