import { Head } from '@inertiajs/react';
import { Auth } from './../types/index.d';

export default function Welcome({ isAuthenticated }: { isAuthenticated: Auth }) {
    return (
        <>
            <Head title="Intelligent Permanent Preheating System for LPG Gas">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                <nav className="fixed top-0 left-0 z-10 w-full bg-white px-6 py-4 shadow-md">
                    <div className="mx-auto flex max-w-screen-xl items-center justify-between">
                        <a href="/" className="text-2xl font-extrabold text-gray-800">
                            Intelligent System
                        </a>
                        <div className="space-x-6">
                            {isAuthenticated ? (
                                <a href="/dashboard" className="text-lg text-gray-600 hover:text-gray-800">
                                    Dashboard
                                </a>
                            ) : (
                                <>
                                    <a href="/login" className="text-lg text-gray-600 hover:text-gray-800">
                                        Login
                                    </a>
                                    <a href="/register" className="text-lg text-gray-600 hover:text-gray-800">
                                        Register
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <header className="mt-24 bg-gray-800 px-6 py-20 text-center text-white">
                    <h1 className="mb-4 text-5xl leading-tight font-extrabold tracking-tight">Intelligent Permanent Preheating System for LPG Gas</h1>
                    <p className="mb-6 text-xl">Optimize your engine's performance with advanced preheating technology.</p>
                    <a
                        href="#features"
                        className="rounded-full bg-gray-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-gray-800"
                    >
                        Discover our solutions
                    </a>
                </header>

                <section className="bg-white px-6 py-12 text-center">
                    <h2 className="mb-6 text-4xl font-semibold text-gray-800">About Our System</h2>
                    <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                        Our innovative system optimizes internal combustion engines using advanced techniques to preheat LPG gas, ensuring enhanced
                        performance, reduced fuel consumption, and a significant reduction in pollutant emissions.
                    </p>
                </section>

                <section id="features" className="bg-gray-100 px-6 py-12 text-center">
                    <h2 className="mb-8 text-4xl font-semibold text-gray-800">Our Innovations</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                            <h3 className="mb-4 text-xl font-medium text-gray-800">Temperature Optimization</h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                We use real-time data to automatically adjust gas preheating, ensuring optimal engine performance in all conditions.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                            <h3 className="mb-4 text-xl font-medium text-gray-800">Energy Efficiency</h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                Reduce your fuel consumption with intelligent preheating management, maximizing your vehicle's energy efficiency while
                                minimizing its carbon footprint.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                            <h3 className="mb-4 text-xl font-medium text-gray-800">Emission Reduction</h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                Our technology helps reduce pollutant emissions by ensuring cleaner and more efficient combustion, contributing to a
                                greener future.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="contact" className="bg-white px-6 py-12 text-center">
                    <h2 className="mb-6 text-4xl font-semibold text-gray-800">Contact Us</h2>
                    <p className="mb-6 text-lg">Have questions? We're here to help you learn more about our technology and its impact.</p>
                    <a
                        href="mailto:contact@votresite.com"
                        className="rounded-full bg-gray-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-gray-800"
                    >
                        Send an Email
                    </a>
                </section>

                <footer className="bg-gray-800 py-6 text-center text-white">
                    <p className="text-sm">&copy; 2025 Intelligent Permanent Preheating System for LPG Gas. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
