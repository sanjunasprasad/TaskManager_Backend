import bcrypt from "bcrypt";
import User from "../../entities/userModel.js";
import Task from "../../entities/taskModel.js"
import { generateUserToken } from "../../middlewares/auth.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name,email,password)

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = await generateUserToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  //  console.log("login",email,password)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateUserToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




export const getTodos = async(req,res) =>{
  try {
    const userId  = req.params.userId;
    // console.log(userId)
    const todos = await Task.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export const addTodo = async(req,res) =>{
  const { id,description, status ,userId } = req.body;
  // console.log('Request Body:', req.body);
  try {
    const newTask = new Task({
      id,
      description,
      status,
      userId,
    });

    // console.log("Created Task:", newTask);
    const savedTask = await newTask.save();
    // console.log("Saved Task:", savedTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const deleteTodo = async (req,res)=>{
  try {
    const  id  = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ id: id })
    // console.log("333",deletedTask)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const editTodo = async(req,res) =>{

  const  id  = req.params.id;
  const { description, status } = req.body;
    
  try {
    const updatedTodo = await Task.findByIdAndUpdate(
      id,
      { description, status },
      { new: true } 
    );
    // console.log("updatedtodo",updatedTodo)
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
}