
<template>
  <div class="bg-slate-900 h-screen text-white">
    <NuxtLayout>
      <header>
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/events">Events</NuxtLink>
            <NuxtLink to="/events/profile">Profile</NuxtLink>
          </li>
        </ul>
      </header>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
