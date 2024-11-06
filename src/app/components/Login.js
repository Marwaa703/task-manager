// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
// import { Input, Button, message } from "antd";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) {
//       setError("Invalid credentials.");
//     } else {
//       message.success("Logged in successfully!");
//       router.push("/");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full"
//               required
//             />
//           </div>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             Log In
//           </Button>
//         </form>
//         {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//       </div>
//     </div>
//   );
// }
