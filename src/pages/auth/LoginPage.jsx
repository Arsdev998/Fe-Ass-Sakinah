import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/redux/api/authApi";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, authLoading, isAuth, message } = useSelector(
    (state) => state.auth
  );
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const handleLogin = async (values) => {
    dispatch(login(values));
    console.log(values);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      localStorage.setItem("login", JSON.stringify("login"));
    }
  }, [isAuth]);

  console.log(authLoading);

  console.log(message);

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col pt-5 items-center w-[500px] h-[500px] border bg-slate-400">
        <h1 className="text-center my-5 text-2xl">Silahkan Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <p>{error}</p>
            <div className="">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {message && <p className="text-red-500">{message}</p>}
            <Button disabled={authLoading} type="submit">
              Login
            </Button>
            <div className="">
              <p>
                Belum memiliki akun? <Link to={"/register"}>daftar</Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
