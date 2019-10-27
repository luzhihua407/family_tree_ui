import store from 'store'
export const isAllowed = rights => {
  const permission = store.get('permission')
  //console.log(permission);
  return permission.indexOf(rights) > -1
}
