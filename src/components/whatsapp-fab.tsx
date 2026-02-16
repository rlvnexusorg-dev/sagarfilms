"use client";

import Link from 'next/link';

const WhatsAppIcon = () => (
    <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.6,14.9c-0.3-0.1-1-0.5-1.2-0.6c-0.2-0.1-0.3-0.1-0.5,0.1c-0.1,0.2-0.4,0.5-0.5,0.6c-0.1,0.1-0.2,0.1-0.4,0s-0.3-0.1-0.6-0.2c-0.3-0.1-1.3-0.5-2.5-1.5c-0.9-0.8-1.5-1.8-1.7-2.1c-0.2-0.3-0.1-0.5,0.1-0.6c0.1-0.1,0.2-0.2,0.4-0.4c0.1-0.1,0.2-0.2,0.2-0.3C12.8,9.7,12.7,9.5,12.7,9.3c-0.1-0.2-0.6-1.3-0.8-1.8c-0.2-0.5-0.4-0.4-0.5-0.4H11c-0.1,0-0.3,0.1-0.5,0.2c-0.1,0.2-0.7,0.7-0.7,1.7s0.7,2,0.8,2.1c0.1,0.1,1.4,2.2,3.5,3.1c0.5,0.2,0.8,0.3,1.1,0.4c0.5,0.1,1,0.1,1.3,0.1c0.4-0.1,1-0.5,1.2-0.9c0.2-0.4,0.2-0.8,0.1-0.9C20,15.2,19.9,15.1,19.6,14.9z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M12,20.5c-4.7,0-8.5-3.8-8.5-8.5S7.3,3.5,12,3.5s8.5,3.8,8.5,8.5S16.7,20.5,12,20.5z"
        />
    </svg>
);

export function WhatsAppFAB() {
    const whatsappLink = "https://wa.me/+918825278628";
    return (
        <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors animate-bounce"
            aria-label="Chat on WhatsApp"
        >
            <WhatsAppIcon />
        </Link>
    );
}
