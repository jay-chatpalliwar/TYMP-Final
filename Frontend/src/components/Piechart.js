import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend,LineElement,PointElement,Filler,CategoryScale,LinearScale} from 'chart.js';
import { Pie,Line } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend,LineElement,PointElement,Filler,CategoryScale,LinearScale
);

export default function Piechart(){
    const pieval = {
        labels: [
            "Design and Analysis of Algorithms",
            "Compiler Design",
            "Artificial Intelligence",
            "Image Processing",
            "Non-Conventional Machining Processes"
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [69, 70, 85,65,77],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 245, 66)',
            'rgb(209, 66, 245)'
          ],
          hoverOffset: 4
        }]
      };

      const data = {
        labels: [
            "Design and Analysis of Algorithms",
            "Compiler Design",
            "Artificial Intelligence",
            "Image Processing",
            "Non-Conventional Machining Processes"
        ],
        datasets: [{
          label: 'Average Score Subjectwise',
          data: [75, 80, 76, 66, 75],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
            label: "Student's Score Subjectwise",
            data: [69,70,85,65,77],
            fill: false,
            borderColor: 'rgb(66, 245, 203)',
            tension: 0.1
          }    
    ]
      };

    return (
        <div className=' flex flex-col gap-4 justify-center items-center overflow-hidden'>
            <Pie data = {pieval} className=''/>
            <Line data={data} className=''/>
        </div>
    )
}