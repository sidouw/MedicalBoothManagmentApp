import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis,ResponsiveContainer,Tooltip,Legend,CartesianGrid } from 'recharts';
import {Typography} from '@mui/material'




export default function Chart({data,title=''}) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography variant="h5" ml={4} mt= {1}  color="secondary" gutterBottom>
            {title}
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            allowDecimals = {false}
          />

          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Consultations"
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}