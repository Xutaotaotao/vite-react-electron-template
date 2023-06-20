  /*app.js*/
  import Koa from 'koa';
  import Router from 'koa-router';
  const app = new Koa();
  const router = new Router();
  router.get('/api', function (ctx, next) {
      ctx.body = "Hello koa";
  })
  router.get('/api/user', (ctx, next) => {
      ctx.body = {
        "name": "Terence",
        "password": 123456,
        "token": "jsdhkjalsdkajdkajdjkajkdajdas",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        "userid": "00000001",
        "email": "antdesign@alipay.com",
        "signature": "海纳百川，有容乃大",
        "title": "前端开发",
        "group": "某某技术部"
      }
  });
  router.post('/api/unauthorized', function (ctx, next) {
    ctx.body = "unauthorized";
    ctx.status = 401;
})
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3999, () => {
      console.log('starting at port 3999');
  });
