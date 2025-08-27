<script lang="ts">

    import { defineComponent, defineProps } from "vue"
	import axios from "axios"
	import { User, AchievementsList } from "../types"

	export default defineComponent({
		data() {
			return {
			    datiUser: [] as User[],
			    datiProfile: [] as User[],
			    datiAchievements: [] as AchievementsList[],
			}
		},
		props: {
			userId: {
				type: String,
				required: true,
			}
		},
		methods: {
			getUser() 
			{
				axios.get("/api/auth/profile").then(response => this.datiUser = response.data);
			},
			checkProfile() {
			    if (this.datiUser) {
				if (this.datiUser.id == this.userId) {
				    this.$router.push("/account");
				}
			    }
			},
			getProfile() 
			{
				axios.get(`/api/users/${this.userId}`).then(response => this.datiProfile = response.data);
			},
			getAchievements() {
			    
				axios.get(`/api/achievements/${this.userId}`).then(response => this.datiAchievements = response.data);
			},
		},
		mounted() {
			this.getUser();
			this.getProfile();
			this.getAchievements();
			this.checkProfile();
		}

	})

</script>

<template>
    <div v-if="datiProfile[0]">
	<div class="container fill d-flex justify-content-center">
	    <div class="row align-items-center">
		<div class="col">
		    <div class="container section p-4">
			<p>Username: {{ datiProfile[0].name }}</p>
			<p>Click Number: {{ datiProfile[0].click_num }}</p>
			<button class="nav-item button is-primary" v-if="datiUser.id != userId">
			    Add Friend
			</button>
		    </div>
		</div>
		<div class="col">
		    <div class="container-flex section p-4">
			<p>Achievements</p>
			<div v-if="datiAchievements[0].achievement_1 == 0 && datiAchievements[0].achievement_2 == 0 && datiAchievements[0].achievement_3 == 0">
			    No achievements unlocked.
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
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>
