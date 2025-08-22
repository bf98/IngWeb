<script lang="ts">
	
	import { defineComponent } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
				counter:0	
			}
		},
		methods: {
			getUser() {
				axios.get("/api/auth/profile/").then(response => this.datiUser[0] = response.data)
			},
			logout() {
				axios.post("/api/auth/logout/");
				// torna alla home
				this.$router.push("/");
			}
		},
		mounted() {
			this.getUser()
		}
	})

</script>

<template>
	<div class="account-page">
		<div class="account-section">
			<div v-if="datiUser[0]">
				<div class="account-info">
					<h2>Account</h2>
					<p><strong>Username<br />{{datiUser[0].name}}</strong></p>
					<p><strong>Total Clicks<br />{{datiUser[0].click_num}}</strong></p>
					<p><strong>Achievements<br />{{datiUser[0].achievements}}</strong></p>
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

