export default function Home() {
    return (
        <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">

            {/* Background Image */}
            <img
                src="/home.jpg"
                alt="Visual Computers Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 drop-shadow-2xl">
                    Visual Computers
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-lg md:text-2xl mt-4">
                    Powering Your Digital Future
                </p>

                {/* Slogan Card */}
                <div className="
                    mt-8  
                    bg-white/10 
                    backdrop-blur-lg 
                    border border-white/20 
                    rounded-2xl 
                    p-5 md:p-6 
                    max-w-md 
                    shadow-xl 
                    animate-fadeIn
                ">
                    <h2 className="text-xl md:text-2xl text-white font-semibold mb-2">
                        Why Choose Us?
                    </h2>

                    <ul className="text-gray-300 text-base md:text-lg space-y-2">
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-blue-400 text-xl animate-pulse">●</span>
                            Fast & Reliable Service
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-blue-400 text-xl animate-pulse">●</span>
                            High-Performance Products
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-blue-400 text-xl animate-pulse">●</span>
                            Best Prices in the Market
                        </li>
                    </ul>
                </div>

                {/* Animated Bottom Slogan */}
                <p className="mt-6 text-blue-300 text-lg md:text-xl font-medium animate-bounce">
                    Fast • Reliable • Affordable
                </p>
            </div>
        </div>
    );
}
