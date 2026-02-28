import ButtonRedirect from "@/app/components/ButtonRedirect";
import Link from "next/link";
import { redirect } from "next/navigation";

const isAuth = false;
export default function Home() {
    // if (!isAuth) {
    //     redirect("/login");
    // }
    return (
        <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <main>
                <ul>
                    <li>
                        <Link href={"/login"}>Login</Link>
                    </li>
                </ul>

                <ButtonRedirect>Function Navigation 123 </ButtonRedirect>
            </main>
        </div>
    );
}
