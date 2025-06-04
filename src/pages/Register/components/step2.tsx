import { IMG_USER_DEFAULT } from "@/cofig/constants";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import FormControl from "@/components/UI/FormControl";
import {
  registerStepTwoSchema,
  type RegisterSchemaFieldsStepTwo,
  type RegisterSchemaStepTwoType,
} from "@/schemas/registerSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/RegisterSlice";
import type { FieldControl } from "@/types/controls";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { Button } from "housy-lib";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const controls: FieldControl<RegisterSchemaFieldsStepTwo>[] = [
  {
    name: "firstName",
    type: "text",
    placeholder: "register.step2.form.firstName.placeholder",
    label: "register.step2.form.firstName.label",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "register.step2.form.lastName.placeholder",
    label: "register.step2.form.lastName.label",
  },
];

const Step2 = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { lastName, firstName } = useAppSelector((state) => state.register);
  const [userSupabase, setUserSupabase] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(registerStepTwoSchema),
  });

  const continueForm = async (data: RegisterSchemaStepTwoType) => {
    try {
      setLoading(true);
      dispatch(
        setRegisterData({
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      );
      navigate("/register/step3");
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setValue("lastName", lastName || "");
    setValue("firstName", firstName || "");
  }, [firstName, lastName, setValue]);

  const getUserSupabase = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserSupabase(user);
  };

  useEffect(() => {
    getUserSupabase();
  }, []);
  return (
    <>
      <div className="grid gap-3">
        {userSupabase?.app_metadata?.provider === "google" && (
          <div className="bg-bg-2 w-fit px-4 py-2 text-text-1 rounded-md flex gap-4 items-center justify-self-center">
            <img
              src={userSupabase?.user_metadata.avatar_url || IMG_USER_DEFAULT}
              alt="User profile image"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm"> {userSupabase?.email}</p>
          </div>
        )}
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("register.step2.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("register.step2.form.description")}
        </p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit(continueForm)}>
        {controls.map((control) => {
          const { placeholder, name, label, type } = control;
          const error = errors[name] ? t(errors[name].message!) : "";
          return (
            <FormControl
              key={name}
              placeholder={t(placeholder)}
              name={name}
              register={register}
              error={error}
              label={t(label)}
              type={type}
            />
          );
        })}
        <Button
          variant="filled"
          className="bg-primary w-full font-semibold hover:bg-primary/90"
          type="submit"
          disabled={loading}
        >
          {loading && <LoaderIcon className="animate-spin" />}
          {t("register.step2.form.button.text")}
        </Button>
      </form>
    </>
  );
};

export default Step2;
