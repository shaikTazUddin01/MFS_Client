import React from 'react';

const DashBoard = () => {
    return (
        <div className="p-6  min-h-screen">
           
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-700">Account Balance</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-3">৳12,345.67</p>
                    <p className="text-sm text-gray-500 mt-2">Your current available balance</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-700">Total Transactions</h2>
                    <p className="text-4xl font-bold text-green-600 mt-3">1,234</p>
                    <p className="text-sm text-gray-500 mt-2">Transactions All Time</p>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;