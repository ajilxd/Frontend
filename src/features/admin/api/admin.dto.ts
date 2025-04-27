import * as z from "zod";
// request validation for admin login
export const adminSigninRequestDto = z
  .object({
    email: z
      .string()
      .email()
      .transform((val) => val.trim().toLowerCase()),
    password: z.string().transform((val) => val.trim()),
  })
  .strict();

export type adminSigninRequestType = z.infer<typeof adminSigninRequestDto>;

// response validation for admin login

export const adminSigninResponseDto = z.object({
  accessToken: z.string(),
});

export type adminSigninResponseType = z.infer<typeof adminSigninResponseDto>;
