"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {name: 1, total: 0},
    {name: 2, total: 0},
    {name: 3, total: 0},
    {name: 4, total: 0},
    {name: 5, total: 0},
    {name: 6, total: 0},
    {name: 7, total: 0},
    {name: 8, total: 0},
    {name: 9, total: 0},
    {name: 10, total: 0},
    {name: 11, total: 0},
    {name: 12, total: 0},
    {name: 13, total: 0},
    {name: 14, total: 0},
    {name: 15, total: 0},
    {name: 16, total: 0},
    {name: 17, total: 0},
    {name: 18, total: 0},
    {name: 19, total: 0},
    {name: 20, total: 0},
    {name: 21, total: 0},
    {name: 22, total: 0},
    {name: 23, total: 0},
    {name: 24, total: 0},
    {name: 25, total: 0},
    {name: 26, total: 0},
    {name: 27, total: 0},
    {name: 28, total: 0},
    {name: 29, total: 0},
    {name: 30, total: 0},
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
  )
}