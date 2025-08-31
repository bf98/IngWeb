<script lang="ts">

	import { defineComponent } from "vue"
	import axios from "axios"
	import { User} from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
				datiAllUsers: [] as User[],
			}
		},
		methods: {
			getUser() 
			{
				axios.get("/api/current_user/").then(response => this.datiUser = response.data);
			},
			getAllUsers()
			{
				axios.get("/api/users/").then(response => this.datiAllUsers = response.data);
			},
			checkAdmin()
			{
			    if (this.datiUser.isAdmin == 0) {
				this.$router.push("/");
			    }
			},
		},
		created() {
			this.getUser();
			this.getAllUsers();
			this.checkAdmin();
		}
	})

</script>

<template>
    <div v-if="datiUser[0]">
	<div class="container-fluid fill d-flex justify-content-center w-100">
	    <div class="container section p-4">
			<div v-for="user in datiAllUsers">
			<div class="container section p-4" v-if="user.isAdmin === 0">
				<p>{{ user.name }}</p>
				<button>Delete</button>
			</div>
			</div>
	    </div>
	</div>
    </div>
</template>

<style>
</style>
