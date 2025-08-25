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
    <div class="container-fluid fill d-flex justify-content-center w-100">
	<div class="row align-items-center">
		<div class="col text-center">
		  <table class="table">
			  <thead>
				  <tr scope="col">Position</tr>
				  <tr scope="col">User</tr>
				  <tr scope="col">Score</tr>
			  </thead>	
			  <tbody>
				  <tr>
					  <th scope="row">1</th>
					  <td>User</td>
					  <td>Num</td>
				  </tr>
				  <tr>
					  <th scope="row">2</th>
					  <td>User</td>
					  <td>Num</td>
				  </tr>
			  </tbody>
		  </table>
		  <table class="table table-box">
			  <thead>
				  <tr scope="col">Position</tr>
				  <tr scope="col">User</tr>
				  <tr scope="col">Score</tr>
			  </thead>	
			  <tbody>
				  <tr>
					  <th scope="row">1</th>
					  <td>User</td>
					  <td>Num</td>
				  </tr>
				  <tr>
					  <th scope="row">2</th>
					  <td>User</td>
					  <td>Num</td>
				  </tr>
			  </tbody>
		  </table>
		</div>
	</div>
	</div>
</template>
