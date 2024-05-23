import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";
import { Button } from "@/components/ui/button";
import { useResolvedPath } from "react-router-dom";
import { CheckCircle, Dot } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function Records({ address, records, buttonFunction = () => {} }) {
  const pathname = useResolvedPath().pathname;
  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (linkIndex) => {
    setSelected((prevSelected) =>
      prevSelected.includes(linkIndex)
        ? prevSelected.filter((item) => item !== linkIndex)
        : [...prevSelected, linkIndex]
    );
    buttonFunction(linkIndex);
  };
  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex gap-1 text-base font-medium">
                <Dot strokeWidth={4} />
                {linkRecords[0].title}
                {selected.includes(linkRecords[0].linkIndex) && (
                  <Badge className={"bg-blue-500 ml-2"}>Selected</Badge>
                )}
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
                      checked={selected.includes(linkRecords[0].linkIndex)}
                      onChange={() => {
                        handleCheckboxChange(linkRecords[0].linkIndex);
                      }}
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
