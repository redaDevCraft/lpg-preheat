import { LoadingSpinner } from '@/components/ui/loadingspinner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface SensorData {
    temperature: number;
    pressure: number;
    timestamp: string;
}

export default function Dashboard() {
    const [, setSensorData] = useState<SensorData[]>([]);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [pressure, setPressure] = useState<number | null>(null);
    const [, setLoading] = useState<boolean>(false);

    // Fetch sensor data
    const fetchSensorData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/sensor-data/show');
            const data: SensorData[] = response.data;

            const sortedData = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).slice(-2);

            setSensorData(sortedData);

            setTemperature(sortedData[sortedData.length - 1].temperature);
            setPressure(sortedData[sortedData.length - 1].pressure);
        } catch (error) {
            console.error('Failed to fetch sensor data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSensorData(); // Initial load
        const interval = setInterval(fetchSensorData, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Real-time Sensor Data</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Temperature */}
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Temperature (°C)</h2>
                        <div className="text-6xl font-bold text-red-500">
                            {temperature !== null ? (
                                <motion.div
                                    key={temperature}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="transform transition-transform hover:scale-110"
                                >
                                    {temperature.toFixed(2)}
                                </motion.div>
                            ) : (
                                <LoadingSpinner className="" />
                            )}
                        </div>
                    </div>

                    {/* Pressure */}
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Pressure (hPa)</h2>
                        <div className="text-6xl font-bold text-blue-500">
                            {pressure !== null ? (
                                <motion.div
                                    key={pressure}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="transform transition-transform hover:scale-110"
                                >
                                    {pressure.toFixed(2)}
                                </motion.div>
                            ) : (
                                <LoadingSpinner className="" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
