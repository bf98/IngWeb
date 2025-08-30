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
    <div v-if="datiUser[0]">
	<div class="container-fluid fill d-flex justify-content-center w-100">
	    <div class="row align-items-center" style="position:absolute; padding-top:10%; padding-bottom:auto%; padding-left:15%; padding-right:15%; height:100px; justify-content:center">
		<div class="container-fluid justify-content-center row align-items-center">
		<div class="col">
		    <div class="container-flex section p-4">
			<p>Your Username: {{ datiUser[0].name }}</p>
			<p>Your Clicks: {{ datiUser[0].click_num }}</p>
			<button class="nav-item button is-primary" @click="logout">
			    Log-Out
			</button>
		    </div>
		</div>
		<div class="col">
		    <div class="container-flex section p-4">
			<p>Achievements</p>
			<div v-if="datiAchievements[0].achievement_1 == 0 && datiAchievements[0].achievement_2 == 0 && datiAchievements[0].achievement_3 == 0">
			    You have no achievements.
			</div>
			<div v-if="datiAchievements[0].achievement_1">
			    <img src="../assets/img/back_bronze.png">
			</div>
			<div v-if="datiAchievements[0].achievement_2">
			    <img src="../assets/img/back_silver.png">
			</div>
			<div v-if="datiAchievements[0].achievement_3">
			    <img src="../assets/img/back_gold.png">
			</div>

			<!-- DA FARE -->
			<div class="progress-bar">
			    <div class="progress" style="width: 70%; background: darkgreen;"></div>
			</div>
			<p class="text-center"> achievement bar </p>
			<div class="progress-bar">
			    <div class="progress" style="width: 70%; background: darkgreen;"></div>
			</div>
			<p class="text-center"> achievement bar </p>
			<div class="progress-bar">
			    <div class="progress" style="width: 70%; background: darkgreen;"></div>
			</div>
			<p class="text-center"> achievement bar </p>
		    </div>
		</div>
	    </div>
	    <div class="row align-items-center">
		<div class="col">
		    <div class="container-flex section mx-auto m-4 p-4" style="position:relative;max-width:50%;max-height:150px;text-align:center;overflow-y:scroll">
			<p>Friend List</p>
			<div v-if="datiFriends[0]">
			    <!-- DA IMPLEMENTARE --> 
				<p v-for="friend in datiFriends">
					<a :href="`profile/${friend.id}`">{{ friend.name }}</a>
				</p>
			</div>
			<div v-else>
			    <p>The friend list is empty.</p>
			</div>
		    </div>
		</div>
	    </div>
	</div>
	</div>
	</div>
    <div v-else>
	<div class="container-fluid fill d-flex justify-content-center w-100">
	    <div class="row align-items-center">
		<div class="col">
		    <div class="container-flex section p-4">
			<p><a href="/login">Login / Sign Up</a></p>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>

<style>
    .progress-bar {
	height: 20px;
	border-radius: 10px;
	position: relative;
    }

    .progress {
	height: 100%;
	border-radius: 10px;
	background: darkgreen;
	width: 0%;
	position: relative;
    }
</style>
