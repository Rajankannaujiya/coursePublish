import React from "react";
import FrontView from "./FrontView";
import Brand from "./Brand";
import GetTopThreeCourse from "./GetTopThreeCourse";

export default function Home(){
    return (
        <div className="flex flex-col pb-4 z-10 overflow-hidden">
            <FrontView />
            <Brand />
            <GetTopThreeCourse />
        </div>
    )
}