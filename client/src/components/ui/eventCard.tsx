
'use client'

import { SectionCards } from '@/components/ui/eventDetails'
import { Event } from '@/types/types';
import { useState } from 'react';

interface Props {
    events : Event[];
}
export default function page({events} : Props) {
   const [selectedId, setSelectedId] = useState("1");

  const event = events.find((e) => e.id === selectedId);
  return (
    <>
   
     <div  >
          <div className="@container/main flex flex-1 flex-col gap-2 pb-20">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                 {event ? (
        <SectionCards event={event} />
      ) : (
        <p>No event found</p>
      )}
             
            </div>
          </div>
        </div>
        
    </>
       
     

  )
}

