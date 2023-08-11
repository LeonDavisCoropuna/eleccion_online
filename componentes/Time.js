import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Time({time = 10}) {
    const router = useRouter();
    const [exp, setExp] = useState(time);
    useEffect(() => {
        const timer = setInterval(() => {
            setExp((prevTime) => prevTime - 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (exp === 0) {
            logout();
            router.push("/");
        }
    }, [exp, router]);

    const logout = async () => {
        try {
            router.push("/");
        } catch (err) {
            console.log(err);
            router.push("/");
        }
    };
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    return (
        <div>
            Tiempo restante: {formatTime(exp)}
        </div>
    );
}
