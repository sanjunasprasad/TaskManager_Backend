import {Router} from 'express'
const userRoute = Router();
import {userRegister,userLogin ,getTodos,addTodo ,deleteTodo , editTodo } from '../controllers/userControllers.js';



userRoute.post('/userRegister',userRegister);
userRoute.post('/userLogin',userLogin)
userRoute.get('/getTodo/:userId',getTodos)
userRoute.post('/addTodo',addTodo)
userRoute.delete('/deleteTodo/:id',deleteTodo)
userRoute.put('/updateTodo/:id',editTodo)





export default userRoute;