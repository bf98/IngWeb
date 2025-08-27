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
			this.getUser();
		}
	})

</script>

<template>
    <div v-if="datiUser[0]">
	<div class="container fill d-flex justify-content-center">
	    <div class="row align-items-center">
		<div class="row">
		    <div class="container section p-4">
			<p>Username: {{ datiUser[0].name }}</p>
			<p>Click Number: {{ datiUser[0].click_num }}</p>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>
