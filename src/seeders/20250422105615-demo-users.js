"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    const hashedPassword = async (plain) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(plain, salt);
    };

    const names = [
      "Aarav Mehta", "Isha Kapoor", "Rohan Verma", "Nina D'Souza", "Kabir Shah",
      "Ananya Iyer", "Devansh Rathore", "Meera Jain", "Aryan Khanna", "Sanya Deshmukh",
      "Yash Agarwal", "Tara Nambiar", "Vihaan Joshi", "Kiara Reddy", "Aditya Bansal",
      "Reeva Chaudhary", "Rahul Nair", "Simran Kaur", "Arjun Saxena", "Priya Menon"
    ];

    const bios = [
      "Passionate full-stack dev from Bengaluru.",
      "Crafting experiences through code and creativity.",
      "Making scalable systems with.",
      "Designing clean UI and building robust APIs.",
      "Tech nerd who also loves photography.",
      "Turning coffee into code daily.",
      "Backend-focused but frontend curious.",
      "Exploring cloud and container tech.",
      "Building apps that solve real problems.",
      "Lover of clean code and pixel perfection.",
      "Open source contributor and lifelong learner.",
      "Always learning, always coding.",
      "Breaking things to fix them better.",
      "React, Redux and reading blogs.",
      "Secure by design. Efficient by nature.",
      "Writing RESTful stories in Node.js.",
      "Mongo magician and Express evangelist.",
      "API-first mindset, clean architecture always.",
      "Code. Test. Repeat.",
      "Engineer with a designer’s eye."
    ];

    for (let i = 0; i < 20; i++) {
      users.push({
        name: names[i],
        email: `${names[i].toLowerCase().replace(/ /g, '')}@example.com`,
        password: await hashedPassword(`Password@${i + 1}`),
        bio: bios[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
