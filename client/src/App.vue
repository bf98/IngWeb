<template>
	<nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
			<h3>Clicker Game</h3>
		  </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Play</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
              </li>
              <li class="nav-item">
			  	<router-link to="/account" class="nav-link">Account</router-link>
			  </li>
            </ul>
          </div>
        </div>
      </nav>
	<router-view />
</template>

<style>

</style>
