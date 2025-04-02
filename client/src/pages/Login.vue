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
			async onSubmit_Login() {
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
			async onSubmit_Register() {
				try {
					await axios.post("/api/auth/register", {
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
	<div class="access-container">
	  <div class="container-login">
		<h2 class="Login">Login</h2>
		<div class="container-user"></div>
		<form @submit.prevent="onSubmit_Login">
		  <li>
			<label for="username">Username</label>
			<input type="text" v-model="username" name="username" />
		  </li>
		  <li>
			<label for="password">Password</label>
			<input type="text" v-model="password" name="password" />
		  </li>
		  <li class="LoginButton">
			<input type="submit" name="submit" value="Confirm" />
		  </li>
		</form>
	  </div>
  
	  <div class="container-register">
		<h2 class="Register">Register</h2>
		<div class="container-user"></div>
		<form @submit.prevent="onSubmit_Register">
		  <li>
			<label for="username">Username</label>
			<input type="text" v-model="username" name="username" />
		  </li>
		  <li>
			<label for="password">Password</label>
			<input type="password" v-model="password" name="password" />
		  </li>
		  <li class="RegisterButton">
			<input type="submit" name="submit" value="Register" />
		  </li>
		</form>
	  </div>
	</div>
  </template>
