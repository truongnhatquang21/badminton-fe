"use server";

import { AuthError } from "next-auth";
import type { z } from "zod";

import { signIn, signOut } from "@/auth";
import type { LoginSchema } from "@/validations";

// ...

// eslint-disable-next-line consistent-return
// export async function authenticate(formData: FormData | any) {
//   try {
//     const res = await signIn("credentials", {
//       ...formData,
//       redirect: false,
//     });
//     return res;
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }
export const SignInServer = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | "/sign-in"
) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: callbackUrl || "/",
    });

    return { success: "Login Sucess!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
export async function signOutServer() {
  await signOut();
}
