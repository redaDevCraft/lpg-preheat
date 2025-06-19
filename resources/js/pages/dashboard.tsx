import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SensorData {
    temperature: number;
    pressure: number;
    timestamp: string;
    status: string;
    invalve?: boolean;
    outvalve?: boolean;
}

const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [pressure, setPressure] = useState<number | null>(null);
    const [status, setStatus] = useState<string>('');
    const [invalve, setInvalve] = useState<boolean | null>(null);
    const [outvalve, setOutvalve] = useState<boolean | null>(null);
    const [, setLoading] = useState<boolean>(false);

    const fetchSensorData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/sensor-data/show');
            const latest: SensorData = response.data[0];

            setTemperature(latest.temperature);
            setPressure(latest.pressure);
            setStatus(latest.status || '');
            setInvalve(latest.invalve ?? null);
            setOutvalve(latest.outvalve ?? null);
        } catch (error) {
            console.error('Failed to fetch sensor data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Real-time Sensor Data</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Pressure (bar)</h2>
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
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">System Phase</h2>
                        <div className="text-center text-xl font-medium text-gray-700">{status || 'Loading...'}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Invalve Status</h2>
                        <div className={`text-4xl font-medium ${invalve ? 'text-green-600' : 'text-red-600'}`}>
                            {invalve === null ? 'Loading...' : invalve ? 'Open' : 'Closed'}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Outvalve Status</h2>
                        <div className={`text-4xl font-medium ${outvalve ? 'text-green-600' : 'text-red-600'}`}>
                            {outvalve === null ? 'Loading...' : outvalve ? 'Open' : 'Closed'}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
