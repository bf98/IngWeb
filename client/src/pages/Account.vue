<script lang="ts">
	
	import { defineComponent } from "vue"
	import axios from "axios"
	import { User, AchievementsList } from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
				datiAchievements: [] as AchievementsList[], 
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
			logout() {
				axios.post("/api/auth/logout/");

				// torna alla home
				this.$router.push("/login");
			}
		},
		mounted() {
			this.getUser();
			this.getAchievements();
		}
	})

</script>

<template>
	<div class="account-page">
		<div class="account-section">
			<div v-if="datiUser[0]">
				<div class="account-info">
					<h2>Account</h2>
					<p><strong>Username<br />{{ datiUser[0].name }}</strong></p>
					<p><strong>Total Clicks<br />{{ datiUser[0].click_num }}</strong></p>
					<p><strong>Achievements<br />{{ datiAchievements[0] }}</strong></p>
					<div class="logout-button">
						<button v-if="datiUser[0]" class="nav-item button is-primary" @click="logout">Log-out</button>
					</div>
				</div>
				<div class="flist-info">
					<h1>Friend List <!--{{friend.list}}--></h1>
				</div>
			</div>
			<div v-else>
				<div class="account-header">
					<h1>Account</h1>
				</div>
				<p><a href="/login">Login / Sign Up</a></p>
			</div>
		</div>
	</div>
</template>

