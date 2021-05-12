const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = ar => ar[Math.floor(Math.random() * ar.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = await new Campground({
            author: '6093bd23a3f5a00d2c6b489d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius maxime veritatis tempora asperiores veniam cumque quaerat optio praesentium, consectetur, illum aliquid provident voluptatem impedit incidunt reprehenderit in ullam minima ad.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dy6wizkk6/image/upload/v1620414530/YelpCamp/hqrmov2bim3spnb6tsjw.jpg',
                    filename: 'YelpCamp/hqrmov2bim3spnb6tsjw'
                },
                {
                    url: 'https://res.cloudinary.com/dy6wizkk6/image/upload/v1620414531/YelpCamp/ivygyz2otrvqbuekwcxn.jpg',
                    filename: 'YelpCamp/ivygyz2otrvqbuekwcxn'
                },
                {
                    url: 'https://res.cloudinary.com/dy6wizkk6/image/upload/v1620414531/YelpCamp/zvuxzhhfayypyyxdf18k.jpg',
                    filename: 'YelpCamp/zvuxzhhfayypyyxdf18k'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})