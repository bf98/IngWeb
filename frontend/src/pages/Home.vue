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
			<div class="col">
			    <div class="card-body">
				<h5 class="card-title">Gun</h5>
				<p class="card-text">Gun 1</p>
			    </div>
			</div>
		    </div>
		    <div class="row">
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
			<p>Click Num: n</p>
		    </div>
		    <div class="row">
			<button type="submit" class="btn btn-secondary mt-3">Click</button>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>
