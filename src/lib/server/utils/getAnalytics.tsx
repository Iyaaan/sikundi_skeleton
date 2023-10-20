import { AlarmClock, ScanEye, Shell, Waypoints } from "lucide-react";

export default async function getAnalytics() {
    return [
        { name: "Total Sessions", value: "0", difference: "+0%", Icon: Shell },
        { name: "Total Page Views", value: "0", difference: "+0%", Icon: ScanEye },
        { name: "Total Avg Session Duration", value: "0", difference: "+0%", Icon: AlarmClock },
        { name: "Total Avg Bounce Rate", value: "0", difference: "+0%", Icon: Waypoints },
    ]
}