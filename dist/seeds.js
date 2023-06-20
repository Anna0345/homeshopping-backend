"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword1 = await bcrypt_1.default.hash("password1#", 10); // Hash the password
    const hashedPassword2 = await bcrypt_1.default.hash("password2#", 10); // Hash the password
    await prisma.user.createMany({
        data: [
            {
                username: "AnnaS",
                email: "annaS@gmail.com",
                password: hashedPassword1,
            },
            {
                username: "Lina",
                email: "Lina@gmail.com",
                password: hashedPassword2,
            },
        ],
    });
    // Create sample categories
    await prisma.category.createMany({
        data: [
            {
                name: "Kitchen",
                description: `Discover the Lorem ipsum dolor sit amet Kitchen collection, where style meets functionality.
          Our thoughtfully designed kitchen essentials are crafted to elevate your cooking experience. 
          From sleek cookware sets to precision knives and convenient kitchen gadgets, our range offers the perfect blend of quality and aesthetics. Whether you're a passionate home cook or a seasoned chef, our Lorem ipsum dolor sit amet products are here to inspire and assist you in creating culinary delights. Explore our collection and enhance your kitchen with the best tools for your culinary adventures.`,
            },
            {
                name: "Chairs",
                description: `Welcome to the Lorem ipsum dolor sit amet Chairs collection, where comfort meets style. Our carefully curated range of chairs offers the perfect seating solution for any space. 
          From elegant dining chairs to cozy armchairs and sleek office chairs, our collection caters to diverse tastes and preferences. Each chair is meticulously crafted with attention to detail, ensuring optimal comfort and durability. With a variety of designs, materials, and finishes to choose from, you can find the perfect chair to complement your interior decor. 
          Explore our Lorem ipsum dolor sit amet Chairs collection and discover the perfect seat for your home or office.`,
            },
        ],
    });
    // Create sample products
    await prisma.product.createMany({
        data: [
            {
                name: "Cookware",
                description: `The Lorem ipsum dolor sit amet Non-Stick Cookware Set is designed to make your cooking experience effortless and enjoyable. The set includes a range of pots and pans with a durable non-stick coating, ensuring easy food release and quick cleanup. With heat-resistant handles and even heat distribution, 
          this cookware set is a perfect companion for all your culinary adventures.`,
                price: 10.99,
                inventory: 100,
                categoryId: 1,
            },
            {
                name: "Armchair",
                description: `Create a cozy and inviting atmosphere with the Lorem ipsum dolor sit amet Armchair. 
          Its plush cushions and ergonomic design provide optimal comfort and relaxation. 
          The armchair's timeless design, featuring a wooden frame and premium upholstery,
           adds a touch of elegance to any living space.`,
                price: 19.99,
                inventory: 50,
                categoryId: 2,
            },
            // Add more products as needed
        ],
    });
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
