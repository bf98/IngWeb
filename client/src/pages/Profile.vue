<script lang="ts">
	
	import { defineComponent, defineProps } from "vue"
	import axios from "axios"
	import { User, AchievementsList } from "../types"

	export default defineComponent({
		data() {
			return {
				datiUser: [] as User[],
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
				axios.get(`/api/users/${this.userId}`).then(response => this.datiUser = response.data);
				console.log(`Called the query to /api/users/${this.userId}`);
			},
		},
		mounted() {
		  	console.log("User ID: ", this.userId);
			this.getUser();
		}
	})

</script>

<template>
	<div v-if="datiUser && datiUser.length > 0">
		<p>Username: {{ datiUser[0].name }}</p>
		<p>Click Number: {{ datiUser[0].click_num }}</p>
	</div>
	<div v-else>
		<p>Something bad has happened</p>
	</div>
</template>
