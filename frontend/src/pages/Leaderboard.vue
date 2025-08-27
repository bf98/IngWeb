<script lang="ts">

    import { defineComponent } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {
				usersTop: [] as User[],
				usersOthers: [] as User[],
			}
		},
		methods: {
			getLeaderboard() {
				axios.get("/api/leaderboard_top3/").then(response => this.usersTop = response.data) 
				axios.get("/api/leaderboard_others/").then(response => this.usersOthers = response.data) 
			}
		},
		mounted() {
			this.getLeaderboard()
		}
	})

</script>

<template>
    <div class="container-fluid fill d-flex justify-content-center">
	<div class="row align-items-center w-50">
	    <div class="col">
		<div class="container-flex section p-4">
		    <table class="table table-dark table-striped">
			<thead class="thead-dark">
			    <tr scope="col">Position</tr>
			    <tr scope="col">User</tr>
			    <tr scope="col">Score</tr>
			</thead>	
			<tbody>
			    <tr v-for="user in usersTop">
				<th scope="row">n</th>
				<td><a :href="`profile/${ user.id }`">{{ user.name }}</a></td>
				<td>{{ user.click_num }}</td>
			    </tr>
			</tbody>
		    </table>
		    <table class="table table-dark table-striped">
			<thead>
			    <tr scope="col">Position</tr>
			    <tr scope="col">User</tr>
			    <tr scope="col">Score</tr>
			</thead>	
			<tbody>
			    <tr v-for="user in usersOthers">
				<th scope="row">n</th>
				<td>{{ user.name }}</td>
				<td>{{ user.click_num }}</td>
			    </tr>
			</tbody>
		    </table>
		</div>
	    </div>
	</div>
    </div>
</template>
