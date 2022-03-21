import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const hasFolderSelected = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (to?.query?.folderId) {
    next()
  } else {
    next({ name: 'MainView' })
  }
}
