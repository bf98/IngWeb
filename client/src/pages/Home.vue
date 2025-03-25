<script lang="ts">
	
	import { defineComponent } from "vue"
	import axios from "axios"
	import { User } from "../types"

	export default defineComponent({
		data() {
			return {
				datiUsers: [] as User[],
				counter:0	
			}
		},
		methods: {
			getUsers() {
				axios.get("/api/users/").then(response => this.datiUsers = response.data)
			}
		},
		mounted() {
			this.getUsers()
		}
	})

</script>

<template>

	<div class="container-fluid">
		<div class="row d-flex" style="height: 100vh;">
			<!-- Due sezioni separate, una per click e l'altra upgrades (alla Cookie Clicker?)-->
			<div class="col-md-8 UpgradeArea">
				<h2 class="text-center">Upgrades</h2>
				<div class="row" v-for="(row,rowIndex) in 3" :key="rowIndex">
  				<div class="col-md-4 mb-4" v-for="(item, index) in 3" :key="index">
				<div class="Upgrades d-flex justify-content-center flex-wrap">
				<div class="card align-items-center text-center" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">Card title {{ rowIndex * 3 + index + 1 }}</h5>
						<p class="card-text">Some text</p>
						<a href="#" class="btn btn-primary">Buy</a>
					</div>
				</div>
			</div>
		</div>
	</div>

			</div>
			<div class="col-md-4 ClickArea">
				<button v-on:click="counter += 1">Click</button>
				<p>{{ counter }} clicks!</p>
				<div v-for="user in datiUsers">
				  <p class="text-center">Click Number: {{user.click_num}}</p>
				  <p class="text-center">Hello {{user.name}}</p> 
				</div>
			</div>
		</div>
	</div>

</template>
