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
    <div class="container-fluid fill d-flex justify-content-center w-100">
	<div class="row align-items-center">
	    <div class="col-sm text-center">
			<p>Home</p>
	    </div>
	</div>
    </div>
</template>
