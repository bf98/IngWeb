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
						username: this.usernameLogin,
						password: this.passwordLogin,
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
						username: this.usernameRegister,
						password: this.passwordRegister,
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
    <div class="container-fluid fill d-flex justify-content-center w-100">
	<div class="row align-items-center">
	    <div class="col-sm text-center">
		<form class="form-box p-4" @submit.prevent="onSubmit_Login">
		    <div class="form-group mt-2">
			<input class="form-control" v-model="usernameLogin" placeholder="Username">
		    </div>
		    <div class="form-group mt-2">
			<input type="password" class="form-control" v-model="passwordLogin" placeholder="Password">
		    </div>
		    <button type="submit" class="btn btn-secondary mt-3">Login</button>
		</form>
	    </div>

	    <div class="col-sm text-center" @submit.prevent="onSubmit_Register">
		<form class="form-box p-4">
		    <div class="form-group mt-2">
			<input class="form-control" v-model="usernameRegister" placeholder="Username">
		    </div>
		    <div class="form-group mt-2">
			<input type="password" class="form-control" v-model="passwordRegister" placeholder="Password">
		    </div>
		    <button type="submit" class="btn btn-secondary mt-3">Sign-up</button>
		</form>
	    </div>
	</div>
    </div>
</template>
