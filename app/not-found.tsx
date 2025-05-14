"use client"
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <div className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-9xl font-bold text-[#2a0f89]">
                        404
                    </h1>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                        Page not found
                    </h2>

                    <p className="mt-6 text-base text-gray-400">
                        Sorry, we couldn't find the page you're looking for. It might have been moved,
                        deleted, or perhaps never existed.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-gray-300">
                            You might want to:
                        </h3>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-400">
                            <li>
                                Double-check the URL for typos
                            </li>
                            <li>
                                Go back to the previous page
                            </li>
                            <li>
                                Return to our home page
                            </li>
                        </ul>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2 border border-gray-700 rounded-md text-sm font-medium text-white bg-transparent hover:bg-gray-800 transition-colors"
                        >
                            Go Back
                        </button>

                        <Link href="/" className="px-6 py-2 rounded-md text-sm font-medium text-white bg-[#7005e8] hover:bg-[#4c08e5] transition-colors">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
