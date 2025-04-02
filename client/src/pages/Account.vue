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
			}
		},
		mounted() {
			this.getUser()
		}
	})

</script>

<template>
	<p style="text-align: center;">Account Page</p>
	<p style="text-align: center;" v-if="datiUser[0]">Your username is {{ datiUser[0].name }}</p>
</template>
