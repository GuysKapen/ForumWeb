import dotevn from 'dotenv'
import Category from "../models/category.js"
import Post from "../models/post.js"
import User from "../models/user.js"
import bcrypt from 'bcrypt';
import mongoose from "mongoose"
dotevn.config()
//create your array. i inserted only 1 object here
// function convertToSlug(Text) {
//     return Text.toLowerCase()
//         .replace(/ /g, '-')
//         .replace(/[^\w-]+/g, '');
// }
// const categoriess = [
//     new Category({
//         name: "Car",
//         slug: convertToSlug("Car")
//     }),
//     new Category({
//         name: "Fitness",
//         slug: convertToSlug("Fitness")
//     }),
//     new Category({
//         name: "Wallpaper",
//         slug: convertToSlug("Wallpaper")
//     }),
//     new Category({
//         name: "Website",
//         slug: convertToSlug("Website")
//     }),
//     new Category({
//         name: "Photo",
//         slug: convertToSlug("Photo")
//     }),
//     new Category({
//         name: "Food",
//         slug: convertToSlug("Food")

//     }),
//     new Category({
//         name: "Nature",
//         slug: convertToSlug("Nature")
//     }),
//     new Category({
//         name: "Art",
//         slug: convertToSlug("Art")
//     }),
//     new Category({
//         name: "Travel",
//         slug: convertToSlug("Travel")
//     }),
//     new Category({
//         name: "Quote",
//         slug: convertToSlug("Quote")
//     }),
//     new Category({
//         name: "Cat",
//         slug: convertToSlug("Cat")
//     }),
//     new Category({
//         name: "Dog",
//         slug: convertToSlug("Dog")
//     }),
//     new Category({
//         name: "Other",
//         slug: convertToSlug("Other")
//     }),
// ]

//connect mongoose
mongoose
    .connect(process.env.DB_HOST, { useNewUrlParser: true })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });
// save your data. this is an async operation
// after you make sure you seeded all the products, disconnect automatically
// categoriess.map(async (p, index) => {
//     await p.save((err, result) => {
//         if (index === categoriess.length - 1) {
//             console.log("DONE!");
//             // mongoose.disconnect();
//         }
//     });
// });

// const pins = []
// for (let index = 1; index <= 33-26; index++) {
//     // const pins = [
//     pins.push(new Post({
//         title: `Pin ${26+index}`,
//         destination: "https://google.com",
//         image: `uploads/media/62f1b6d43a40702f8594af60/images/pin_${26+index}.png`,
//         category: new mongoose.mongo.ObjectId("62f1b65dd545ce7ffa54ded4"),
//         owner: new mongoose.mongo.ObjectId("62f1b6d43a40702f8594af60"),
//         poster: new mongoose.mongo.ObjectId("62f1b6d43a40702f8594af60")
//     }))
// }
// ]

// pins.map(async (p, index) => {
//     await p.save((err, result) => {
//         if (index === pins.length - 1) {
//             console.log("DONE!");
//             // mongoose.disconnect();
//         }
//     });
// });


const users = [
    new User({
        _id: new mongoose.mongo.ObjectId('59b50d152d9f6b4110ec9a68'),
        email: 'user@mail.com',
        plainPassword: 'password',
        role: 'user',
        items: []
    }),
    new User({
        _id: new mongoose.mongo.ObjectId('62f1b6d43a40702f8594af60'),
        email: 'admin@mail.com',
        plainPassword: 'password',
        role: 'admin',
    }),
]

users.map(async (p, index) => {
    console.log(p);
    await p.save((err, result) => {
        if (index === users.length - 1) {
            console.log("DONE!");
            // mongoose.disconnect();
        }
    });
});