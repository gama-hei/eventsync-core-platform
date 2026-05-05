'use client'
import { SessionCards } from "./sessionCard";
import { Session, Speaker } from "@/types/types";
import { useState } from "react";
interface Props{
  sessions: Session[];
  speakers : Speaker [];
}




export default function SessionList({sessions} : Props){
       const [selectedId, setSelectedId] = useState("1");
        const session = sessions.filter(s => s.eventId === selectedId)
    return(
        <>
        <div>
            <SessionCards sessions={sessions}/>
        </div>
        </>
    )
}