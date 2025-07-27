import { useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';

/**
 * Calls the Rust 'greet' command via Tauri's invoke API.
 * @param name The name to greet.
 */
export async function callGreet(name: string): Promise<string> {
    try {
        const response = await invoke<string>('greet', { name });
        return response;
    } catch (error) {
        console.error('Failed to call greet:', error);
        throw error;
    }
}

/**
 * React hook to schedule greet calls every 10 seconds.
 * @param name The name to greet.
 */
export function useGreetScheduler(name: string) {
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            callGreet(name).then((res) => {
                console.log('Greet response:', res);
            }).catch(() => {
                // Error already logged in callGreet
            });
        }, 10000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [name]);
}
