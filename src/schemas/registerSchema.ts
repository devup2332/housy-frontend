import { z } from "zod";

export const registerStepOneSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "step1.form.email.errors.required",
      })
      .email({
        message: "step1.form.email.errors.invalid",
      }),
    password: z
      .string()
      .min(1, {
        message: "step1.form.password.errors.required",
      })
      .min(6, {
        message: "step1.form.password.errors.minLength",
      }),
    confirmPassword: z.string().min(1, {
      message: "step1.form.confirmPassword.errors.required",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "step1.form.confirmPassword.errors.not_matching",
    path: ["confirmPassword"],
  });

export const registerStepTwoSchema = z.object({
  first_name: z.string().min(1, {
    message: "step2.form.firstName.errors.required",
  }),
  last_name: z.string().min(1, {
    message: "step2.form.lastName.errors.required",
  }),
});

export const registerStepThreeSchema = z
  .object({
    password: z.string().min(1, {
      message: "step3.form.password.errors.required",
    }),
    confirmPassword: z.string().min(1, {
      message: "step3.form.confirmPassword.errors.required",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "step3.form.confirmPassword.errors.not_matching",
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
