"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomInput from "../../components/generic/CustomInput";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useSignInMutation } from "../../redux/services/account";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  uniqueName: Yup.string()
    .required("The Unique Name is required")
    .min(6, "Unique Name must be more than 6 letters")
    .max(18, "Unique Name must be less than 18 letters")
    .test(
      "uniqueName",
      () => "Unique Name only allows lowercase letters",
      (value: any) => {
        if (!/^[a-z]+$/.test(value)) return false;

        return true;
      }
    ),

  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be more than 4 letters")
    .max(22, "Username must be less than 22 letters")
    .test(
      "username",
      () => "username can't has a @",
      (value: any) => {
        if (value.includes("@")) return false;
        return true;
      }
    ),

  email: Yup.string()
    .required("Email is required")
    .min(8, "Email must be more than 8 letters")
    .email("Write a valid email")
    .test(
      "email",
      () => "Email only allows lowercase letters and numbers",
      (value: any) => {
        const newValue = value.split("@")[0];
        if (!/^[a-zA-Z0-9_.-]*$/.test(newValue)) return false;

        return true;
      }
    ),

  password: Yup.string()
    .required("The password is required")
    .min(8, "Password must be more than 8 letters")
    .test(
      "password",
      ({ value }: { value: any }) => {
        if (/\d/.test(value) && /[a-z]/.test(value))
          return "Password must have at least one upper";

        if (/[A-Z]/.test(value) && /[a-z]/.test(value))
          return "Password must have at least one number";

        if (/[A-Z]/.test(value) && /\d/.test(value))
          return "Password must have at least one lower";

        if (/[A-Z]/.test(value))
          return "Password must have at least one lower and number";

        if (/[a-z]/.test(value))
          return "Password must have at least one upper and number";

        if (/\d/.test(value))
          return "Password must have at least one lower and upper";

        return "Invalid password";
      },
      (value: any) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!regex.test(value)) return false;

        return true;
      }
    ),

  age: Yup.number()
    .optional()
    .integer("Age must be an integer")
    .moreThan(12, "You must have 12 years old to use this app")
    .lessThan(150, "Write a valid age"),

  image: Yup.string().optional().min(300, "Not a valid image"),
});

function Register() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; username: string }>();
  const [showPass, setShowPass] = useState(false);
  const [image, setImg] = useState<string | null>(null);
  const [error, setError] = useState<any>();
  const [showMessa, setShowMessa] = useState(false);
  const [finished, setFinished] = useState(false);
  const [createUser, result] = useSignInMutation();

  useEffect(() => {
    const customInput = document.querySelector("[type=number]");

    customInput?.closest("DIV")?.classList.remove("h-11");

    customInput?.classList.remove("pt-4", "pb-1.5");

    customInput?.nextElementSibling?.classList.replace(
      "peer-placeholder-shown:text-sm",
      "peer-placeholder-shown:text-xs"
    );

    setFinished(true);
  }, []);

  useEffect(() => {
    if (result.status === "uninitialized") return;

    if (result.isSuccess) {
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        router.push("/");
      }, 2000);
    } else if (result.isError) {
      setError(result.error);
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        setError(undefined);
      }, 2000);
    }
  }, [result]); //eslint-disable-line

  const onSubmit = async ({
    uniqueName,
    username,
    email,
    age,
    password,
  }: {
    uniqueName: string;
    username: string;
    email: string;
    age: string;
    password: string;
  }) => {
    if (age && image) {
      createUser({
        uniqueName,
        username,
        email,
        age,
        password,
        image,
      });
    } else if (image) {
      createUser({
        uniqueName,
        username,
        email,
        password,
        image,
      });
    } else if (age) {
      createUser({
        uniqueName,
        username,
        email,
        age,
        password,
      });
    } else {
      createUser({
        uniqueName,
        username,
        email,
        password,
      });
    }
  };

  const initialValues = {
    uniqueName: "",
    username: "",
    email: "",
    age: "",
    password: "",
  };

  return (
    <>
      <main className="fixed top-0 bottom-0 left-0 right-0 bg-[#5d56d7] flex flex-col items-center justify-center gap-2 z-[1050]">
        <h1 className="font-bold text-xl text-white">Register</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Form
                className={`relative grid gap-4 bg-white py-8 px-6 rounded-lg w-[26rem] ${
                  !finished ? "items-center justify-center" : ""
                }`}
              >
                <div>
                  <Field
                    name="uniqueName"
                    label="Write your Unique Name"
                    component={CustomInput}
                    variant="standard"
                    className="text-gray-800"
                  />

                  <ErrorMessage
                    name="uniqueName"
                    component="p"
                    className="text-xs  text-red-600"
                  />
                </div>

                <div>
                  <Field
                    name="username"
                    label="Write your username"
                    component={CustomInput}
                    variant="standard"
                    className="text-gray-800"
                  />

                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-xs  text-red-600"
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    label="Write your email"
                    component={CustomInput}
                    variant="standard"
                    className="text-gray-800"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs  text-red-600"
                  />
                </div>

                <div>
                  <div className="relative border-b border-[#ccc6c6]">
                    <Field
                      name="password"
                      type={showPass ? "text" : "password"}
                      label="Write your password"
                      component={CustomInput}
                      variant="standard"
                      className="pr-8 text-gray-800"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-[50%] right-2 -translate-y-[50%]"
                    >
                      {showPass ? (
                        <AiFillEye className="text-[#1b86a7] text-xl" />
                      ) : (
                        <AiFillEyeInvisible className="text-[#1b86a7] text-xl" />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-xs  text-red-600"
                  />
                </div>

                <div className="flex justify-between items-end">
                  <button
                    type="button"
                    className={`w-fit relative underline-offset-1 underline transition-colors hover:text-gray-500 duration-300 ${
                      image ? "text-green-600" : ""
                    }`}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      //@ts-ignore
                      e.currentTarget.children[0]?.click();
                    }}
                  >
                    Upload Image
                    <input
                      className="hidden"
                      accept="image/png, image/jpeg"
                      type="file"
                      onChange={(e) => {
                        if (e.currentTarget.files) {
                          const fileReader = new FileReader();
                          if (e.currentTarget.files[0]) {
                            fileReader.readAsDataURL(e.currentTarget.files[0]);

                            fileReader.addEventListener("load", (e) => {
                              if (e.target) {
                                if (typeof e.target.result === "string")
                                  setImg(e.target.result);
                              }
                            });
                          }
                        }
                      }}
                    />
                  </button>

                  <div>
                    <Field
                      name="age"
                      label="Write your age"
                      component={CustomInput}
                      variant="standard"
                      type="number"
                      className="text-gray-800 pt-3 h-[30px] text-xs pb-[4px]"
                    />

                    <ErrorMessage
                      name="age"
                      component="p"
                      className="text-xs text-red-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#5d56d7] text-white font-semibold py-1"
                >
                  Register
                </button>

                <p className="text-zinc-900">
                  Do you already have an account?{" "}
                  <Link className="text-[#5d56d7] underline" href="/login">
                    Login
                  </Link>
                </p>

                {!finished ? (
                  <div className="absolute flex justify-center items-center rounded-lg w-full top-0 left-0 rigth-0 bottom-0 bg-white">
                    <ClipLoader size={35} color="#5d56d7" />
                  </div>
                ) : null}
              </Form>
            );
          }}
        </Formik>
      </main>

      {showMessa ? (
        <div
          className={`fixed top-[10%] left-[50%] -translate-x-[50%] rounded-xl py-2 px-4 z-[1050] ${
            error ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          <p className="font-medium">
            {error
              ? `Status code: ${error.status}, Error: ${
                  !error?.data ? error?.error : error.data.error
                }`
              : "You have succesfully registered!"}
          </p>
        </div>
      ) : null}

      <a href="/" id="achor-to-home" className="hidden" />
    </>
  );
}

export default Register;




