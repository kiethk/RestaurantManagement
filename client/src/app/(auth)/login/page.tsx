import LoginForm from "@/app/(auth)/login/login-form";
import Link from "next/link";

export default function loginPage() {
    return (
        <div>
            <h1 className="text-xl font-semibold text-center">Login</h1>
            <div className="flex justify-center">
                <LoginForm />
            </div>
        </div>
    );
}
