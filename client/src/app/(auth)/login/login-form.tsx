"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Bỏ 'Form' và 'Controller' ở đây

import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import envConfig from "@/config";
import { toast } from "sonner";
import { useAppContext } from "@/app/AppProvider";

export default function LoginForm() {
    const { setSessionToken } = useAppContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginBodyType) {
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    payload,
                };
                if (!res.ok) {
                    throw data;
                }
                return data;
            });
            toast.success(result.payload.message, { position: "top-center" });

            const resultFromNextServer = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify(result),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    payload,
                };
                if (!res.ok) {
                    throw data;
                }
                return data;
            });

            setSessionToken(resultFromNextServer.payload.data.token);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errors = error.payload.errors as {
                field: string;
                message: string;
            }[];
            const status = error.status as number;

            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as "email" | "password", {
                        type: "server",
                        message: error.message,
                    });
                });
            } else {
                toast.error(error.payload.message, { position: "top-center" });
            }
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                    console.log(error);
                })}
                className="space-y-4 max-w-[400px] shrink-0 w-full"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email..." type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your password..." type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="mt-8 w-full" type="submit">
                    {" "}
                    Login
                </Button>
            </form>
        </Form>
    );
}
