<template>
  <div class="min-h-screen flex flex-col">
    <header class="h-15">
      <AppContainer>
        <AppNavbar />
      </AppContainer>
    </header>

    <main class="flex-1 flex flex-col">
      <AppContainer>
        <NuxtPage />
      </AppContainer>
    </main>
  </div>
</template>
