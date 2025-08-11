// const Pizza = require("../models/pizzamodels")

// exports.getAllPizzas = async (req, res) => {
//   const pizzas = await Pizza.find();
//   res.json(pizzas);
// };

// exports.createPizza = async (req, res) => {
//   const { name, price, size } = req.body;
//   const pizza = new Pizza({ name, price, size });
//   await pizza.save();
//   res.status(201).json({ message: "Pizza Added!" });
// };


const Pizza = require("../models/pizzamodels");
 

exports.getpizza = async(req,res)=>{
        const pizzas = await Pizza.find();
        res.json(pizzas);
}


exports.createpizza = async (req,res)=>{
       const {name,price,size} = req.body;
       const pizza = new Pizza({ name, price, size })
         await pizza.save();
  res.status(201).json({ message: "Pizza Added!" });

}