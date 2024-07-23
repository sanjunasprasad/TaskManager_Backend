import {Router} from 'express'
const userRoute = Router();
import { decodeToken } from '../../middlewares/auth.js';
import {userRegister,userLogin ,getTodos,addTodo ,deleteTodo , editTodo } from '../controllers/userControllers.js';



userRoute.post('/userRegister',userRegister);
userRoute.post('/userLogin',userLogin)
userRoute.get('/getTodo/:userId',decodeToken,getTodos)
userRoute.post('/addTodo',decodeToken,addTodo)
userRoute.delete('/deleteTodo/:id',decodeToken,deleteTodo)
userRoute.put('/updateTodo/:id',decodeToken,editTodo)





export default userRoute;