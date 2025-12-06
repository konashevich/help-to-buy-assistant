import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  deposit: number;
  govShare: number;
  bankLoan: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ deposit, govShare, bankLoan }) => {
  const data = [
    { name: 'Your Deposit (2%)', value: deposit, color: '#10b981' }, // Emerald 500
    { name: 'Gov Share', value: govShare, color: '#0ea5e9' }, // Sky 500
    { name: 'Bank Loan', value: bankLoan, color: '#64748b' }, // Slate 500
  ];

  // Currency formatter
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;