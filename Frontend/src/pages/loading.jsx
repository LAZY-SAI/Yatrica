import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../../public/assets/animation/globe.json";

const Loading = () => {
    const navigate = useNavigate();
    const [statusIndex, setStatusIndex] = useState(0);

    const status = [
        "Analyzing your preferences...",
        "Clustering neighborhoods for low commute...",
        "Finding the best coffee spots in Chiado...",
        "Optimizing your golden-hour views...",
        "Finalizing your 5-day Lisbon itinerary...",
    ];

    useEffect(() => {
        const statusInterval = setInterval(() => {
            setStatusIndex((prev) =>
                prev < status.length - 1 ? prev + 1 : prev
            );
        }, 4000);

        const fetchData = async () => {
            try {
                const [res] = await Promise.all([
                    fetch("/api/data.json"),
                    new Promise((resolve) => setTimeout(resolve, 6000)),
                ]);

                const data = await res.json();

                navigate("/AiPlan/Final", {
                    state: { plan: data },
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => clearInterval(statusInterval);
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
            <div className="relative flex flex-col items-center">
                <div className="w-80 h-80">
                    <Lottie animationData={Animation} loop />
                </div>

                <div className="mt-8 text-center">
                    <h2 className="text-xl font-medium tracking-wide animate-pulse">
                        {status[statusIndex]}
                    </h2>
                    <p className="text-zinc-500 text-sm mt-2">
                        Personalizing your trip to Lisbon
                    </p>
                </div>

                <div className="w-48 h-1 bg-zinc-800 rounded-full mt-10 overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out"
                        style={{
                            width: `${((statusIndex + 1) / status.length) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;
