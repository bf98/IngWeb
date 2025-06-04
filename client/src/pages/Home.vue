<script lang="ts">
	
	import { defineComponent } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {

				datiUser: [] as User[],
				clickCounter: 0,	

			}
		},
		methods: {
			async getUser() {

				axios.get("/api/auth/profile").then(response => this.datiUser[0] = response.data)

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
	  <div class="container-fluid">
		  <div class="row d-flex" style="height: 100vh;">
			  <!-- Due sezioni separate, una per click e l'altra upgrades (alla Cookie Clicker?)-->
			  <div class="col-md-8 UpgradeArea">
				  <h2 class="text-center">Upgrades</h2>
				  <div class="row" v-for="(row,rowIndex) in 2" :key="rowIndex">
				  <div class="col-md-4 mb-4" v-for="(item, index) in 3" :key="index">
				  <div class="Upgrades d-flex justify-content-center flex-wrap">
				  <div class="card align-items-center text-center" style="width: 18rem;">
					  <div class="card-body">
						  <h5 class="card-title">Gun {{ rowIndex * 3 + index + 1 }}</h5>
						  <p class="card-text">Some text</p>
						  <a href="#" class="btn btn-primary">Buy</a>
					  </div>
				  </div>
			  </div>
		  </div>
	  </div>

			  </div>
			  <div class="col-md-4 ClickArea">
				  <button v-on:click="incrementClicks()">Click</button>
				  <p>{{ clickCounter }} clicks!</p>
			  </div>
		  </div>
	  </div>

	</div>
	<div v-else>

	  <div class="account-header">
		  <h1>Account</h1>
	  </div>
	  <p><a href="/login">Login / Sign Up</a></p>

	</div>

</template>
