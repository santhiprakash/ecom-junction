import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsChartProps {
  title: string;
  description?: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  type: "line" | "bar";
  height?: number;
}

export const AnalyticsChart = ({
  title,
  description,
  data,
  type,
  height = 300,
}: AnalyticsChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    // This is a placeholder for chart implementation
    // In a real application, you would use a library like Chart.js
    // We're simulating the chart rendering here
    const renderChart = async () => {
      if (chartRef.current) {
        // In a real implementation, you would initialize the chart library here
        console.log("Chart would be rendered with:", { data, type });
        
        // Simulate drawing on the canvas
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
          ctx.font = "14px Arial";
          ctx.fillStyle = "#888";
          ctx.textAlign = "center";
          ctx.fillText(
            `${type.toUpperCase()} CHART: ${title}`,
            chartRef.current.width / 2,
            chartRef.current.height / 2 - 15
          );
          ctx.fillText(
            "(Chart.js would render actual chart here)",
            chartRef.current.width / 2,
            chartRef.current.height / 2 + 15
          );
        }
      }
    };

    renderChart();

    return () => {
      // Cleanup chart instance if needed
      if (chartInstance.current) {
        // In a real implementation, you would destroy the chart instance
        chartInstance.current = null;
      }
    };
  }, [data, type, title]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <canvas ref={chartRef} height={height} />
        </div>
      </CardContent>
    </Card>
  );
};
