'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { register, login } from "@/lib/userManager";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const usernameRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (username && password) {
            const response = await register(username, password);
            if (!response.success) {
                alert(response.message); // Exibe o alerta em caso de erro
            } else {
                router.push('/')
            }
            
        } else {
            console.error("Username and Password are required");
            alert("Nome de usuário e senha são obrigatórios."); // Alerta para campos vazios
        }
    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (username && password) {
            const response = await login(username, password);
            if (!response.success) {
                alert(response.message); // Exibe o alerta em caso de erro
            } else [
                router.push('/')
            ]
        } else {
            console.error("Username and Password are required");
            alert("Nome de usuário e senha são obrigatórios."); // Alerta para campos vazios
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
                            <h2 className="text-2xl font-bold">Bem-Vindo!</h2>
                            <p className="text-muted-foreground">Coloque seu nome ou apelido</p>
                        </div>
                        <div className="w-full max-w-md space-y-4">
                            <div>
                                <Input id="username" type="text" placeholder="Digite seu nome" ref={usernameRef} />
                                <div className="relative mt-2">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Digite sua senha" 
                                        ref={passwordRef} 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-white-500"
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button className="w-1/2" onClick={handleLogin}>Entrar</Button>
                                <Button className="w-1/2" onClick={handleRegister}>Registrar</Button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <Image
                        loading  = 'eager'
                            unoptimized
                            src="/patoDonald.gif"
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