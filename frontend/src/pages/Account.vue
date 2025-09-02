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
				datiItems: [] as ItemsList[],
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
			getItems()
			{
				axios.get("/api/get_items").then(response => this.datiItems = response.data);
			},
			logout() {
				axios.post("/api/auth/logout/");

				// torna alla home
				this.$router.push("/login");
			},
			goto_ControlPanel() {
				this.$router.push("/controlpanel");
			},
			calculateBar1Width() {
				const widthValue = this.datiItems[0].item1 / 100;
				if (widthValue >= 1.0) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
			calculateBar2Width() {
				const widthValue = this.datiItems[0].item2 / 100;
				if (widthValue >= 1.0) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
			calculateBar3Width() {
				const widthValue = this.datiItems[0].item3 / 100;
				if (widthValue >= 1.0) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
			showItem1Count() {
			    if (this.datiItems[0].item1 < 100) {
				return this.datiItems[0].item1;
			    }
			    else {
				return 100;
			    }
			},
			showItem2Count() {
			    if (this.datiItems[0].item2 < 100) {
				return this.datiItems[0].item2;
			    }
			    else {
				return 100;
			    }
			},
			showItem3Count() {
			    if (this.datiItems[0].item3 < 100) {
				return this.datiItems[0].item3;
			    }
			    else {
				return 100;
			    }
			},
		},
		mounted() {
			this.getUser();
			this.getAchievements();
			this.getFriends();
			this.getItems();
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
			<p>Total Score: {{ datiUser[0].score }}</p>
			<button class="nav-item button is-primary" @click="logout">
			    Log-Out
			</button>
		    </div>
		    <div v-if="datiUser[0].isAdmin" class="container-flex section p-4">
			<button class="nav-item button is-primary" @click="goto_ControlPanel">
			    Enter ControlPanel 
			</button>
		    </div>
		</div>
		<div class="col">
		    <div class="container-flex section p-4">
			<p>Achievements</p>

			<!-- PROBABILMENTE DA TOGLIERE -->
			<!--
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
			-->

			<!-- DA FARE -->
			<p class="text-center"> Upgrade Virus 1: {{ showItem1Count() }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar1Width() }"></div>
			</div>
			<p class="text-center"> Upgrade Virus 2: {{ showItem2Count() }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar2Width() }"></div>
			</div>
			<p class="text-center"> Upgrade Virus 3: {{ showItem3Count() }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar3Width() }"></div>
			</div>
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
