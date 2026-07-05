import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'xiaobenjing_favorites'

function loadIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed.map(Number).filter(Boolean) : []
  } catch {
    return []
  }
}

function saveIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref(loadIds())

  const count = computed(() => ids.value.length)

  function has(id) {
    return ids.value.includes(Number(id))
  }

  function toggle(id) {
    const n = Number(id)
    const i = ids.value.indexOf(n)
    if (i >= 0) {
      ids.value.splice(i, 1)
    } else {
      ids.value.push(n)
    }
    saveIds(ids.value)
  }

  function filterProjects(projectsList) {
    if (!ids.value.length) return []
    const set = new Set(ids.value)
    return projectsList.filter((p) => set.has(p.id))
  }

  return { ids, count, has, toggle, filterProjects }
})
