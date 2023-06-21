import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash("Password1#", 10); // Hash the password
  const hashedPassword2 = await bcrypt.hash("Password2#", 10); // Hash the password

  await prisma.user.create({
    data: {
      username: "AnnaS",
      email: "annaS@gmail.com",
      password: hashedPassword1,
      carts: {
        create: {}, // Create an empty cart for the user
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "Lina",
      email: "Lina@gmail.com",
      password: hashedPassword2,
      carts: {
        create: {}, // Create an empty cart for the user
      },
    },
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
        image:
          "https://housing.com/news/wp-content/uploads/2022/11/image16-8.png",
      },
      {
        name: "Armchair",
        description: `Create a cozy and inviting atmosphere with the Lorem ipsum dolor sit amet Armchair.
          Its plush cushions and ergonomic design provide optimal comfort and relaxation.
          The armchair's timeless design, featuring a wooden frame and premium upholstery,
           adds a touch of elegance to any living space.`,
        price: 19.99,
        inventory: 50,
        image:
          "https://www.ikea.com/us/en/images/products/flinshult-armchair-beige__1010600_pe828156_s5.jpg?f=l",
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
