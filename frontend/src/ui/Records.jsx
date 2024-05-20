import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";
import { Button } from "@/components/ui/button";
import { useResolvedPath } from "react-router-dom";

export function Records({ address, records, buttonFunction = () => {} }) {
  const pathname = useResolvedPath().pathname;

  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              {index + 1}. {linkRecords[0].title}
            </AccordionTrigger>
            <AccordionContent>
              {pathname.includes("bookAppointment") && (
                <Button
                  onClick={() =>
                    typeof buttonFunction === "function" &&
                    buttonFunction({ linkIndex: linkRecords[0].linkIndex })
                  }
                >
                  Give Access
                </Button>
              )}
              <RecordTimeline
                linkRecords={linkRecords}
                address={address}
                buttonFunction={buttonFunction}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
