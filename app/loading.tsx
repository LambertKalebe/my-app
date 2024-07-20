'use client';

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/component/navbar";

export default function Loading() {
    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center h-screen bg-gray-100">
                <Card className="p-5">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Carregando...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className="loader"></div>
                        </motion.div>
                        <p className="mt-4 text-center">Por favor, aguarde enquanto carregamos os dados.</p>
                    </CardContent>
                </Card>
            </div>

            <style jsx>{`
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}