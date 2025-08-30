<script lang="ts">

	import { defineComponent } from "vue"
	import axios from "axios"
	import { User} from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
			}
		},
		methods: {
			getUser() 
			{
				axios.get("/api/current_user/").then(response => this.datiUser = response.data);
			},
			checkAdmin()
			{
			    if (this.datiUser.isAdmin == 0) {
				this.$router.push("/");
			    }
			},
		},
		created() {
			this.getUser();
			this.checkAdmin();
		}
	})

</script>

<template>
    <div v-if="datiUser[0]">
	<div class="container-fluid fill d-flex justify-content-center w-100">
	    <div class="container section p-4">
		
	    </div>
	</div>
    </div>
</template>

<style>
</style>
