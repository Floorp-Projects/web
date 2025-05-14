"use client"
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-9xl font-bold text-gray-900">
                    404
                </h1>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
                    Page not found
                </h2>

                <p className="mt-6 text-base text-gray-600">
                    Sorry, we couldn't find the page you're looking for. It might have been moved,
                    deleted, or maybe never existed.
                </p>

                <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-700">
                        You might want to:
                    </h3>
                    <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
                        <li>
                            Check the URL for typos
                        </li>
                        <li>
                            Go back to the previous page
                        </li>
                        <li>
                            Visit our home page
                        </li>
                    </ul>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Go Back
                    </button>

                    <Link href="/" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
