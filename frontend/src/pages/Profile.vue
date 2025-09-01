<script lang="ts">

    import { defineComponent, defineProps } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {
			    datiUser: [] as User[],
			    datiProfile: [] as User[],
			    datiItems: [] as ItemsList[],
			    datiFriends: [] as User[],
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
			checkIdCollision() { // forse da rimuovere
				for (let i = 0; i < this.datiFriends.length; i++) {
					if (this.datiFriends[i].id == this.userId) {
						return true;
					}
				}
			},
			getProfile() 
			{
				axios.get(`/api/users/${this.userId}`).then(response => this.datiProfile = response.data);
			},
			getFriends()
			{
				axios.get("/api/get_friends").then(response => this.datiFriends = response.data);
			},
			addFriend() {
			   if (this.datiUser) { 
					axios.put(`/api/game/add_friend/${this.userId}`);
					this.$router.push("/leaderboard");

			    }
			},
			removeFriend() {
			   if (this.datiUser) { 
					axios.put(`/api/game/remove_friend/${this.userId}`);
					this.$router.push("/leaderboard");

			    }
			},
			getItems() {
				axios.get(`/api/items/${this.userId}`).then(response => this.datiItems = response.data);
			},
			calculateBar1Width() {
				const widthValue = this.datiItems[0].item1 / 100;
				if (widthValue >= 100) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
			calculateBar2Width() {
				const widthValue = this.datiItems[0].item2 / 100;
				if (widthValue >= 100) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
			calculateBar3Width() {
				const widthValue = this.datiItems[0].item3 / 100;
				if (widthValue >= 100) {
				    return 100 + '%';
				}
				else {
				    return widthValue * 100 + '%';
				}
			},
		},
		mounted() {
			this.getUser();
			this.getProfile();
			this.getItems();
			this.getFriends();
		},

	})

</script>

<template>
    <div v-if="datiProfile[0]">
	<div class="container fill d-flex justify-content-center">
	    <div class="row align-items-center">
		<div class="col">
		    <div class="container section p-4">
			<p>Username: {{ datiProfile[0].name }}</p>
			<p>Total Score: {{ datiProfile[0].score }}</p>
			<button class="nav-item button is-primary" v-if="datiUser && datiUser.id != userId && !checkIdCollision()" v-on:click="addFriend()">
			    Add Friend
			</button>
			<button class="nav-item button is-primary" v-if="datiUser && datiUser.id != userId && checkIdCollision()" v-on:click="removeFriend()">
			    Remove Friend
			</button>
		    </div>
		</div>
		<div class="col-7">
		    <div class="container-flex section p-4">
			<p>Achievements</p>

			<!-- DA FARE -->
			<p class="text-center"> Upgrade Virus 1: {{ this.datiItems[0].item1 }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar1Width() }"></div>
			</div>
			<p class="text-center"> Upgrade Virus 2: {{ this.datiItems[0].item2 }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar2Width() }"></div>
			</div>
			<p class="text-center"> Upgrade Virus 3: {{ this.datiItems[0].item3 }}/100 </p>
			<div class="progress-bar">
			    <div class="progress" :style="{ width: calculateBar3Width() }"></div>
			</div>
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
