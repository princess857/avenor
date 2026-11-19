import { memo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useTheme } from '../../hooks/useTheme'

const COLORS = ['#003B3D', '#F4BE65', '#082B3B', '#FFD78D', '#10B981', '#EF4444']

function useChartTheme() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const text = dark ? '#B6C7CF' : '#526579'

  return {
    grid: dark ? 'rgba(148, 185, 194, 0.18)' : '#D7E2E8',
    text,
    primary: dark ? '#54D2C0' : '#00635F',
    secondary: '#F4BE65',
    tertiary: dark ? '#8DB8E6' : '#315A77',
    colors: dark ? ['#54D2C0', '#F4BE65', '#8DB8E6', '#FFD78D', '#34D399', '#FB7185'] : COLORS,
    tooltip: {
      backgroundColor: dark ? 'rgba(7, 27, 37, 0.97)' : 'rgba(255, 255, 255, 0.96)',
      border: `1px solid ${dark ? 'rgba(148, 185, 194, 0.24)' : 'rgba(27, 78, 87, 0.16)'}`,
      borderRadius: 12,
      color: dark ? '#F1F5F9' : '#0F172A',
      boxShadow: dark ? '0 12px 32px rgba(0, 0, 0, 0.35)' : '0 12px 32px rgba(15, 50, 59, 0.12)',
    },
    tooltipLabel: { color: dark ? '#F1F5F9' : '#0F172A' },
    tooltipItem: { color: dark ? '#D8E5E9' : '#334155' },
  }
}

export const PatientTrendChart = memo(function PatientTrendChart({ data }) {
  const palette = useChartTheme()

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: palette.text }} axisLine={false} />
          <YAxis tick={{ fontSize: 12, fill: palette.text }} axisLine={false} />
          <Tooltip cursor={{ stroke: palette.grid, strokeDasharray: '3 3' }} contentStyle={palette.tooltip} labelStyle={palette.tooltipLabel} itemStyle={palette.tooltipItem} />
          <Line type="monotone" dataKey="patients" stroke={palette.primary} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="appointments" stroke={palette.secondary} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})

export const RevenueChart = memo(function RevenueChart({ data }) {
  const palette = useChartTheme()

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: palette.text }} axisLine={false} />
          <YAxis tick={{ fontSize: 12, fill: palette.text }} axisLine={false} />
          <Tooltip contentStyle={palette.tooltip} labelStyle={palette.tooltipLabel} itemStyle={palette.tooltipItem} />
          <Bar dataKey="revenue" fill={palette.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
})

export const StatusChart = memo(function StatusChart({ data }) {
  const palette = useChartTheme()
  const colors = data.map((_, i) => palette.colors[i % palette.colors.length])

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={palette.tertiary}
            label={{ fill: palette.text, fontSize: 11 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip contentStyle={palette.tooltip} labelStyle={palette.tooltipLabel} itemStyle={palette.tooltipItem} />
          <Legend verticalAlign="top" align="right" height={100} wrapperStyle={{ color: palette.text }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
})
