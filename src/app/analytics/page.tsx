"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {};

function Page({}: Props) {
  // Fake data for a specific user
  const userData = [
    { name: "Jan", tasksCompleted: 25, projectHours: 60 },
    { name: "Feb", tasksCompleted: 28, projectHours: 65 },
    { name: "Mar", tasksCompleted: 32, projectHours: 70 },
    { name: "Apr", tasksCompleted: 36, projectHours: 75 },
    { name: "May", tasksCompleted: 40, projectHours: 80 },
    { name: "Jun", tasksCompleted: 44, projectHours: 85 },
  ];

  return (
    <div className="flex mt-10 mx-2 relative">
      <div className="flex flex-col p-10">
        <div className=" uppercase underline my-2 font-semibold">
          {" "}
          this is some fake data just to have something on this page :)
        </div>

        <div className="summary-stats">
          <p>
            Total Tasks Completed:{" "}
            {userData.reduce((acc, curr) => acc + curr.tasksCompleted, 0)}
          </p>
          <p>
            Total Project Hours:{" "}
            {userData.reduce((acc, curr) => acc + curr.projectHours, 0)}
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="chart-container">
            <h3>Tasks Completed</h3>
            <LineChart
              width={500}
              height={300}
              data={userData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasksCompleted" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="chart-container">
            <h3>Project Hours</h3>
            <LineChart
              width={500}
              height={300}
              data={userData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="projectHours" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
