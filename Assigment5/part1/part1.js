

// // 1
// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     throw new Error("Invalid email format.");
//   }
// }

// // 2
// function checkPasswordLength(password) {
//   if (!password || password.length <= 6) {
//     throw new Error("Password length must be greater than 6 characters.");
//   }
// }

// // 3
// prisma.$use(async (params, next) => {
//   if (params.model === 'User' && params.action === 'create') {
//     const { name, email, password } = params.args.data;
//     if (name && name.length <= 2) {
//       throw new Error("Name length must be greater than 2 characters.");
//     }
//     if (password) {
//       checkPasswordLength(password);
//     }
//     if (email) {
//       validateEmail(email);
//     }
//   }

//   return next(params);
// });

