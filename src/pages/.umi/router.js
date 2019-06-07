import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
}),
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/chart/ECharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__ECharts__index" */'../chart/ECharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/chart/ECharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__ECharts__index" */'../chart/ECharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/chart/highCharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__highCharts__index" */'../chart/highCharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/chart/highCharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__highCharts__index" */'../chart/highCharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/chart/Recharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__Recharts__index" */'../chart/Recharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/chart/Recharts",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__chart__Recharts__index" */'../chart/Recharts/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/dashboard",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__dashboard__model.js' */'D:/antd-admin/antd_family_tree/src/pages/dashboard/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__dashboard__index" */'../dashboard/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/dashboard",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__dashboard__model.js' */'D:/antd-admin/antd_family_tree/src/pages/dashboard/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__dashboard__index" */'../dashboard/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/404",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/404",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/post",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__post__model.js' */'D:/antd-admin/antd_family_tree/src/pages/post/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__post__index" */'../post/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/post",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__post__model.js' */'D:/antd-admin/antd_family_tree/src/pages/post/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__post__index" */'../post/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/request",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__request__index" */'../request/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/request",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__request__index" */'../request/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/security/menu",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__menu__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/menu/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__menu__index" */'../security/menu/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/security/menu",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__menu__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/menu/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__menu__index" */'../security/menu/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/security/role",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__role__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/role/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__role__index" */'../security/role/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/security/role",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__role__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/role/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__role__index" */'../security/role/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/security/rolemenu",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__rolemenu__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/rolemenu/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__rolemenu__index" */'../security/rolemenu/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/security/rolemenu",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__security__rolemenu__model.js' */'D:/antd-admin/antd_family_tree/src/pages/security/rolemenu/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__security__rolemenu__index" */'../security/rolemenu/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/UIElement/editor",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__UIElement__editor__index" */'../UIElement/editor/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/UIElement/editor",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__UIElement__editor__index" */'../UIElement/editor/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/user",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__user__model.js' */'D:/antd-admin/antd_family_tree/src/pages/user/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__user__index" */'../user/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/user",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__user__model.js' */'D:/antd-admin/antd_family_tree/src/pages/user/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__user__index" */'../user/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/user/:id",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__user__$id__models__detail.js' */'D:/antd-admin/antd_family_tree/src/pages/user/$id/models/detail.js').then(m => { return { namespace: 'detail',...m.default}}),
  import(/* webpackChunkName: 'p__user__model.js' */'D:/antd-admin/antd_family_tree/src/pages/user/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__user__$id__index" */'../user/$id/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/user/:id",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__user__$id__models__detail.js' */'D:/antd-admin/antd_family_tree/src/pages/user/$id/models/detail.js').then(m => { return { namespace: 'detail',...m.default}}),
  import(/* webpackChunkName: 'p__user__model.js' */'D:/antd-admin/antd_family_tree/src/pages/user/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__user__$id__index" */'../user/$id/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/login",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__login__model.js' */'D:/antd-admin/antd_family_tree/src/pages/login/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__login__index" */'../login/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "path": "/:lang(pt-br|en|zh)/login",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__login__model.js' */'D:/antd-admin/antd_family_tree/src/pages/login/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__login__index" */'../login/index.js'),
  LoadingComponent: require('D:/antd-admin/antd_family_tree/src/components/Loader/Loader').default,
})
      },
      {
        "component": () => React.createElement(require('D:/antd-admin/antd_family_tree/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/antd-admin/antd_family_tree/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
