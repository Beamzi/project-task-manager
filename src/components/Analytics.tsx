"use client";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";
import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import { eachDayOfInterval } from "date-fns";
import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function Analytics() {
  const allTasksDueDate = useContext(AllTasksDueDateContext);
  if (!allTasksDueDate) {
    throw new Error("tasks not loaded");
  }

  const tasksParse = allTasksDueDate.map((item, index) => ({
    taskNumber: index + 1,
    title: item.title,
    daysBetween: Math.floor(
      (new Date(item.date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    ),
    isPriority: item.priority,
  }));

  const renderLineChart = (
    <div>
      <ResponsiveContainer width={700} height={300}>
        <LineChart
          data={tasksParse}
          margin={{ top: 40, right: 30, left: 60, bottom: 20 }}
        >
          <XAxis
            dataKey="taskNumber"
            interval={0}
            tickFormatter={() => ""}
            label={{
              value: "Each Task By Due Date",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Days left UIntil Overdue",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" }, // Centers the text better
            }}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip
            contentStyle={{
              color: "black",

              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} days`, "Planning Time"]}
            labelFormatter={(label) => {
              const task = tasksParse.find((t) => t.taskNumber === label);
              return task ? task.title : `Task ${label}`;
            }}
          />{" "}
          <Line type="monotone" dataKey="daysBetween" stroke="#ff0062" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  return (
    <div>
      <h3 onClick={() => console.log(tasksParse)}>Days Left For Each Task</h3>
      {renderLineChart}
    </div>
  );
}
