'use client'
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";;
import { createUser } from "@/lib/userManager";

export default function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = usernameRef.current?.value;
        if (username) {
            createUser(username);
            
        } else {
            console.error("Username is required");
        }
    }

    return (
        <main className="flex-1 bg-muted/40 py-8 md:py-12">
            <div className="container">
                <div className="mb-8 md:mb-12 flex justify-center">
                    <h1 className="text-3xl font-bold md:text-4xl">Login</h1>
                </div>
                <div className="grid gap-8 justify-center md:grid-cols-2 lg:grid-cols-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-bold">Welcome back!</h2>
                            <p className="text-muted-foreground">Enter your username to login to your account.</p>
                        </div>
                        <div className="w-full max-w-md space-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" placeholder="Enter your username" ref={usernameRef} />
                            </div>
                            <Button className="w-full" onClick={handleLogin}>Login</Button>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <Image
                            src="/placeholder.svg"
                            width={600}
                            height={600}
                            alt="QR Code"
                            className="w-full max-w-[600px] rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
