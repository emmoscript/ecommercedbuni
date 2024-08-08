"use client"

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale
);

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch('/api/get_analytics');
                if (response.ok) {
                    const data = await response.json();
                    setAnalyticsData(data);
                } else {
                    console.error("Failed to fetch analytics data");
                }
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (!analyticsData) return <div>Loading...</div>;

    const topSellingProductsData = {
        labels: analyticsData.topSellingProducts.map((product: any) => product.productId),
        datasets: [{
            label: 'Top Selling Products',
            data: analyticsData.topSellingProducts.map((product: any) => product.quantitySold),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const statusData = {
        labels: ['Completed', 'Pending', 'Failed'],
        datasets: [{
            label: 'Transaction Status',
            data: [analyticsData.completedCount, analyticsData.pendingCount, analyticsData.failedCount],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            borderColor: ['#28a745', '#ffc107', '#dc3545'],
            borderWidth: 1
        }]
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Top Selling Products</h2>
                    <Bar data={topSellingProductsData} />
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Transaction Status</h2>
                    <Pie data={statusData} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
