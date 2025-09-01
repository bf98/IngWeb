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
			async deleteUser(userId: number)
			{
				axios.post(`/api/delete_user/${userId}`);
			},
			async deleteItems(userId: number)
			{
				axios.post(`/api/delete_items/${userId}`);
			},
			async deleteFriends(userId: number)
			{
				axios.post(`/api/delete_friends/${userId}`);
			},
			deleteAll(userId: number)
			{
			    this.deleteUser(userId);
			    this.deleteItems(userId);
			    this.deleteFriends(userId);
			    this.$router.go(0);
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
		    <table class="table table-dark table-striped" >
			<thead>
			    <tr>
				<th>ID</th>
				<th>Name</th>
				<th>Actions</th>
			    </tr>
			</thead>
			<tbody v-for="user in datiAllUsers">
			    <tr v-if="user.isAdmin === 0" :key="user.id">
				<td>{{ user.id }}</td>
				<td>{{ user.name }}</td>
				<td>
				    <button class="btn btn-danger" @click="deleteAll(user.id)">Delete</button>
				</td>
			    </tr>
			</tbody>
		    </table>
	    </div>
	</div>
    </div>
</template>

<style>
</style>
