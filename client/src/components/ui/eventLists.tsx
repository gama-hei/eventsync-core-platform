
'use client'

import { EventCard} from '@/components/ui/eventCard'
import { Event } from '@/types/types';
import { useState } from 'react';
import SessionList from "@/components/ui/sessionLists";
import { Event, Session , Speaker} from "@/types/types";
interface Props {
    events : Event[];
}
const speakers: Speaker[] = [
  {
    id: "sp1",
    fullName: "Rakoto Jean",
    profilePicture: "https://i.pravatar.cc/150?img=1",
    bio: "Développeur fullstack avec 8 ans d'expérience, passionné par les hackathons et l'open source.",
    externalLinks: {
      twitter: "https://twitter.com/rakotojean",
      linkedin: "https://linkedin.com/in/rakotojean",
    },
    sessionIds: ["s1", "s2"],
  },
  {
    id: "sp2",
    fullName: "Rasoa Marie",
    profilePicture: "https://i.pravatar.cc/150?img=2",
    bio: "Ingénieure logiciel spécialisée en IA et machine learning, mentor dans plusieurs bootcamps.",
    externalLinks: {
      linkedin: "https://linkedin.com/in/rasoamarie",
      website: "https://rasoamarie.dev",
    },
    sessionIds: ["s2", "s3"],
  },
  {
    id: "sp3",
    fullName: "Andry Rakotomalala",
    profilePicture: "https://i.pravatar.cc/150?img=3",
    bio: "Expert React et architecte frontend, contributeur à plusieurs librairies open source.",
    externalLinks: {
      twitter: "https://twitter.com/andrydev",
      linkedin: "https://linkedin.com/in/andryrakotomalala",
      website: "https://andrydev.mg",
    },
    sessionIds: ["s4", "s5"],
  },
  {
    id: "sp4",
    fullName: "Volatiana Ramaroson",
    profilePicture: "https://i.pravatar.cc/150?img=5",
    bio: "Développeuse React Native et web, formatrice passionnée par la transmission des savoirs.",
    externalLinks: {
      twitter: "https://twitter.com/volatiana_dev",
    },
    sessionIds: ["s4", "s6"],
  },
];
const sessions: Session[] = [
  
  {
    id: "s1",
    eventId: "1",
    title: "Kick-off & Formation des équipes",
    description: "Présentation du thème du hackathon, règles, et constitution des équipes participantes.",
    startTime: "2026-01-01T08:00:00",
    endTime: "2026-01-01T09:30:00",
    room: { id: "r1", name: "Salle Principale", capacity: 200 },
    capacity: 200,
    speakers: [speakers[0]],
    isLive: true,
  },
  {
    id: "s2",
    eventId: "1",
    title: "Atelier IA pour les projets Hackathon",
    description: "Comment intégrer des APIs d'IA (OpenAI, Gemini) dans votre projet en moins de 2h.",
    startTime: "2026-01-01T10:00:00",
    endTime: "2026-01-01T12:00:00",
    room: { id: "r2", name: "Salle Tech", capacity: 80 },
    capacity: 80,
    speakers: [speakers[0], speakers[1]],
    isLive: false,
  },
  {
    id: "s3",
    eventId: "1",
    title: "Présentation des projets & Délibération",
    description: "Les équipes présentent leurs prototypes devant le jury. Remise des prix.",
    startTime: "2026-01-02T14:00:00",
    endTime: "2026-01-02T17:00:00",
    room: { id: "r1", name: "Salle Principale", capacity: 200 },
    capacity: 200,
    speakers: [speakers[1]],
    isLive: false,
  },

  {
    id: "s4",
    eventId: "2",
    title: "Introduction à React & JSX",
    description: "Les bases de React : composants, JSX, props et state. Idéal pour les débutants.",
    startTime: "2026-02-01T09:00:00",
    endTime: "2026-02-01T11:00:00",
    room: { id: "r3", name: "Salle Zoom A", capacity: 50 },
    capacity: 50,
    speakers: [speakers[2], speakers[3]],
    isLive: false,
  },
  {
    id: "s5",
    eventId: "2",
    title: "Hooks avancés : useEffect, useContext, useReducer",
    description: "Plongée en profondeur dans les hooks React pour gérer les effets de bord et l'état global.",
    startTime: "2026-02-01T13:00:00",
    endTime: "2026-02-01T15:30:00",
    room: { id: "r3", name: "Salle Zoom A", capacity: 50 },
    capacity: 50,
    speakers: [speakers[2]],
    isLive: false,
  },
  {
    id: "s6",
    eventId: "2",
    title: "Projet fil rouge : Build a Full App",
    description: "Construction d'une application React complète avec routing, state management et appels API.",
    startTime: "2026-02-02T09:00:00",
    endTime: "2026-02-02T16:00:00",
    room: { id: "r4", name: "Salle Zoom B", capacity: 30 },
    capacity: 30,
    speakers: [speakers[3]],
    isLive: false,
  },
];
export default function page({events} : Props) {
   const [selectedId, setSelectedId] = useState("1");

  const event = events.find((e) => e.id === selectedId);
  return (
    <>
   
     <div  >
          <div className="@container/main flex flex-1 flex-col gap-2 pb-20">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                 {event ? (
        <EventCard event={event} />
      ) : (
        <p>No event found</p>
      )}
             
            </div>
            <SessionList sessions={sessions}/>
          </div>
        </div>
        
    </>
       
     

  )
}

