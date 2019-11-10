import store from 'store'
export const isAllowed = rights => {
  const permission = store.get('permission')
  //console.log(permission);
  if ('admin' == permission) {
    return true
  }
  return permission.indexOf(rights) > -1
}
