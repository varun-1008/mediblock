import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";
import { Button } from "@/components/ui/button";
import { useResolvedPath } from "react-router-dom";
import { Dot } from "lucide-react";

export function Records({ address, records, buttonFunction = () => {} }) {
  const pathname = useResolvedPath().pathname;

  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex gap-1">
                <Dot strokeWidth={4} /> {linkRecords[0].title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                <RecordTimeline
                  linkRecords={linkRecords}
                  address={address}
                  buttonFunction={buttonFunction}
                />
                {pathname.includes("bookAppointment") && (
                  <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        onChange={() =>
                          buttonFunction(linkRecords[0].linkIndex)
                        }
                        
                      />
                      <label>Select record</label>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
