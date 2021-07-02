const http = require('http');
const Koa = require('koa');
const uidGenerator = require('node-unique-id-generator')
const cors = require('koa-cors');
const koaBody = require('koa-body');

const app = new Koa;

app.use(cors());
app.use(koaBody({urlencoded: true}))

const tickets = [{
  id: uidGenerator.generateUniqueId(),
  name: 'Поменять краску в принтере, ком. 404',
  description: 'Принтер HP LJ-1210, картриджи на складе',
  status: false,
  created: Date.now()
},
  {
    id: uidGenerator.generateUniqueId(),
    name: 'Переустановить Windows, PC-Hall24',
    description: '',
    status: false,
    created: Date.now()
  },
  {
    id: uidGenerator.generateUniqueId(),
    name: 'Установить обновление KB-31642dv3875',
    description: 'Вышло критическое обновление для Windows',
    status: false,
    created: Date.now()
  }
];

app.use(async ctx => {
  const {method, id} = ctx.request.query;
  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
    case 'ticketById':
      ctx.response.body = tickets.find(ticket => ticket.id === id)
      return;
    case 'createTicket':
      const createData = JSON.parse(ctx.request.body)
      const newTicket = {
        id: uidGenerator.generateUniqueId(),
        name: createData.name,
        status: false,
        description: createData.description || '',
        created: Date.now()
      };
      tickets.push(newTicket);
      ctx.response.body = [newTicket]
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});
//     // console.log(uidGenerator.generateUniqueId())
//     // ctx.response.body = 'It Works, asshole!';
//   });



const server = http.createServer(app.callback());
const port = process.env.PORT || 8888;

server.listen(port, err => {
  if (err) {
    return;
  }
  console.log(`listening on ${port} port`)
})
