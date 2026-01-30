<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Personal - Oppgavestyring</h1>
      <p class="text-gray-400">Dine tildelte oppgaver og ansvarsområder</p>
    </div>

    <!-- Task Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Totale oppgaver</h3>
        <p class="text-3xl font-bold text-white">12</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Venter</h3>
        <p class="text-3xl font-bold text-yellow-400">5</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Pågår</h3>
        <p class="text-3xl font-bold text-blue-400">4</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Ferdig</h3>
        <p class="text-3xl font-bold text-green-400">3</p>
      </div>
    </div>

    <!-- Task Filters -->
    <div class="card mb-6">
      <div class="flex gap-3 overflow-x-auto pb-2">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="activeFilter === filter ? 'btn-primary' : 'btn-secondary'"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-4">
      <div v-for="task in filteredTasks" :key="task.id" class="card">
        <div class="flex items-start gap-4">
          <input
            type="checkbox"
            :checked="task.status === 'Completed'"
            class="w-5 h-5 mt-1 rounded"
            @change="toggleTask(task.id)"
          />
          <div class="flex-1">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-lg font-semibold text-white">{{ task.title }}</h3>
                <p class="text-sm text-gray-400">{{ task.description }}</p>
              </div>
              <span :class="getPriorityBadge(task.priority)">
                {{ task.priority }}
              </span>
            </div>

            <div class="flex items-center gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ task.location }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ task.dueTime }}</span>
              </div>
              <span :class="getStatusBadge(task.status)">
                {{ task.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'staff'
})

const activeFilter = ref('Alle')
const filters = ['Alle', 'Venter', 'Pågår', 'Ferdig']

const tasks = ref([
  {
    id: 1,
    title: 'Rensk Rom 301',
    description: 'Grundig rengjøring kreves etter utsjekk',
    location: 'Etasje 3',
    priority: 'Høy',
    status: 'Venter',
    dueTime: '10:00 AM'
  },
  {
    id: 2,
    title: 'Lever Håndklær',
    description: 'Ekstra håndklær forespurt for Rom 205',
    location: 'Etasje 2',
    priority: 'Medium',
    status: 'Pågår',
    dueTime: '11:30 AM'
  },
  {
    id: 3,
    title: 'Fyll Minibar på nytt',
    description: 'Fyll minibar i Rom 412',
    location: 'Etasje 4',
    priority: 'Lav',
    status: 'Venter',
    dueTime: '2:00 PM'
  },
  {
    id: 4,
    title: 'Reparer AC-enhet',
    description: 'AC vedlikehold i Rom 108',
    location: 'Etasje 1',
    priority: 'Høy',
    status: 'Pågår',
    dueTime: '12:00 PM'
  },
  {
    id: 5,
    title: 'Forbered Rom 215',
    description: 'Klargjøring av rom til VIP-gjest ankomst',
    location: 'Etasje 2',
    priority: 'Høy',
    status: 'Ferdig',
    dueTime: '9:00 AM'
  }
])

const filteredTasks = computed(() => {
  if (activeFilter.value === 'Alle') return tasks.value
  return tasks.value.filter(task => task.status === activeFilter.value)
})

const getPriorityBadge = (priority: string) => {
  const badges: Record<string, string> = {
    'Høy': 'badge-danger',
    'Medium': 'badge-warning',
    'Lav': 'badge-info'
  }
  return badges[priority] || 'badge-info'
}

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'Venter': 'badge-warning',
    'Pågår': 'badge-info',
    'Ferdig': 'badge-success'
  }
  return badges[status] || 'badge-info'
}

const toggleTask = (taskId: number) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed'
  }
}
</script>