import { Button, Card, message, Breadcrumb } from 'ant-design-vue';

const plugins = [Button, Card, Breadcrumb];

export const setupAntd = (app: any, options = {}) => {
  app.config.globalProperties.$message = message;
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
};