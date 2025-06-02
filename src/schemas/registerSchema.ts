import { z } from "zod";

export const registerStepOneSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "register.step1.form.email.errors.required",
      })
      .email({
        message: "register.step1.form.email.errors.invalid",
      })
      .transform((val, ctx) => {
        //set logic to validate email
        console.log({ ctx });
        // return ctx.addIssue({
        //   code: "custom",
        //   fatal: true,
        //   message: "register.step1.form.email.errors.inUse",
        // });

        return val;
      }),
    password: z.string().min(1, {
      message: "register.step3.form.password.errors.required",
    }),
    confirmPassword: z.string().min(1, {
      message: "register.step3.form.confirmPassword.errors.required",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "register.step3.form.confirmPassword.errors.not_matching",
    path: ["confirmPassword"],
  });

export const registerStepTwoSchema = z.object({
  firstName: z.string().min(1, {
    message: "register.step2.form.firstName.errors.required",
  }),
  lastName: z.string().min(1, {
    message: "register.step2.form.lastName.errors.required",
  }),
});

export const registerStepThreeSchema = z
  .object({
    password: z.string().min(1, {
      message: "register.step3.form.password.errors.required",
    }),
    confirmPassword: z.string().min(1, {
      message: "register.step3.form.confirmPassword.errors.required",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "register.step3.form.confirmPassword.errors.not_matching",
    path: ["confirmPassword"],
  });

export type RegisterSchemaStepOneType = z.infer<typeof registerStepOneSchema>;
export type RegisterSchemaStepTwoType = z.infer<typeof registerStepTwoSchema>;
export type RegisterSchemaStepThreeType = z.infer<
  typeof registerStepThreeSchema
>;

export type RegisterSchemaFieldsStepOne = keyof RegisterSchemaStepOneType;
export type RegisterSchemaFieldsStepTwo = keyof RegisterSchemaStepTwoType;
export type RegisterSchemaFieldsStepThree = keyof RegisterSchemaStepThreeType;
