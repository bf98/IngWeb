<script lang="ts">

    import { defineComponent } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {

				datiUser: [] as User[],
				datiAchievements: [] as AchievementsList[],
				datiItems: [] as ItemsList[],
				clickCounter: 0,	

			}
		},
		methods: {
			async getUser() {

				axios.get("/api/auth/profile").then(response => this.datiUser[0] = response.data)

			},
			async getAchievements() {

				axios.get("/api/get_achievements").then(response => this.datiAchievements[0] = response.data)

			},
			async getItems() {

				axios.get("/api/get_items").then(response => this.datiItems[0] = response.data)

			},
			async incrementClicks() {

				if (this.datiUser[0]) {
					this.clickCounter++;
				}

			},
			async updateClicks() {

				axios.put("/api/game/set_clicks", {
					clickNum: this.clickCounter,
				});

			},
			async getClicks() {

				axios.get("/api/game/get_clicks").then(response => this.clickCounter = response.data[0].click_num);
				console.log(this.clickCounter);

			},
		},
		mounted() {
			this.getUser();
			this.getClicks();
			window.addEventListener('beforeunload', this.updateClicks);
		},
		beforeRouteLeave(to, from) {
			this.updateClicks();
		},
		beforeDestroy() {
			window.removeEventListener('beforeunload', this.updateClicks);
		},
	})

</script>

<template>
    <div v-if="datiUser[0]">
	<div class="container fill d-flex justify-content-center">
	    <div class="row align-items-center">
		<div class="col-md-8">
		    <div class="container-flex section p-4">
			<h2 class="text-center">
			    Upgrades
			</h2>
			<div class="row">
			    <div class="col">
				<div class="card-body">
				    <h5 class="card-title">Automatic Gun</h5>
				    <p class="card-text">Automatically clicks 1 time per second</p>
				</div>
			    </div>
			    <div class="col">
				<div class="card-body">
				    <h5 class="card-title">Gun</h5>
				    <p class="card-text">Gun 1</p>
				</div>
			    </div>
			    <div class="col">
				<div class="card-body">
				    <h5 class="card-title">Gun</h5>
				    <p class="card-text">Gun 1</p>
				</div>
			    </div>
			</div>
		    </div>
		</div>
		<div class="col-md-4 d-flex">
		    <div class="container-flex section p-4">
			<div class="row">
			    <p>Click Num: {{ clickCounter }}</p>
			</div>
			<div class="row">
			    <button class="nav-item button is-primary" v-on:click="incrementClicks()">
				Click
			    </button>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    </div>
    <div v-else>
	<div class="container fill d-flex justify-content-center">
	    <div class="row align-items-center">
		<div class="col-md-8">
		    <div class="container-flex section p-4">
			<p>You have to login first</p>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>
