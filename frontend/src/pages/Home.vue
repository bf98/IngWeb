<script lang="ts">

    import { defineComponent } from "vue"
	import axios from "axios"
	import { User, ItemsList, AchivementsList } from "../types"

	export default defineComponent({
		data() {
			return {

				datiUser: [] as User[],
				datiAchievements: [] as AchievementsList[],
				datiItems: [] as ItemsList[],
				clickCounter: 0,	
				gameScore: 0,

			}
		},
		methods: {
			getUser() {

				axios.get("/api/auth/profile").then(response => this.datiUser[0] = response.data)

			},
			getAchievements() {

				axios.get("/api/get_achievements").then(response => this.datiAchievements = response.data)

			},
			getItems() {

				axios.get("/api/get_items").then(response => this.datiItems = response.data)

			},
			item1Price() {
				if (this.datiUser[0]) {
				  	return (50 + (50 * this.datiItems[0].item1));
				}
			},
			item2Price() {
				if (this.datiUser[0]) {
					return (500 + (500 * this.datiItems[0].item2));
				}
			},
			item3Price() {
				if (this.datiUser[0]) {
					return (1500 + (1500 * this.datiItems[0].item3));
				}
			},
			async incrementClicks() {

				if (this.datiUser[0]) {
					this.clickCounter++;
				}

			},
			async autoIncrementClicks() {

				if (this.datiUser[0] && this.datiItems[0].item1) {
				    this.clickCounter = this.clickCounter + (1 * (this.datiItems[0].item1)) + (100 * (this.datiItems[0].item2)) + (500 * (this.datiItems[0].item3));
				}

			},
			async updateClicks() {
			
				axios.put("/api/game/set_clicks", {
					clickNum: this.clickCounter,
				});

			},
			async incrementItem1() {

				if (this.datiUser[0] && this.clickCounter >= this.item1Price()) {
				    this.clickCounter -= this.item1Price();
				    this.datiItems[0].item1++;	
				    this.gameScore += 10;
				}
			},
			async incrementItem2() {

				if (this.datiUser[0] && this.clickCounter >= this.item2Price()) {
				    this.clickCounter -= this.item2Price();
				    this.datiItems[0].item2++;	
				    this.gameScore += 50;
				}
			},
			async incrementItem3() {

				if (this.datiUser[0] && this.clickCounter >= this.item3Price()) {
				    this.clickCounter -= this.item3Price();
				    this.datiItems[0].item3++;	
				    this.gameScore += 100;
				}
			},
			async updateItems() {

				axios.put("/api/game/set_items", {
					item1: this.datiItems[0].item1,
					item2: this.datiItems[0].item2,
					item3: this.datiItems[0].item3,
				});
			},
			getClicks() {

				axios.get("/api/game/get_clicks").then(response => this.clickCounter = response.data[0].click_num);

			},
			getScore() {

				axios.get("/api/game/get_score").then(response => this.gameScore = response.data[0].score);

			},
			async showScore() {
			    if (this.datiUser[0]) {
			    }
			},
			async updateScore() {

				axios.put("/api/game/set_score", {
					score: this.gameScore,
				});
			},
		},
		mounted() {
			this.getUser();
			this.getItems();
			this.getClicks();
			this.getScore();
			setInterval(this.autoIncrementClicks, 1000);
			window.addEventListener('beforeunload', this.updateClicks);
			window.addEventListener('beforeunload', this.updateItems);
			window.addEventListener('beforeunload', this.updateScore);
		},
		beforeRouteLeave(to, from) {
			this.updateClicks();
			this.updateItems();
			this.updateScore();
		},
		beforeDestroy() {
			window.removeEventListener('beforeunload', this.updateClicks);
			window.removeEventListener('beforeunload', this.updateItems);
			window.removeEventListener('beforeunload', this.updateScore);
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
				    <h5 class="card-title">Virus 1</h5>
				    <p class="card-text">Generates (1 * n) zombies per second, where n is virus level.</p>
					<button class="nav-item button is-primary" v-on:click="incrementItem1()">
						{{ item1Price() }}	
					</button>
				</div>
			    </div>
			    <div class="col">
				<div class="card-body">
				    <h5 class="card-title">Virus 2</h5>
				    <p class="card-text">Generates (100 * n) zombies per second, where n is virus level.</p>
					<button class="nav-item button is-primary" v-on:click="incrementItem2()">
						{{ item2Price() }}	
					</button>
				</div>
			    </div>
			    <div class="col">
				<div class="card-body">
				    <h5 class="card-title">Virus 3</h5>
				    <p class="card-text">Generates (500 * n) zombies per second, where n is virus level.</p>
					<button class="nav-item button is-primary" v-on:click="incrementItem3()">
						{{ item3Price() }}	
					</button>
				</div>
			    </div>
			</div>
		    </div>
		</div>
		<div class="col-md-4 d-flex">
		    <div class="container-flex section p-4">
			<div class="row">
			    <p>Generated Zombies: {{ clickCounter }}</p>
			    <p>Virus1 Level: {{ datiItems[0].item1 }}</p>
			    <p>Virus2 Level: {{ datiItems[0].item2 }}</p>
			    <p>Virus3 Level: {{ datiItems[0].item3 }}</p>
			    <p>Total Score: {{ gameScore }}</p>
			</div>
			<div class="row">
			    <button class="nav-item button is-primary" v-on:click="incrementClicks()">
				Generate	
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
