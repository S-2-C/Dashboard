import { useEffect } from "react"
import { Chart } from "chart.js";

function BarChartSeconds({WalmartDelivery, WalmartOnline, WalmartPhysicalStore, WalmartPass, label, title}: any) {
    console.log(WalmartDelivery, WalmartOnline, WalmartPhysicalStore, WalmartPass);
    useEffect(() => {
        console.log("labels",label);
        var ctx = (document.getElementById(title) as HTMLCanvasElement)?.getContext('2d');
        if (WalmartDelivery === undefined && WalmartOnline === undefined || WalmartPhysicalStore === undefined || WalmartPass === undefined || ctx === null) {
            return;
        }
        var myChart = new Chart(ctx , {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    data: WalmartDelivery,
                    label: "Delivery",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                }
                , {
                    data: WalmartOnline,
                    label: "Online",
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgb(75, 192, 192,0.5)",
                    borderWidth: 2
                }, {
                    data: WalmartPhysicalStore,
                    label: "Physical Store",
                    borderColor: "rgb(255, 205, 86)",
                    backgroundColor: "rgb(255, 205, 86,0.5)",
                    borderWidth: 2
                }, {
                    data: WalmartPass,
                    label: "Pass",
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgb(255, 99, 132,0.5)",
                    borderWidth: 2
                }
                ]
            },
            
        });
    }, [WalmartDelivery,  WalmartOnline, WalmartPhysicalStore, WalmartPass, label])


    return (
        <>
            {/* Bar chart */}
            <h1 className="w-[150px] mx-auto mt-5 text-xl font-semibold capitalize ">{title}</h1> 
            <div className="w-[625px] flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id={title}></canvas>
                </div>
            </div>
        </>
    )
}


export default BarChartSeconds;

