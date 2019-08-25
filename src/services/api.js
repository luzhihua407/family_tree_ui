export default {
  queryRouteList: '/routes',

  queryUserInfo: 'POST /usercenter/user/current',
  logoutUser: 'POST /logout',
  loginUser: 'POST /login',

  queryUser: '/usercenter/user/get',
  queryUserList: 'POST /usercenter/user/page',
  updateUser: 'POST /usercenter/user/addOrUpdate',
  createUser: 'POST /usercenter/user/addOrUpdate',
  removeUser: 'POST /usercenter/user/delete',
  removeUserList: 'POST /usercenter/user/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  getMenuTree: '/security/menu/getMenuTree',
  queryMenu: '/security/menu/get',
  getParentMenus: '/security/menu/getParentMenus',
  queryMenuList: 'POST /security/menu/page',
  updateMenu: 'POST /security/menu/addOrUpdate',
  createMenu: 'POST /security/menu/addOrUpdate',
  removeMenu: 'POST /security/menu/delete',
  removeMenuList: 'POST /security/menu/delete',

  queryRole: '/security/role/get',
  getRoles: '/security/role/getRoles',
  queryRoleList: 'POST /security/role/page',
  updateRole: 'POST /security/role/addOrUpdate',
  createRole: 'POST /security/role/addOrUpdate',
  removeRole: 'POST /security/role/delete',
  removeRoleList: 'POST /security/role/delete',
  saveRoleMenu: 'POST /security/role_menu/addOrUpdate',
  getRoleMenuByRoleId: 'GET /security/role_menu/getRoleMenuByRoleId',

  queryCategoryByPage: 'POST /folk/category/page',
  queryCategoryById: 'GET /folk/category/get',
  updateCategory: 'POST /folk/category/edit',
  createCategory: 'POST /folk/category/add',
  removeCategory: 'POST /folk/category/delete',
  removeCategoryList: 'POST /folk/category/delete',

  queryCategoryContentByPage: 'POST /folk/category_content/page',
  queryCategoryContentById: 'GET /folk/category_content/get',
  updateCategoryContent: 'POST /folk/category_content/edit',
  createCategoryContent: 'POST /folk/category_content/add',
  removeCategoryContent: 'POST /folk/category_content/delete',
  removeCategoryContentList: 'POST /folk/category_content/delete',
}
