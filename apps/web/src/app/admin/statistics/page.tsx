"use client"

import { withAuthAdmin } from '@/hoc/authGuard';
import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { UserContext } from '@/context/UserContext';
import axios from '@/helper/axiosInstance';

interface IStatisticsProps {
}

interface Attendee {
  date: string;
  count: number;
  totalAmount: number;
}

const chartConfig: ChartConfig = {
  count: {
    label: "Number of Registration",
    color: "hsl(var(--chart-1))",
  },
  totalAmount: {
    label: "Total Amount Earned",
    color: "hsl(var(--chart-2))",
  },
}

const Statistics: React.FunctionComponent<IStatisticsProps> = (props) => {
  const { user } = React.useContext(UserContext);
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("count");

  const fetchAttendees = async () => {
    try {
        const { data } = await axios.get(`/api/dashboard/getAttendeeStatistic/day/${user?.email}`);
        setAttendees(data.data);
        console.log("ATTENDEES FROM SET ATTENDEES::", data.data)
    } catch (error) {
        console.log(error);
    }
  };

  React.useEffect(() => {
    if (user?.email) {
        const timer = setTimeout(() => {
            fetchAttendees();
        }, 500);

        return () => clearTimeout(timer);
    }
  }, [user?.email]);

  const total = React.useMemo(() => ({
    count: attendees.reduce((acc, curr) => acc + curr.count, 0),
    totalAmount: attendees.reduce((acc, curr) => acc + curr.totalAmount, 0),
  }), [attendees]);

  const renderCardContent = (dataKey: keyof typeof chartConfig) => (
    <CardContent className="px-2 sm:p-6">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <LineChart
          data={attendees}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey={dataKey}
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Line
            dataKey={dataKey}
            type="monotone"
            stroke={`var(--color-${dataKey})`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );  

  const renderChartButton = (chartconfigkey: keyof typeof chartConfig, formatvalue: any) => {
    return (
      <div className="flex">
        {[chartconfigkey].map((key) => {
          const chart = key as keyof typeof chartConfig;
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="flex flex-1 flex-col items-center justify-center gap-1 border-t px-6 py-4 text-center even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[chart].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {formatvalue}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle className='text-orange-500'>Attendee Registration</CardTitle>
              <CardDescription>
                Showing total attendee registration by day
              </CardDescription>
            </div>
            {renderChartButton("count" as keyof typeof chartConfig, total["count"].toLocaleString())}
          </CardHeader>
          {renderCardContent("count")}
        </Card>
      </div>
      <div className='pt-8'>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle className='text-orange-500'>Sales Amount</CardTitle>
              <CardDescription>
                Showing total sales amount earned by day
              </CardDescription>
            </div>
            {renderChartButton("totalAmount" as keyof typeof chartConfig, total["totalAmount"].toLocaleString('id-ID', {style: 'currency', currency: 'IDR',}))}
          </CardHeader>
          {renderCardContent("totalAmount")}
        </Card>
      </div>
    </div>
  );
};

export default withAuthAdmin(Statistics);
