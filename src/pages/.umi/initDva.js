import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('../../plugins/onError.js').default);
app.use(require('D:/antd-admin/antd_family_tree/node_modules/_dva-immer@0.2.4@dva-immer/lib/index.js').default());
app.model({ namespace: 'app', ...(require('D:/antd-admin/antd_family_tree/src/models/app.js').default) });
