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
	<div class="table-container">
		<div class="container-custom">
				<table class="big-table">
					<caption>Top 3 Clickers</caption>
					<thead>
						<tr>
							<th scope="col">Position</th>
							<th scope="col">Username</th>
							<th scope="col">Points</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in usersTop">
							<th scope="row">n</th>
							<th scope="row">{{ user.name }}</th>
							<th scope="row">{{ user.click_num }}</th>
						</tr>
					</tbody>
				</table>
		</div>

		<div class="container-custom2">
			<table class="small-table">
				<caption>4th - 10th Places</caption>
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Username</th>
						<th scope="col">Points</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in usersOthers">
						<th scope="row">n</th>
						<th scope="row">{{ user.name }}</th>
						<th scope="row">{{ user.click_num }}</th>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
</template>
