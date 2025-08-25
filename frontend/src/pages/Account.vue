<script lang="ts">
	
	import { defineComponent } from "vue"
	import axios from "axios"
	import { User, AchievementsList } from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
				datiAchievements: [] as AchievementsList[], 
				datiFriends: [] as User[],
			}
		},
		methods: {
			getUser() 
			{
				axios.get("/api/current_user/").then(response => this.datiUser = response.data);
			},
			getAchievements()
			{
				axios.get("/api/get_achievements/").then(response => this.datiAchievements = response.data);
			},
			getFriends()
			{
				axios.get("/api/get_friends").then(response => this.datiFriends = response.data);
			},
			logout() {
				axios.post("/api/auth/logout/");

				// torna alla home
				this.$router.push("/login");
			}
		},
		mounted() {
			this.getUser();
			this.getAchievements();
			this.getFriends();
		}
	})

</script>

<template>
    <div class="container-fluid fill d-flex justify-content-center w-100">
	<div class="row align-items-center">
	    <div class="col-sm text-center">
		<form class="form-box p-4">
		    <div class="form-group mt-2">
			<input class="form-control" placeholder="Username">
		    </div>
		    <div class="form-group mt-2">
			<input type="password" class="form-control" placeholder="Password">
		    </div>
		    <button type="submit" class="btn btn-secondary mt-3">Login</button>
		</form>
	    </div>
	    <div class="col-sm text-center">
		<form class="form-box p-4">
		    <div class="form-group mt-2">
			<input class="form-control" placeholder="Username">
		    </div>
		    <div class="form-group mt-2">
			<input type="password" class="form-control" placeholder="Password">
		    </div>
		    <button type="submit" class="btn btn-secondary mt-3">Sign-up</button>
		</form>
	    </div>
	</div>
    </div>
</template>

