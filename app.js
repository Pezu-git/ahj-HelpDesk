const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const idGenerator = require('node-unique-id-generator');

const app = new Koa();

app.use(cors());
app.use(koaBody({urlencoded: true}))

const tickets = [{
  id: idGenerator.generateGUID(),
  name: 'Поменять краску в принтере, ком. 404',
  description: 'Принтер HP LJ-1210, картриджи на складе',
  status: false,
  created: Date.now()
},
  {
    id: idGenerator.generateGUID(),
    name: 'Переустановить Windows, PC-Hall24',
    description: '',
    status: false,
    created: Date.now()
  },
  {
    id: idGenerator.generateGUID(),
    name: 'Установить обновление KB-31642dv3875',
    description: 'Вышло критическое обновление для Windows',
    status: false,
    created: Date.now()
  }
];

app.use(async (ctx) => {
let method;
if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);
const response = {
success: true,
data: '',
};
switch (method) {
  case 'allTickets': response.data = ticketsList.getTickets();
    break;
  case 'ticketById': response.data = ticketsList.getTicketFull(ctx.request.query);
    break;
  case 'createTicket': response.data = ticketsList.createTicket(ctx.request.body);
    break;
  case 'changeStatus': response.data = ticketsList.changeStatus(ctx.request.body);
    break;
  case 'updateTicket': response.data = ticketsList.updateTicket(ctx.request.body);
    break;
  case 'deleteTicket': response.data = ticketsList.deleteTicket(ctx.request.body);
    break;
default:
  response.success = false;
  response.data = `Unknown method '${method}' in request parameters`;
}
ctx.body = JSON.stringify(response);
});


module.exports = app;