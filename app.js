// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
//這是沙小 const { findById } = require('./models/todo')

const Todo = require('./models/todo')

const routes = require('./routes')
const app = express()

mongoose.connect('mongodb://localhost/todo-list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)


// // 取得新增 todo 的表單 | GET | /todos/new
// app.get('/', (req, res) => {
//   Todo.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({_id:'asc'})// desc
//     .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

// //取得新增 todo 的表單 | GET | /todos/new
// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// //新增一筆 todo 紀錄 | POST | /todos
// app.post('/todos', (req, res) => {
//   const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
//   return Todo.create({ name })     // 存入資料庫
//     .then(() => res.redirect('/')) // 新增完成後導回首頁
//     .catch(error => console.log(error))
// })

// //瀏覽特定 todo 的詳細資料 | GET | /todos/:id
// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })

// //取得編輯特定 todo 的表單 | GET | /todos/:id/edit
// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })

// //修改特定 todo 紀錄 | PUT | /todos/:id
// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   // const name = req.body.name
//   const { name, isDone } = req.body //destructuring assignment
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on'
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// //刪除特定 todo 紀錄 | DELETE | /todos/:id 
// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})